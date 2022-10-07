import React, {useEffect, useRef} from 'react';

import './style.scss';
import {
    Alert,
    CircularProgress,
    Backdrop,
} from '@mui/material';
import EnhancedTable from '../../components/Table/EnhancedTable';
import {debounce} from 'lodash/function';
import {round} from 'lodash/math';

const Buys = ({
    isLoading,
    error,
    buyList,
    countAll,
    params,
    page,
    pageSize,
    filters,
    sortBy,
    sortDir,
    
    fetch,
    setFilters,
    setPage,
    setSort,
    setPageSize,
    clearTable,
}) => {
    const debounced = useRef(debounce(fetch, 1000));
    
    useEffect(() => debounced.current(params), [params]);
    
    const headCells = [
        {
            id: 'item_name',
            isNumeric: false,
            label: 'Название',
            hasSorting: true,
            hasFilter: true,
            filterType: 'text',
            filterValue: filters.name,
            filterAdornment: null,
            filterPlaceholder: 'Фильтр названия',
            filterOnChange: event => setFilters({
                ...filters,
                name: event.target.value,
            }),
        },
        {
            id: 'date',
            isNumeric: false,
            label: 'Дата покупки',
            formatter: value => new Date(value.seconds * 1000).toLocaleString(),
            hasSorting: true,
            hasFilter: false,
        },
        {
            id: 'price_buy',
            isNumeric: true,
            label: 'Покупка, $',
            formatter: value => round(value, 2),
            hasSorting: true,
            hasFilter: false,
        },
        {
            id: 'price_sell',
            isNumeric: true,
            label: 'Продажа, $',
            formatter: value => round(value, 2),
            hasSorting: true,
            hasFilter: false,
        },
        {
            id: 'profit',
            isNumeric: true,
            label: 'Профит, $',
            formatter: value => round(value, 2),
            hasSorting: false,
            hasFilter: false,
        },
        {
            id: 'profit_in_percent',
            isNumeric: true,
            label: 'Профит, %',
            formatter: value => round(value, 2),
            hasSorting: false,
            hasFilter: false,
        },
        {
            id: 'sold',
            isNumeric: false,
            label: 'Продан',
            formatter: value => value ? 'Да' : 'Нет',
            hasSorting: true,
            hasFilter: false,
        },
    ];
    
    return (
        <>
            {error && (
                <Alert
                    severity="error"
                    variant="outlined"
                    sx={{
                        marginTop: 2,
                    }}>
                    {error}
                </Alert>
            )}
            <EnhancedTable
                tableName="История покупок"
                headCells={headCells}
                rows={buyList}
                countAll={countAll}
                sortBy={sortBy}
                sortDir={sortDir}
                page={page}
                pageSize={pageSize}
                clearTable={clearTable}
                refreshTable={fetch}
                setSort={setSort}
                setPage={setPage}
                setPageSize={setPageSize}/>
            <Backdrop
                sx={{color: '#fff', zIndex: theme => theme.zIndex.drawer + 1}}
                open={isLoading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
};

export default Buys;
