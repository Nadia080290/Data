import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Typography } from '@mui/material';
import Geo from './Geo';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import TableGeo from './TableGeo';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
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

export default function InfoGeo() {
    const [value, setValue] = React.useState(dayjs('2024-07-06T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (

        <div>
            <div sx={{ mt: 4, mb: 5, ml: 2 }} >
                <Typography variant="h5">.</Typography>
            </div>
            <Typography variant="h5">Análisis criminal temprano</Typography>
            <Accordion sx={{ mt: 3, mb: 3}} >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{color: "#FA7900" }}/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                     <Typography variant="h7" sx={{color: "#FA7900" }}>Aqui encontraras las alertas de RUC sugeridos</Typography>
                    {/* <Alert severity="info" sx={{ width: "100%", color: "#0288d1" }}>Aqui encontraras las alertas de RUC sugeridos</Alert> */}
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 4 }}>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>

                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>


                    </Stack>
                    <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 4 }}>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>

                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>
                        <Alert severity="info">Ruc 1263996 se asocio a fenomenología "BLA"</Alert>


                    </Stack>
                </AccordionDetails>
            </Accordion>



            <Grid container spacing={2} sx={{ mt: 4, mb: 5, ml: 2 }}>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: " 90%" }}
                        renderInput={(params) => <TextField {...params} label="RUC" />}

                    />
                </Grid>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: " 90%" }}
                        renderInput={(params) => <TextField {...params} label="Grupo de delito" />}

                    />
                </Grid>
                {/*  <Grid item xs={2}>
                    <TextField
                        id="outlined-basic"
                        label="Estado"
                        variant="outlined"
                        sx={{ width: " 90%" }}
                    />
                </Grid> */}

                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Desde"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ width: " 90%" }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Hasta"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ width: " 90%" }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id="outlined-basic"
                        label="Palabra clave"
                        variant="outlined"
                        sx={{ width: " 90%" }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        sx={{ width: 250, height: 55 }}
                    >Buscar</Button>
                </Grid>
            </Grid>
            <TableGeo />
            <Typography variant="h5" sx={{ mt: 4, mb: 4 }}>Mapa</Typography>
            <Geo />
        </div>

    );
}