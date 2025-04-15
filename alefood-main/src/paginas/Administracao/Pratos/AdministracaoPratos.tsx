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
            const listaPratos = pratos.filter(r => r.id !== prato.id)
            setPratos([...listaPratos])
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
                            Descrição
                        </TableCell>
                        <TableCell>
                            Tag
                        </TableCell>
                        <TableCell>
                            Imagem
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
                            {r.descricao}
                        </TableCell>
                        <TableCell>
                            {r.tag}
                        </TableCell>
                        <TableCell>
                            <a href={r.imagem} rel="noreferer">Ver imagem</a>
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