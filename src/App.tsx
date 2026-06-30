import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import InventoryTable from "./components/InventoryTable";
import type { Producto } from "./components/InventoryTable";
import FormularioProducto from "./components/FormularioProducto";

function App() {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

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
    setDialogoAbierto(false);
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

  async function agregarProducto() {
    if (!formularioValido) {
    alert("Complete correctamente los datos del producto.");
    return;
  }
    console.log({
      nombre,
      descripcion,
      precio,
      stock
    });


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

    obtenerProductos();
    cerrarFormulario();
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
        onAgregar={abrirFormulario} />

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
        alCerrar={cerrarFormulario}
        alGuardar={agregarProducto}
      />
    </div>
  );

}

export default App;