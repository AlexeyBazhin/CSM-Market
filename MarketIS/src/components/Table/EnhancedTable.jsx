import React from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
} from '@mui/material';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

const EnhancedTable = ({
    tableName,
    headCells,
    rows,
    countAll,
    sortBy,
    sortDir,
    page,
    pageSize,
    
    clearTable,
    refreshTable,
    setSort,
    setPage,
    setPageSize,
}) => {
    const handleRequestSort = property => {
        const isAsc = sortBy === property && sortDir === 'asc';
        setSort({
            sortBy: property,
            sortDir: isAsc ? 'desc' : 'asc',
        });
    };
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = event => {
        setPageSize(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * pageSize - countAll) : 0;
    
    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <EnhancedTableToolbar
                    tableName={tableName}
                    clearTable={clearTable}
                    refreshTable={refreshTable}/>
                <TableContainer>
                    <Table
                        sx={{minWidth: 750}}
                        aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            headCells={headCells}
                            sortDir={sortDir}
                            sortBy={sortBy}
                            onRequestSort={handleRequestSort}/>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.id}>
                                    {headCells.map(({
                                        id,
                                        isNumeric,
                                        formatter,
                                    }) => (
                                        <TableCell
                                            key={id}
                                            padding="normal"
                                            align={isNumeric
                                                ? 'right'
                                                : 'left'}>
                                            {formatter
                                                ? formatter(row[id])
                                                : row[id]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}>
                                    <TableCell colSpan={headCells.length}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[20, 50, 100]}
                    component="div"
                    count={countAll}
                    rowsPerPage={pageSize}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelDisplayedRows={({from, to, count}) => `${from}–${to} из ${count !== -1
                        ? count
                        : `больше чем ${to}`}`}
                    labelRowsPerPage="Строк на странице:"/>
            </Paper>
        </Box>
    );
};

export default EnhancedTable;