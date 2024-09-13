
import React,{useState, useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepOrange} from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const goToAbout = () => {
      navigate('/home');
    };
  const [formData, setFormData] = useState({ username: '', password: '' });
  const toast = useRef(null);

  const showError = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Usuario y/o contraseña invalidos' });
  };

  const showLogin = () => {
    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Favor de ingresar usuario y contraseña' });
  };
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  /* api login mas JWT*/
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}token`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
      },
    });
      const jwtToken  = response.data;
      //console.log(jwtToken)
      localStorage.setItem('jwtToken',JSON.stringify(jwtToken));

      goToAbout()

    } catch (error) {
      console.log("falle")
      showError('Usuario y/o contraseña invalidos')
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor:deepOrange[500]}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sitio CENIA
          </Typography>
          <Box /* component="form" onSubmit={handleSubmit}  */ noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              id="password"
              onChange={handleInputChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            <Button
              onClick={handleLogin} 
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Ingresar
            </Button>
            <Grid container>
             {/*  <Grid item xs> */}
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
             {/*  </Grid> */}
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
