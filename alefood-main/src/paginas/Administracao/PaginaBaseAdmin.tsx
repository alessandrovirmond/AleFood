import { AppBar, Box, Button, Typography, Container, Toolbar, Link, Paper } from "@mui/material";
import {Outlet, Link as RouterLink} from 'react-router-dom';

const PaginaBaseAdmin = () => {
    return (
        <>

        <AppBar position="static">
          <Container maxWidth="xl" >
            <Toolbar>
              <Typography variant="h6">
                Administração
              </Typography>
              <Box sx={{ display: 'flex', flexGrow: 1 }}>
                <Link>
                  <Button sx={{  my: 2, mx: 5, color: 'white' }} component={RouterLink} to='/' >
                    Voltar ao Site
                  </Button>
                </Link>
                <Link component={RouterLink} to='/admin/restaurantes'>
                  <Button sx={{ my: 2, mx: 5, color: 'white' }}>
                    Restaurantes
                  </Button>
                </Link> 
                <Link>
                  <Button sx={{  my: 2, mx: 5, color: 'white' }} component={RouterLink} to='/admin/restaurantes/novo' >
                    Novo Restaurante
                  </Button>
                </Link>
                <Link>
                  <Button sx={{ my: 2, mx: 5, color: 'white' }} component={RouterLink} to='/admin/pratos' >
                    Pratos
                  </Button>
                </Link>
                <Link>
                  <Button sx={{ my: 2, mx: 5, color: 'white' }} component={RouterLink} to='/admin/pratos/novo' >
                    Novo Prato
                  </Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
  
        <Box>
          <Container maxWidth="lg" sx={{ mt: 1 }}>
            <Paper sx={{ p: 2 }}>
                    <Outlet/>   
            </Paper>
          </Container>
        </Box>
  
  
      </>
    )
}   

export default PaginaBaseAdmin