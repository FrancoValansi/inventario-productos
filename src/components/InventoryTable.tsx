import "./InventoryTable.css";

import {
    Paper,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";


export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
}

interface InventoryTableProps {
    productos: Producto[];
    alAgregar: () => void;
    alEditar: (producto: Producto) => void;
}

function InventoryTable({ productos, alAgregar, alEditar }: InventoryTableProps) {
    return (
        <div className="inventory">
            <div className="inventory-header">
                <div>
                    <h1>Inventario de Productos</h1>
                    <p>Gestión y control de stock en tiempo real</p>
                </div>

                <Button variant="contained"
                    onClick={alAgregar} >
                    Agregar producto
                </Button>

            </div>

            <TextField
                fullWidth
                size="small"
                placeholder="Buscar productos..."
                className="search"
            />

            <Paper elevation={2}>

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

                            {productos.map((producto) => (

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
                                            variant="outlined"
                                            onClick={() => alEditar(producto)}
                                        >
                                            Editar
                                        </Button>

                                        <Button
                                            size="small"
                                            color="error"
                                            variant="outlined"
                                            className="eliminar"
                                        >
                                            Eliminar
                                        </Button>

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>

            </Paper>

        </div>
    );
};

export default InventoryTable;