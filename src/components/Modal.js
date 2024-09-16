import React, { useState, useEffect, } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Autocomplete, Divider, Grid, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { API_URL } from '../api';
import axios from 'axios';


export default function Modal(props) {
    const { data, close, open, fiscaliaService, token } = props
    console.log(data)
    console.log(data.entidades)
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [option, setOption] = React.useState(false);
    const [preclasificación, setPreclasificacion] =React.useState([])
    const [preclasificaciónOption, setPreclasificacionOption] =React.useState("")
    const [comentarios, setComentarios] = React.useState("")

    useEffect(() => {
        if (data != "") {
            handleDataPreclasificacion()
        }
    }, [data]);

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }

    const handleDataRuc = async () => {
        const diccionario = {
            ruc: data.ruc,
            update_dicc: {
            precla: preclasificaciónOption,
            comentario: comentarios
        }
        }
        try {
            const response = await axios.post(`${API_URL}update_ruc`, diccionario,
                config
            );
            const data = response.data;
            console.log(data)

        } catch (error) {
            console.log("falle")
        }
    };

    const handleDataPreclasificacion = async () => {
       
        try {
            const response = await axios.get(`${API_URL}get_curso_precla`,
                config
            );
            const data = response.data.preclasificacion;
            setPreclasificacion(data)
            console.log(data, "data precla")

        } catch (error) {
            console.log("falle")
        }
    };

    const handleAccept = () => {
       handleDataRuc()
       close()
    };

    const handleOption = (valor) => {
        setOption(valor);
        if(valor === false){
            handleDataRuc()
            close()
        }
    };

    const handleComentarios = ({target}) => {
        const { name, value } = target;
        setComentarios(value)
       
     };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={close}
                fullWidth={fullWidth}
                maxWidth={maxWidth}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Sugerencia de modelo de preclasificación"}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={close}
                    color='primary'
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">

                        <Grid container >
                            <Grid item xs={6}>
                                <Button variant="contained" /* onClick={() => handleOption(false)}  */>Descargar</Button>
                                <TextField
                                    id="outlined-basic"
                                    label="Relato de la victima"
                                    variant="outlined"
                                    multiline
                                    disabled
                                    value={data.relato}
                                    sx={{ width: " 90%", mt: 2, mb: 2 }}
                                />
                                <Stack direction="row" spacing={1}>
                                <Chip label={data.entidades[0]} color="primary" />
                                    
                                </Stack>

                                <TextField
                                    id="outlined-basic"
                                    label="Codigo del delito"
                                    variant="outlined"
                                    sx={{ width: " 90%", mt: 2 }}
                                    disabled
                                    value={data.codigo_delito}
                                />

                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs={5} sx={{ maxHeight: "400px", marginLeft: "3%" }}>
                                <Alert severity="info" sx={{ mt: 2, mb: 2, width: " 100%" }}>Se espera que esta sección usted pueda seleccionar el modelo predictivo que más concuerde con su causa...</Alert>
                                <TextField
                                    id="outlined-basic"
                                    label="Sugerencia de preclasificación"
                                    variant="outlined"
                                    disabled
                                    sx={{ mb: 2, width: "100%" }}
                                    value={data.sug_precla}
                                />

                                {/*   <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    sx={{ mb: 2 }}
                                    renderInput={(params) => <TextField {...params} label="Curso de acción" />}

                                /> */}
                                <Stack spacing={2} direction="row" justifyContent="flex-end">
                                    <Button variant="outlined" onClick={() => handleOption(true)}>Rechazar</Button>
                                    <Button variant="contained" onClick={() => handleOption(false)} >Aceptar</Button>

                                </Stack>

                                {option === true ?
                                    <>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={preclasificación}
                                            sx={{ mt: 2, mb: 2 }}
                                            renderInput={(params) => <TextField {...params} label="Preclasificación manual" />}
                                            value={preclasificaciónOption}
                                            onChange={(event, newValue) => {
                                                setPreclasificacionOption(newValue);
                                              }}

                                        />

                                        <Stack spacing={2} direction="row" justifyContent="flex-end">
                                            <Button variant="contained" onClick={handleAccept}>Confirmar opción</Button>

                                        </Stack>
                                    </>
                                    : ""
                                }

                                <TextField
                                    label="Comentarios"
                                    variant="outlined"
                                    multiline
                                    rows={6}
                                    sx={{ mt: 2, mb: 5, width: "100%" }}
                                    value={comentarios}
                                    onChange={handleComentarios}
                                />


                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
     {/*    <DialogActions>
          <Button onClick={close} variant="outlined">Cancelar</Button>
          <Button onClick={handleAccept} autoFocus variant="contained">
            Aceptar
          </Button>
        </DialogActions>  */}
            </Dialog>
        </React.Fragment>
    );
}