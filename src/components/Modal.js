import * as React from 'react';
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




const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
];

export default function Modal(props) {
    const { data, close, open } = props
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [option, setOption] = React.useState(false);


    const handleAccept = () => {
        alert("si");
    };

    const handleOption = (valor) => {
        setOption(valor);
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
                        /* color: (theme) => theme.palette.grey[500], */
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
                                    value={"PRIMERO: Que, el día nueve de noviembre de dos mil veintitrés, ante la Sala delSexto Tribunal de Juicio Oral en lo Penal de Santiago, integrada por las juezas Nelly Villegas Becerra, quien presidió, Silvana Vera Riquelme y por el juez Gonzalo Alberto Martínez Merino, se llevó a efecto la audiencia de juicio oral en esta causa RIT N° 402-2023, seguido encontra de Juan Michael Escobar Flores, cédula de identidad N° 18.277.033-7, nacido en Santiago con fecha 24 de junio de 1992, 32 años, soltero, comerciante ambulante, domiciliado en calle Américo Vespucio Nº 03221, Población Lo Sierra, comuna de Lo Espejo. Fue parte acusadora en este juicio el Ministerio Público, representado por el Fiscal Adjunto Pablo Salinas Martínez, domiciliado en Av. José Miguel Carrera N° 3814, San Miguel.En calidad de querellante y en representación de la víctima de iniciales J.A.U.J., la abogada Elizabeth González González, del Programa de Apoyo a la Víctima del Ministerio del Interior."}
                                    sx={{ width: " 90%", mt: 2, mb: 2 }}
                                />
                                <Stack direction="row" spacing={1}>
                                    <Chip label="Armas: cuchillo" color="primary" />
                                    <Chip label="success" color="success" />
                                </Stack>

                                <TextField
                                    id="outlined-basic"
                                    label="Codigo del delito"
                                    variant="outlined"
                                    sx={{ width: " 90%", mt: 2 }}
                                    disabled
                                    value={"639680"}
                                />

                            </Grid>
                            <Divider orientation="vertical" flexItem />
                            <Grid item xs={5} sx={{ maxHeight: "400px", marginLeft: "3%" }}>
                                <Alert severity="info" sx={{ mt: 2, mb: 2, width: " 100%" }}>Se espera que esta sección usted pueda seleccionar el modelo predictivo que más concuerde con su causa...</Alert>

                                {/*   <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={top100Films}
                                    sx={{ mb: 2 }}
                                    renderInput={(params) => <TextField {...params} label="Sugerencia de preclasificación" />}

                                />  */}
                                <TextField
                                    id="outlined-basic"
                                    label="Sugerencia de preclasificación"
                                    variant="outlined"
                                    disabled
                                    sx={{ mb: 2, width: "100%" }}
                                    value={"Archivo provisional"}
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
                                            options={top100Films}
                                            sx={{ mt: 2, mb: 2 }}
                                            renderInput={(params) => <TextField {...params} label="Preclasificación manual" />}

                                        />

                                        <Stack spacing={2} direction="row" justifyContent="flex-end">
                                            <Button variant="contained" /* onClick={() => handleOption(false)}  */>Confirmar opción</Button>

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
                                //value={}
                                />


                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                {/*  <DialogActions>
          <Button onClick={close} variant="outlined">Cancelar</Button>
          <Button onClick={handleAccept} autoFocus variant="contained">
            Aceptar
          </Button>
        </DialogActions> */}
            </Dialog>
        </React.Fragment>
    );
}