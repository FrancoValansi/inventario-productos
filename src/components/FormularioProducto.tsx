import "./FormularioProducto.css";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface FormularioProductoProps {
  abierto: boolean;
  nombre: string;
  descripcion: string;
  precio: string;
  stock: string;

  setNombre: React.Dispatch<React.SetStateAction<string>>;
  setDescripcion: React.Dispatch<React.SetStateAction<string>>;
  setPrecio: React.Dispatch<React.SetStateAction<string>>;
  setStock: React.Dispatch<React.SetStateAction<string>>;
  formularioValido: boolean;
  alCerrar: () => void;
  alGuardar: () => void;
}

export default function FormularioProducto({
  abierto,
  nombre,
  descripcion,
  precio,
  stock,
  setNombre,
  setDescripcion,
  setPrecio,
  setStock,
  formularioValido,
  alCerrar,
  alGuardar,
}: FormularioProductoProps) {
  const [nombreTocado, setNombreTocado] = useState(false);
  const [precioTocado, setPrecioTocado] = useState(false);
  const [stockTocado, setStockTocado] = useState(false);

  useEffect(() => {
    if (!abierto) {
      setNombreTocado(false);
      setPrecioTocado(false);
      setStockTocado(false);
    }
  }, [abierto]);

  function manejarSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setNombreTocado(true);
    setPrecioTocado(true);
    setStockTocado(true);

    if (formularioValido) {
      alGuardar();
    }
  }

  return (
    <Dialog
      open={abierto}
      onClose={alCerrar}
      fullWidth
      maxWidth="sm"
    >
      <form onSubmit={manejarSubmit}>

        <DialogTitle>
          Agregar producto
        </DialogTitle>

        <DialogContent className="formulario-contenido">

          <TextField
            label="Nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              setNombreTocado(true);
            }}

            error={nombreTocado && nombre.trim() === ""}

            helperText={
              nombreTocado && nombre.trim() === ""
                ? "Ingrese un nombre."
                : ""
            }
            fullWidth
          />

          <TextField
            label="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
          />

          <TextField
            label="Precio"
            type="number"
            value={precio}
            onChange={(e) => {
              setPrecio(e.target.value);
              setPrecioTocado(true);
            }}

            error={precioTocado && (precio === "" || Number(precio) < 0)}

            helperText={
              precioTocado && (precio === "" || Number(precio) < 0)
                ? "Ingrese un precio válido."
                : ""
            }
            fullWidth
          />

          <TextField
            label="Stock"
            type="number"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
              setStockTocado(true);
            }}

            error={stockTocado && (stock === "" || Number(stock) < 0)}

            helperText={
              stockTocado && (stock === "" || Number(stock) < 0)
                ? "Ingrese un stock válido."
                : ""
            }
            fullWidth
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={alCerrar}>
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={!formularioValido}
          >
            Guardar
          </Button>

        </DialogActions>

      </form>
    </Dialog>
  );
}