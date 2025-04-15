import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
import {  Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get<IPrato[]>("pratos/")
            .then(res => setPratos(res.data))
    }, [])

    const excluir = (prato: IPrato) => {
        http.delete(`pratos/${prato.id}/`)
        .then(() =>{
            const listaPrato = pratos.filter(r => r.id !== prato.id)
            setPratos([...listaPrato])
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
                    {pratos.map(r => 
                    <TableRow key={r.id}>
                        <TableCell>
                            {r.nome}
                        </TableCell>
                        <TableCell>
                            [ <Link to={`/admin/Pratos/${r.id}`}>editar</Link> ]
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

export default AdministracaoPratos;