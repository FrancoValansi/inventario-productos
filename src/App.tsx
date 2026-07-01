import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import InventoryTable from "./components/InventoryTable";
import type { Producto } from "./components/InventoryTable";
import FormularioProducto from "./components/FormularioProducto";
import ConfirmarEliminar from "./components/ConfirmarEliminar";

function App() {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [productoEditando, setProductoEditando] = useState<Producto | null>(null);
  const [dialogoEliminarAbierto, setDialogoEliminarAbierto] = useState(false);
  const [productoEliminar, setProductoEliminar] = useState<Producto | null>(null);

  const formularioValido =
  nombre.trim() !== "" &&
  precio !== "" &&
  stock !== "" &&
  Number(precio) >= 0 &&
  Number(stock) >= 0;

  useEffect(() => {
    obtenerProductos();
  }, []);

  function limpiarFormulario() {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
  }

  function abrirFormulario() {
    limpiarFormulario();
    setDialogoAbierto(true);
  }

  function cerrarFormulario() {
    limpiarFormulario();
    setProductoEditando(null);
    setDialogoAbierto(false);
  }

  function abrirEdicion(producto: Producto) {
    setProductoEditando(producto);

    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(producto.precio.toString());
    setStock(producto.stock.toString());

    setDialogoAbierto(true);
  }

  function abrirDialogEliminar(producto: Producto) {
    setProductoEliminar(producto);
    setDialogoEliminarAbierto(true);
  }

  function cerrarDialogEliminar() {
    setProductoEliminar(null);
    setDialogoEliminarAbierto(false);
  }

  async function obtenerProductos() {
    const { data, error } = await supabase
      .from("productos")
      .select("*");

    if (error) {
      console.error(error);
      setErrorCarga("Ocurrió un error al cargar los productos. Si el problema persiste, vuelva a intentarlo más tarde.");
    } else {
      setProductos(data as Producto[]);
    }

    setCargando(false);

  }
  
  async function guardarProducto() {
    if (productoEditando) {
      await editarProducto();
    } else {
      await agregarProducto();
    }
  }

  async function agregarProducto() {
    if (!formularioValido) {
      alert("Complete correctamente los datos del producto.");
      return;
    }

    const { error } = await supabase
      .from("productos")
      .insert([
        {
          nombre,
          descripcion,
          precio: Number(precio),
          stock: Number(stock),
        },
      ]);

    if (error) {
      console.error(error);
      alert("No se pudo agregar el producto.");
      return;
    }

    await obtenerProductos();
    cerrarFormulario();
  }
  
  async function editarProducto() {
    console.log(productoEditando);
    if (!productoEditando) return;

    const { data, error } = await supabase
    .from("productos")
    .update({
      nombre,
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
    })
    .eq("id", productoEditando.id)
    .select();

  if (error || !data || data.length === 0) {
    console.error(error);
    alert("No se pudo editar el producto.");
    return;
  }

  await obtenerProductos();
  cerrarFormulario();
  }

    async function eliminarProducto() {
    if (!productoEliminar) return;

    const { error, data } = await supabase
      .from("productos")
      .delete()
      .eq("id", productoEliminar.id)
      .select();

    if (error || !data || data.length === 0) {
      console.error(error);
      alert("No se pudo eliminar el producto.");
      return;
    }

    await obtenerProductos();
    cerrarDialogEliminar();
  }
  
  if (cargando) {
    return (
      <div className="app">
        <h2 className="mensaje">Cargando productos...</h2>
      </div>
    );
  }

  if (errorCarga) {
    return (
      <div className="app">
        <h2 className="mensaje">{errorCarga}</h2>
      </div>
    );
  }

  return (
    <div className="app">
      <InventoryTable
        productos={productos}
        alAgregar={abrirFormulario}
        alEditar={abrirEdicion}
        alEliminar={abrirDialogEliminar} />

      <FormularioProducto
        abierto={dialogoAbierto}

        nombre={nombre}
        descripcion={descripcion}
        precio={precio}
        stock={stock}

        setNombre={setNombre}
        setDescripcion={setDescripcion}
        setPrecio={setPrecio}
        setStock={setStock}

        formularioValido={formularioValido}
        modoEdicion={productoEditando !== null}
        alCerrar={cerrarFormulario}
        alGuardar={guardarProducto}
      />

      <ConfirmarEliminar
        abierto={dialogoEliminarAbierto}
        alCancelar={cerrarDialogEliminar}
        alConfirmar={eliminarProducto}
      />
    </div>
  );

}

export default App;