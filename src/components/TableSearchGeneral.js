import { Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect} from 'react';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Modal from './Modal';


export const TableSearchGeneral = (props) => {


    const { data } = props
    console.log(data, "en la tabla")
    const [dataTabla, setDataTabla] = React.useState([])
    const [page, setPage] = useState(0)

    useEffect(() => {
        if (data !== '') {
            setDataTabla(data)
        }
    }, [data]);


    const handleChangePage = (event, page) => {
        setPage(page);
    };

    const [openModal, setOpenModal] = React.useState(false);

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };
    return (
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ background: '#369bff', color: '#ffffff',fontSize: '12px', fontWeight: 400 }} >
                                    RUC
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
                                    Estados
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
                                    Codigo de delito
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff',  fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
                                    Grupo de delito
                                </TableCell>
                                <TableCell className='mr-3' style={{ background: '#369bff', color: '#ffffff', fontSize: '12px', fontWeight: 400, textAlign: 'center' }} >
                                    Accion
                                </TableCell>
                            </TableRow>
                        </TableHead>
                 <TableBody>

                            {dataTabla?.map(({ ruc, estado, codigo_delito, grupo_delito }, index) => {
                                return <TableRow key={index}>
                                    <TableCell>{ruc}</TableCell>
                                    <TableCell>{estado}</TableCell>
                                    <TableCell>{codigo_delito}</TableCell>
                                    <TableCell>{grupo_delito}</TableCell>
                                    <TableCell align="right"><AnalyticsIcon sx={{ color: "#FA7900" }} onClick={handleClickOpen} /></TableCell>
                                </TableRow>

                            })

                            }

                        </TableBody> 
                    </Table>
                </TableContainer>
                <Grid className="mt-3 mb-3 mr-3"
                    container
                    justify="flex-end"
                    alignItems="flex-end"

                >
                    <Pagination
                        style={{ color: '#369bff' }}
                        count={Math.ceil(data.length/ 10)}
                        color="primary"
                        shape="rounded"
                        total={data.length}
                        onChange={handleChangePage} />
                </Grid>

            </div>
            <Modal open={openModal} close={handleClose}/>
        </div>
    )
}


