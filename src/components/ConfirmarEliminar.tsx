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
  procesando: boolean;
  alCancelar: () => void;
  alConfirmar: () => void;
}

export default function ConfirmarEliminar({
  abierto,
  procesando,
  alCancelar,
  alConfirmar,
}: ConfirmarEliminarProps) {
  return (
    <Dialog
      open={abierto}
      onClose={alCancelar}
      disableRestoreFocus
    >
      <DialogTitle>Eliminar producto</DialogTitle>

      <DialogContent>
        ¿Está seguro de que desea eliminar este producto?
      </DialogContent>

      <DialogActions>
        <Button
          onClick={alCancelar}
          disabled={procesando}
        >
          Cancelar
        </Button>

        <Button
          color="error"
          variant="contained"
          disabled={procesando}
          onClick={alConfirmar}
        >
          {procesando ? "Eliminando..." : "Eliminar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}