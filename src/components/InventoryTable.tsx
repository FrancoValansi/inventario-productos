import "./InventoryTable.css";

import {
    Paper,
    CircularProgress,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
}

interface InventoryTableProps {
    productos: Producto[];
    cargando: boolean;
    busqueda: string;
    setBusqueda: React.Dispatch<React.SetStateAction<string>>;
    alAgregar: () => void;
    alEditar: (producto: Producto) => void;
    alEliminar: (producto: Producto) => void;
}

function InventoryTable({
    productos,
    cargando,
    busqueda,
    setBusqueda,
    alAgregar,
    alEditar,
    alEliminar
}: InventoryTableProps) {
    return (
        <div className="inventory">
            <div className="inventory-header">
                <div>
                    <h1>Inventario de Productos</h1>
                    <p>Gestión y control de stock en tiempo real</p>
                </div>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={alAgregar} >
                    Agregar producto
                </Button>

            </div>

            <div className="search-container">

                <SearchIcon />

                <TextField
                    fullWidth
                    size="small"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />

            </div>

            <Paper elevation={2}
                className="inventory-paper">

                {cargando ? (
                    <div className="mensaje-carga">
                        <CircularProgress />
                        <p>Cargando productos...</p>
                    </div>
                ) : (

                <TableContainer>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell><strong>Nombre</strong></TableCell>
                                <TableCell><strong>Descripción</strong></TableCell>
                                <TableCell><strong>Precio</strong></TableCell>
                                <TableCell><strong>Stock</strong></TableCell>
                                <TableCell align="right"><strong>Acciones</strong></TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {productos.length === 0 ? (
                                <TableRow>

                                    <TableCell
                                        align="center"
                                        colSpan={5}
                                    >
                                        No se encontraron productos.
                                    </TableCell>

                                </TableRow>

                            ) : (
                                productos.map((producto) => (

                                    <TableRow key={producto.id} hover>

                                        <TableCell>{producto.nombre}</TableCell>

                                        <TableCell>{producto.descripcion}</TableCell>

                                        <TableCell>
                                            $
                                            {producto.precio.toLocaleString("es-AR")}
                                        </TableCell>

                                        <TableCell>
                                            {producto.stock}
                                        </TableCell>

                                        <TableCell align="right">

                                            <Button
                                                size="small"
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                onClick={() => alEditar(producto)}
                                            >
                                                Editar
                                            </Button>

                                            <Button
                                                size="small"
                                                color="error"
                                                variant="contained"
                                                startIcon={<DeleteIcon />}
                                                className="eliminar"
                                                onClick={() => alEliminar(producto)}
                                            >
                                                Eliminar
                                            </Button>

                                        </TableCell>

                                    </TableRow>

                                ))
                            )}
                        </TableBody>

                    </Table>

                </TableContainer>
            )}
            </Paper>

        </div>
    );
};

export default InventoryTable;