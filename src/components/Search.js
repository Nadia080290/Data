import React, { useState, useEffect, } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TableSearch from './TableSearch';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { API_URL } from '../api';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



export default function Search(props) {

    const { token, fiscaliaService } = props
    const [value, setValue] = React.useState(null);
    const [ruc, setRuc] = useState("")
    const [grupoDelitos, setGrupoDelitos] = useState([])
    const [grupoDelitosOption, setGrupoDelitosOption] = useState("")
    const [estados, setEstados] = useState([])
    const [estadosOption, setEstadosOption] = useState("")
    const [fecha, setFecha] = useState("")
    const [dataCausas, setDataCausas] = useState("")
    const [cleared, setCleared] = React.useState(false);

    const [dataTabla, setDataTabla] = React.useState([])
    console.log(dataTabla, "tenemos dataaa")
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }

    useEffect(() => {
           if (cleared === true) {
             setFecha("")
           }
     }, [cleared]);

  /*    useEffect(() => {
        if (data.length >= 0) {
          setDataTabla(data)
        }
  }, [data]); */


    useEffect(() => {
        if (token !== '') {
            handleDataEstados()
            handleDataGruposDelitos()
            handleTableDate()
        }
    }, [token]);

    const handleTableDate = async () => {
        const fiscalia = {
            fiscalia: fiscaliaService
        }
        try {
            const response = await axios.post(`${API_URL}get_causas`, fiscalia, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = response.data;
            setDataCausas(data)
            setDataTabla(data)

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
            setGrupoDelitos(data)

        } catch (error) {
            console.log("falle")
        }
    };


    const handleSearchTable = async () => {
        const dataSearch = {
            fiscalia: fiscaliaService,
            grupo_delito: grupoDelitosOption,
            estado: estadosOption,
            fecha: fecha,
            ruc: ruc,
        }
        console.log(dataSearch)
        try {
            const response = await axios.post(`${API_URL}search_rucs`, dataSearch, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = response.data;
            setDataCausas(data)
            setDataTabla(data)
            console.log(data, "SOY la respuesta!!")

        } catch (error) {
            console.log("falle")
        }
    };

    const handleChangeEstados = ({ target }) => {
        const { name, value } = target;
        setEstadosOption(value)

    }
    const handleChangeRuc = ({ target }) => {
        const { name, value } = target;
        setRuc(value)

    }
    const handleChangeFecha = (newValue) => {
        console.log(newValue)
        setValue(newValue)
        const fechaFormato = dayjs(newValue).format("YYYY-MM-DD")
        setFecha(fechaFormato)


    }

    return (

        <div>
            <div sx={{ mt: 4, mb: 5, ml: 2 }} >
                <br></br>
            </div>
            <Typography variant="h5">Preclasificación</Typography>


            <Grid container spacing={2} sx={{ mt: 4, mb: 5, ml: 2 }}>
                <Grid item xs={2}>
                    <TextField
                        fullWidth
                        label="RUC"
                        onChange={handleChangeRuc}
                        autoFocus
                        value={ruc}
                    />
                </Grid>
                <Grid item xs={2}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={grupoDelitos}
                        value={grupoDelitosOption}
                        onChange={(event, newValue) => {
                            setGrupoDelitosOption(newValue);
                        }}
                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Grupo de delito" />}

                    />
                </Grid>
                <Grid item xs={2}>
                <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={estados}
                        value={estadosOption}
                        onChange={(event, newValue) => {
                            setEstadosOption(newValue);
                        }}
                        sx={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Estados" />}

                    />
                   {/*  <FormControl variant="outlined" sx={{ width: "100%" }}>
                        <InputLabel id="demo-simple-select-outlined-label">Estados</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={estadosOption}
                            required
                            onChange={handleChangeEstados}
                            label={"Estados"}

                        >
                            {estados && estados.map((item) => {
                                return (<MenuItem value={item}>{item}</MenuItem>)
                            })}
                        </Select>
                    </FormControl> */}
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{ width: "100%" }}
                            label="Fecha"
                            value={value}
                            onChange={handleChangeFecha}
                            slotProps={{
                                field: { clearable: true, onClear: () => setCleared(true) },
                              }}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        sx={{ width: 250, height: 55 }}
                        onClick={handleSearchTable}
                    >Buscar</Button>
                </Grid>
            </Grid>

            {dataCausas &&
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> &&
                <TableSearch data={dataCausas} fiscaliaService={fiscaliaService} token={token} />}

        </div>

    );
}