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
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { API_URL } from '../api';
import axios from 'axios';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TableSearchCausas from './TableSearchCausas';
import { TableSearchGeneral } from './TableSearchGeneral';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function Search(props) {

    const {data, token, fiscaliaService } = props
    const [value, setValue] = React.useState(dayjs());
    const [ruc, setRuc] = useState("")
    const [grupoDelitos, setGrupoDelitos] = useState([])
    const [grupoDelitosOption, setGrupoDelitosOption] = useState("")
    const [estados, setEstados] = useState([])
    const [estadosOption, setEstadosOption] = useState("")
    const fechaFormato = dayjs(value).format("YYYY-MM-DD")

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    }
   
    useEffect(() => {
        if (token !== '') {
            handleDataEstados()
            handleDataGruposDelitos()
        }
    }, [token]);



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
            grupo_delitos: grupoDelitosOption,
            estado: estadosOption,
            fecha: fechaFormato,
    
        }
        try {
            const response = await axios.post(`${API_URL}serach_rucs`, dataSearch, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = response.data;
            //setDataCausasTabla(data)
            console.log(data)

        } catch (error) {
            console.log("falle")
        }
    };

    const handleChangeEstados = ({ target }) => {
        const { name, value } = target;
        setEstadosOption(value)

    }
    const handleChangeRuc = (newValue) => {
         console.log(newValue)
         setRuc(newValue)
  
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
                    <FormControl variant="outlined" sx={{ width: "100%" }}>
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
                    </FormControl>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{ width: "100%" }}
                            label="Fecha"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
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

           <TableSearch data={data} fiscaliaService={fiscaliaService} token={token}/> 
        </div>

    );
}