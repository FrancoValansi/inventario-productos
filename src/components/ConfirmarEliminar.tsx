import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmarEliminarProps {
  abierto: boolean;
  nombreProducto: string;
  procesando: boolean;
  alCancelar: () => void;
  alConfirmar: () => void;
}

export default function ConfirmarEliminar({
  abierto,
  nombreProducto,
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
        ¿Está seguro de que desea eliminar el producto "<strong>{nombreProducto}</strong>"?
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