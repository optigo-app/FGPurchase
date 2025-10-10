import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import { Trash } from 'tabler-icons-react';
import CallSplitIcon from '@mui/icons-material/CallSplit';

const JobDataGrid = ({
    rows = [],
    selectedRows = [],
    setSelectedRows,
    handleRowClick,
    theme,
    mode,
    setTagBreakPopUp,
    dispatch,
    handleSingleDelete,
    handleCustomizeJobFlag,
    handleSelectedButton,
    paginationModel,
    onPaginationModelChange,
    handleSelectAllChange,
    handleCheckboxChange,
    handleUnclubJob,
}) => {

    const selectableRowIds = useMemo(
        () => rows.filter(r => !r.isClubJob).map(r => r.id),
        [rows]
    );

    const isAllSelected = selectedRows.length > 0 && selectableRowIds.every(id => selectedRows.includes(id));
    const isIndeterminate = selectedRows.length > 0 && !isAllSelected;

    const columns = useMemo(() => [
        {
            field: 'checkboxAndSr',
            headerName: 'SR#',
            sortable: false,
            width: 50,
            renderHeader: () => (
                <Checkbox
                    onChange={handleSelectAllChange}
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    sx={{
                        p: 0,
                        ml: 0,
                        '&:hover': { backgroundColor: 'transparent' },
                    }}
                />
            ),
            renderCell: (params) => (
                <Box display="flex" alignItems="center" gap={1}>
                    {params.row.isClubJob ? (
                        <CallSplitIcon
                            fontSize="small"
                            titleAccess="Unclub"
                            style={{ color: 'blue', cursor: 'pointer' }}
                            onClick={() => handleUnclubJob(params)}
                        />
                    ) : (
                        <Checkbox
                            checked={selectedRows.includes(params.row.id)}
                            onChange={(e) => handleCheckboxChange(e, params.row.id)}
                            sx={{
                                p: 0,
                                '&:hover': { backgroundColor: 'transparent' },
                            }}
                        />
                    )}
                </Box>
            ),
        },
        {
            field: 'details',
            headerName: 'Details',
            width: 130,
            renderCell: (params) => {
                const value = params.value;

                return (
                    <Box
                        sx={{
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Typography
                            variant="body2"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (mode === 'alteration_receive') {
                                    setTagBreakPopUp(true);
                                } else {
                                    dispatch(handleCustomizeJobFlag(true));
                                    dispatch(handleSelectedButton('add'));
                                }
                            }}
                            sx={{
                                fontWeight: 'bold !important',
                                textDecoration: 'underline',
                                color: theme?.palette?.customColors?.purple,
                                fontSize: '12px',
                            }}
                        >
                            {value}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '11px', mt: 0.5 }}>
                            {`Details: ${value?.split('/')[1] || ''}`}
                        </Typography>
                    </Box>
                );
            },
        },
        { field: 'gwt', headerName: 'GWT', width: 85 },
        { field: 'netwt', headerName: 'NetWt', width: 85 },
        ...(mode !== 'alteration_issue'
            ? [{
                field: 'totalamt',
                headerName: 'Amount',
                width: 105,
                valueFormatter: (params) => Number(params || 0).toFixed(2),
            }]
            : []),
        {
            field: 'actions',
            headerName: 'Actions',
            width: 70,
            sortable: false,
            renderCell: (params) => (
                <IconButton size="small" onClick={() => handleSingleDelete(params.row?.id)}>
                    <Trash size={20} color={theme?.palette?.customColors?.danger || 'grey'} />
                </IconButton>
            ),
        },
    ], [selectedRows, isAllSelected, isIndeterminate, mode]);

    return (
        <Box sx={{ height: 380, width: '100%' }}>
            <DataGrid
                getRowId={(row) => row.id}
                rows={rows}
                columns={columns}
                disableRowSelectionOnClick
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                pageSizeOptions={[5, 20, 30, 50]}
                pagination
                disableColumnMenu
                rowHeight={44}
                onRowClick={(params) => handleRowClick(params.row)}
                onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
                selectionModel={selectedRows}
                isRowSelectable={(params) => !params.row?.isClubJob}
                getRowClassName={(params) => params.row?.isClubJob ? 'club-job-row' : ''}
                sx={{
                    fontSize: '12px',
                    '& .MuiDataGrid-cell': {
                        py: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        whiteSpace: 'normal',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#F6F6F7',
                        color: 'grey',
                        fontSize: '12px',
                    },
                    '& .MuiCheckbox-root.Mui-checked': {
                        color: theme?.palette?.customColors?.purple,
                    },
                    '& .club-job-row': {
                        backgroundColor: '#ffffe0',
                    },
                    '& .MuiCheckbox-root:hover': {
                        backgroundColor: 'transparent !important',
                    },
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-cell:focus-within': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    },
                    '& .MuiDataGrid-row.Mui-selected': {
                        backgroundColor: 'inherit !important',
                    },
                    '& .MuiDataGrid-cell.Mui-selected': {
                        backgroundColor: 'inherit !important',
                    },
                }}
            />
        </Box>
    );
};

export default JobDataGrid;
