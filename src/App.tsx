import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import InventoryTable from "./components/InventoryTable";
import type { Producto } from "./components/InventoryTable";

function App() {

  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState("");

  useEffect(() => {
    obtenerProductos();
  }, []);

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
      <InventoryTable productos={productos} />
    </div>
  );

}

export default App;