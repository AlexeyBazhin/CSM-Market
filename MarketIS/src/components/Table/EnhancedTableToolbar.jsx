import React from 'react';
import {
    IconButton,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import {
    Clear as ClearIcon,
    Refresh as RefreshIcon,
} from '@mui/icons-material';

const EnhancedTableToolbar = ({
    tableName,
    
    clearTable,
    refreshTable,
}) => {
    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
            }}>
            <Typography
                sx={{flex: '1 1 100%'}}
                variant="h6"
                id="tableTitle"
                component="div">
                {tableName}
            </Typography>
            
            <Tooltip title="Очистить таблицу">
                <IconButton onClick={clearTable}>
                    <ClearIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Обновить таблицу">
                <IconButton onClick={refreshTable}>
                    <RefreshIcon/>
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

export default EnhancedTableToolbar;