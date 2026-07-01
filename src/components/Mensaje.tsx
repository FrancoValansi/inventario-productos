import { Snackbar, Alert } from "@mui/material";

interface MensajeProps {
  abierto: boolean;
  texto: string;
  estado: "success" | "error";
  alCerrar: () => void;
}

export default function Mensaje({
  abierto,
  texto,
  estado,
  alCerrar,
}: MensajeProps) {
  return (
    <Snackbar
      open={abierto}
      autoHideDuration={3000}
      onClose={alCerrar}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert
        severity={estado}
        onClose={alCerrar}
        variant="filled"
      >
        {texto}
      </Alert>
    </Snackbar>
  );
}