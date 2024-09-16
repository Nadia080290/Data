import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Modal from './Modal';



export default function TableSearchCausas(props) {
    const {data} = props
    console.log(data, "en la tabla sii")
    const [openModal, setOpenModal] = React.useState(false);

    const columns = [
        { field: 'ruc', headerName: 'RUC', width: 70 },
        { field: 'estado', headerName: 'Estado', width: 130 },
        { field: 'fecha', headerName: 'Fecha', width: 130 },
        { field: 'codigo_delito',headerName: 'Codigo de delito',type: 'number',width: 90},
        { field: 'grupo_delito',headerName: 'Grupo de delito',type: 'number',width: 90},
       /*  { field: 'acciones', headerName: 'Acciones', sortable: false,width: 160}, */
       { 
          field: 'acciones', 
          headerName: 'Acciones', 
          sortable: false,
          width: 160,
          renderCell: (params) => (
            
              <AnalyticsIcon sx={{color: "#FA7900"}} 
              onClick={() => handleClickOpen(params.row)}/>
          ),
        },
      ];
      
      
      const paginationModel = { page: 0, pageSize: 5 };

    const handleClickOpen = () => {
      setOpenModal(true);
    };
  
    const handleClose = () => {
      setOpenModal(false);
    };

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableColumnMenu
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    <Modal open={openModal} close={handleClose}/>
    </Paper>
  );
}