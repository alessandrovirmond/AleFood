import { Box, Button, TextField, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { url } from "inspector";

const FormularioPrato = () => {

  const parametros = useParams()


  const [nomePrato, setNomePrato] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);


  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(r => {
        setTags(r.data.tags);
      })
    http.get<IRestaurante[]>('restaurantes/')
      .then(r => {
        setRestaurantes(r.data);
      })
  }, [])


  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const formData = new FormData();

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)
    if (imagem) {
      formData.append('imagem', imagem)
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    }).then(r => alert('Prato cadastrado com sucesso'))
      .catch(e => console.log(e))



  };

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }} >
              <Typography component="h1" variant="h6" >Formulário de Pratos</Typography>
              <Box component="form" sx={{ width: '100%' }}
                onSubmit={aoSubmeterForm}
              >
                <TextField
                  value={nomePrato}
                  onChange={
                    evento => setNomePrato(evento.target.value)}
                  id="standard-basic"
                  label="Nome do Prato"
                  variant="standard"
                  fullWidth
                  required
                  margin="dense"
                />
                <TextField
                  value={descricao}
                  onChange={
                    evento => setDescricao(evento.target.value)}
                  id="standard-basic"
                  label="Descrição do Prato"
                  variant="standard"
                  fullWidth
                  required
                  margin="dense"
                />

                <FormControl margin="dense" fullWidth>
                  <InputLabel id="select-tag">Tag</InputLabel>
                  <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)} >
                    {tags.map((t) =>
                      <MenuItem key={t.id} value={t.value}>
                        {t.value}
                      </MenuItem>)}
                  </Select>

                </FormControl>

                <FormControl margin="dense" fullWidth>
                  <InputLabel id="select-restaurante">restaurante</InputLabel>
                  <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)} >
                    {restaurantes.map((t) =>
                      <MenuItem key={t.id} value={t.id}>
                        {t.nome}
                      </MenuItem>)}
                  </Select>

                </FormControl>

                <input type="file" onChange={e => selecionarArquivo(e)} />
                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

    </>
  );
};

export default FormularioPrato;
