import React from 'react';
import {
    Box,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    InputAdornment, OutlinedInput,
} from '@mui/material';
import {visuallyHidden} from '@mui/utils';

const EnhancedTableHead = ({
    sortDir,
    sortBy,
    onRequestSort,
    headCells,
}) => {
    const createSortHandler = property => () => onRequestSort(property);
    
    return (
        <TableHead>
            <TableRow>
                {headCells.map(({
                    id,
                    isNumeric,
                    label,
                    hasSorting,
                    hasFilter,
                    filterValue,
                    // filterType,
                    filterAdornment,
                    filterPlaceholder,
                    filterOnChange,
                }) => (
                    <TableCell
                        key={id}
                        align={isNumeric ? 'right' : 'left'}
                        padding="normal"
                        sortDirection={sortBy === id ? sortDir : false}>
                        {hasSorting
                            ? (
                                <TableSortLabel
                                    active={sortBy === id}
                                    direction={sortBy === id ? sortDir : 'asc'}
                                    onClick={createSortHandler(id)}>
                                    {label}
                                    {sortBy === id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {sortDir === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            )
                            : label}
                        {hasFilter
                            ? Array.isArray(filterPlaceholder)
                                ? (
                                    <div>
                                        <OutlinedInput
                                            size="small"
                                            endAdornment={filterAdornment && (
                                                <InputAdornment position="end">{filterAdornment}</InputAdornment>)}
                                            placeholder={filterPlaceholder.start}
                                            onChange={filterOnChange.start}/>
                                        <OutlinedInput
                                            size="small"
                                            endAdornment={filterAdornment && (
                                                <InputAdornment position="end">{filterAdornment}</InputAdornment>)}
                                            placeholder={filterPlaceholder.end}
                                            onChange={filterOnChange.end}/>
                                    </div>
                                )
                                : (
                                    <div>
                                        <OutlinedInput
                                            size="small"
                                            value={filterValue}
                                            endAdornment={filterAdornment && (
                                                <InputAdornment position="end">{filterAdornment}</InputAdornment>)}
                                            placeholder={filterPlaceholder}
                                            onChange={filterOnChange}/>
                                    </div>
                                )
                            : null
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default EnhancedTableHead;