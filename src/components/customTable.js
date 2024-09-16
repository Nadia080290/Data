import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';
import IntlMessages from 'util/IntlMessages';
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TableSortLabel } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3)
        }
    },
    input: {
        borderRadius: 4,
        position: "relative",
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "5px 6px 5px 8px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
        }
    }
}))(InputBase);

export const CustomTable = ({ headers, data, definitions, orderBy, order, totalItems, page, pageSize, pageChanged, pageSizeChanged, sorted }) => {

    const renderCell = (key, row) => {
        const results = definitions
            .filter(def => def.key === key);
        const def = results[0];

        return def.value(row);
    }

    const shortDirectionVisible = (element) => {
        if (element.withoutOrder) {
            return false;
        }

        return orderBy === element.key ? order : false
    }

    const headerCellClicked = (element) => {
        if (!element.withoutOrder) {
            const ordered = order === "asc" ? "desc" : "asc";
            return sorted({ orderBy: element.key, order: ordered })
        }
    }

    const isActiveSort = (element) => {
        if (!element.withoutOrder) {
            return orderBy === element.key
        } else {
            return false;
        }
    }

    const renderMessage = (element) =>{
        if(element.message){
            return  <IntlMessages id={element.message} />
        } else{
            return null
        }
    }

    return (
        <Grid>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow>
                            {
                                headers.map((element, index) => {
                                    return <TableCell
                                        key={index}
                                        style={{ background: '#369bff', color: '#ffffff', fontFamily: "Poppins", fontSize: '12px', fontWeight: 400}}
                                        sortDirection={shortDirectionVisible(element)}
                                        onClick={() => headerCellClicked(element)}
                                        align= "center">
                                        {element.withoutOrder === true ? renderMessage(element) : <TableSortLabel
                                            active={isActiveSort(element)}
                                            direction={orderBy === element.key ? order : 'asc'}>
                                            {renderMessage(element)}
                                        </TableSortLabel>}


                                    </TableCell>
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.map((row, index) => {
                                return <TableRow key={index}>
                                    {
                                        headers.map((header, idx) => {
                                            return <TableCell key={idx} style={{ fontFamily: "Poppins", textAlign: "center", fontSize: "13px" }}>
                                                {renderCell(header.key, row)}
                                            </TableCell>
                                        })
                                    }
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container className="mt-3 ml-3">
                <Grid item xs display="flex" justifyContent="flex-start" alignItems="left">
                    <span style={{ marginTop: 20, color: "#369bff" }}><IntlMessages id="document.row.by.page" /> : </span>
                    <FormControl error>
                        {/*<div style={{ width: '300px' }}>*/}
                        <div style={{ width: '30px' }}>
                            <Select
                                id="page-size"
                                value={pageSize}
                                onChange={(value) => pageSizeChanged(value)}
                                input={<BootstrapInput />}
                                style={{ marginTop: "-5px" }}>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                                <MenuItem value={100}>100</MenuItem>
                            </Select>
                        </div>
                    </FormControl>
                </Grid >
                <Grid item xs display="flex" justifyContent="flex-end" alignItems="right">
                    <Pagination
                        page={page}
                        style={{ color: '#369bff', float:"right"}}
                        count={Math.ceil(totalItems / pageSize)}
                        color="primary"
                        shape="rounded"
                        total={totalItems}
                        onChange={pageChanged} />
                </Grid>
            </Grid>
        </Grid>
    )
}