import React, { useState, useEffect, } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TableSearch from './TableSearch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { API_URL } from '../api';
import axios from 'axios';


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

export default function Search(props) {

    const { data, token } = props
    const [dataCausasTabla, setDataCausasTabla] = React.useState("")
    const [value, setValue] = React.useState(dayjs('2024-07-06T21:11:54'));
    const [ruc, setRuc] = useState("")
    const [grupoDelitos, setGrupoDelitos] = useState([])
    const [estados, setEstados] = useState([])
    console.log(estados)

    useEffect(() => {
        if (token !== '') {
            handleDataRuc()
            handleDataEstados()
            handleDataGruposDelitos()
        }
    }, [token]);


    useEffect(() => {
        if (data !== '') {
            setDataCausasTabla(data)
        }
    }, [data]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
 

    const handleDataRuc = async () => {
        try {
            const response = await axios.post(`${API_URL}update_ruc`, "",
                config
            );
            const data = response.data;
            console.log(data, "data de los ruc")

        } catch (error) {
            console.log("falle")
        }
    };

    const handleDataEstados = async () => {
        try {
            const response = await axios.get(`${API_URL}get_estados`,
                config
            );
            const data = response.data.estados;
            setEstados(data)

        } catch (error) {
            console.log("falle")
        }
    };

    const handleDataGruposDelitos = async () => {
        try {
            const response = await axios.get(`${API_URL}get_grupo_delitos`,
                config
            );
            const data = response.data.grupos_delitos;
            console.log(data, "data de los delitos")
            setGrupoDelitos(data)

        } catch (error) {
            console.log("falle")
        }
    };

    return (

        <div>
            <div sx={{ mt: 4, mb: 5, ml: 2 }} >
                <br></br>
            </div>
            <Typography variant="h5">Preclasificación</Typography>


            <Grid container spacing={2} sx={{ mt: 4, mb: 5, ml: 2 }}>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={ruc}
                        sx={{ width: " 90%" }}
                        renderInput={(params) => <TextField {...params} label="RUC" />}

                    />
                </Grid>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={grupoDelitos}
                        sx={{ width: " 90%" }}
                        renderInput={(params) => <TextField {...params} label="Grupo de delito" />}

                    />
                </Grid>
                <Grid item xs={2}>
                <FormControl variant="outlined" sx={{ width: " 90%" }}>
							<InputLabel id="demo-simple-select-outlined-label">Estados</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								//value={selectStatusFlows.length > 1 ? "All" : selectStatusFlows[0]}
								required
								//onChange={handleOnChange}
								label={"Estados"}

							>
								{estados?.map((item) => {
									return (<MenuItem value={item}>{item}</MenuItem>)
								})} 
							</Select>
						</FormControl>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            label="Fecha"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ width: " 90%" }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        sx={{ width: 250, height: 55 }}
                    >Buscar</Button>
                </Grid>
            </Grid>

            <TableSearch data={dataCausasTabla} />
        </div>

    );
}