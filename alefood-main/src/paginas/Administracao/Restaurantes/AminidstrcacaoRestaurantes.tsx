import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>("restaurantes/")
            .then(res => setRestaurantes(res.data))
    }, [])

    const excluir = (restaurante: IRestaurante) => {
        http.delete(`restaurantes/${restaurante.id}/`)
        .then(() =>{
            const listaRestaurante = restaurantes.filter(r => r.id !== restaurante.id)
            setRestaurantes([...listaRestaurante])
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                        <TableCell>
                            Editar
                        </TableCell>
                        <TableCell>
                            Excluir
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(r => 
                    <TableRow key={r.id}>
                        <TableCell>
                            {r.nome}
                        </TableCell>
                        <TableCell>
                            [ <Link to={`/admin/restaurantes/${r.id}`}>editar</Link> ]
                        </TableCell>
                        <TableCell>
                           <Button variant="outlined" color="error" onClick={() => excluir(r)}>
                                Excluir
                           </Button>
                        </TableCell>
                    </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;