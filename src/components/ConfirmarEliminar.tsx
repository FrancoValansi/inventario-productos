import "./ConfirmarEliminar.css";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmarEliminarProps {
  abierto: boolean;
  alCancelar: () => void;
  alConfirmar: () => void;
}

export default function ConfirmarEliminar({
  abierto,
  alCancelar,
  alConfirmar,
}: ConfirmarEliminarProps) {
  return (
    <Dialog open={abierto} onClose={alCancelar}>
      <DialogTitle>Eliminar producto</DialogTitle>

      <DialogContent>
        ¿Está seguro de que desea eliminar este producto?
      </DialogContent>

      <DialogActions>
        <Button onClick={alCancelar}>
          Cancelar
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={alConfirmar}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}