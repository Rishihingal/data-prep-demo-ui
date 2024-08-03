import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TablePagination, Box } from '@mui/material';

interface DataTableProps {
    data: string[][]; 
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const columns = data[0] || []; // Get the columns from the first row

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%', overflow: 'auto' }}>
            <Table stickyHeader aria-label="simple table" sx={{ minWidth: 1000 }}>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index} sx={{ fontSize: '0.75rem', padding: '0.28rem' }}>
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(1).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={index}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} sx={{ fontSize: '0.75rem', padding: '0.28rem' }}>
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length - 1}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default DataTable;
