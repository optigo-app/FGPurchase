import React, { useEffect, useState } from 'react';
import {
  Tooltip,
  Modal,
  Box,
  Button,
  useTheme,
  Tabs,
  Tab,
  Grid2,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { handleIssuedMaterialModal } from '../../../../redux/slices/HomeSlice';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import './issuedmaterial.css';

const IssuedMaterial = () => {
  const issuedMaterialModal = useSelector((state) => state?.home?.issuedMaterialModal);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(1);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [arrType, setArrType] = useState([]);
  const [columns, setColumns] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });


  const diamond_data = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    sr: index + 1,
    customer: 'Stock',
    lot: 1412,
    type: 'Dr-01',
    shape: '9P AS',
    clarity: 'Any',
    color: 'Any',
    size: '1mm',
    ctw: 10.345,
    receivepcs: <input type="text" placeholder="Enter value" style={{height:'35px', maxWidth: '130px', }} className="ibtninput" />,
    receivectw: <input type="text" placeholder="Enter value" style={{height:'35px', maxWidth: '130px', }} className="ibtninput" />,
  }));

  const misc_data = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    sr: index + 1,
    customer: 'Stock',
    lot: 1412,
    type: 'Dr-01',
    shape: '9P AS',
    clarity: 'Any',
    color: 'Any',
    size: '1mm',
    ctw: 10.345,
    receivepcs: <input type="text" placeholder="Enter value" style={{height:'35px', maxWidth: '130px', }} className="ibtninput" />,
    receivectw: <input type="text" placeholder="Enter value" style={{height:'35px', maxWidth: '130px', }} className="ibtninput" />,
    gwt: <input type="checkbox" placeholder="Enter value" style={{height:'35px', maxWidth: '130px', cursor: 'pointer' }} className="ibtninput" />,
  }));

  const finding_data = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    sr: index + 1,
    customer: 'Stock',
    lot: 1412,
    ftype: 'Block Chain',
    accessories: 'Anchor Chain',
    mtype: 'Gold',
    purity: '18K',
    color: 'yellow pl',
    gm: 0.1,
    tunch: 76,
    wastage: <input type="text" placeholder="Enter value" style={{height:'35px', maxWidth: '130px', }} className="ibtninput" />,
    receivepcs: <input type="text" placeholder="Enter value" style={{height:'35px', maxWidth: '130px', }} className="ibtninput" />,
    receivegm: <input type="text" placeholder="Enter value" style={{height:'35px', maxWidth: '130px', }} className="ibtninput" />,
  }));

  const diamond_columns = [
    { field: 'sr', headerName: 'Sr#', minWidth: 50, align: 'center', headerAlign: 'center' },
    { field: 'customer', headerName: 'Customer#', minWidth: 100 },
    { field: 'lot', headerName: 'Lot', minWidth: 100 },
    { field: 'type', headerName: 'Type', minWidth: 100 },
    { field: 'shape', headerName: 'Shape', minWidth: 100 },
    { field: 'clarity', headerName: 'Clarity', minWidth: 100 },
    { field: 'color', headerName: 'Color', minWidth: 100 },
    { field: 'size', headerName: 'Size', minWidth: 50 },
    { field: 'ctw', headerName: 'Ctw', minWidth: 60 },
    {
      field: 'receivepcs', headerName: 'Receive Pcs', minWidth: 150,
      renderCell: (params) => params.value,
    },
    {
      field: 'receivectw', headerName: 'Receive Ctw', minWidth: 150,
      renderCell: (params) => params.value,
    },
  ];

  const misc_columns = [
    ...diamond_columns,
    {
      field: 'gwt', headerName: 'GWT', minWidth: 50,
      renderCell: (params) => params.value,
    },
  ];

  const finding_columns = [
    { field: 'sr', headerName: 'Sr#', minWidth: 50 },
    { field: 'customer', headerName: 'Customer#', minWidth: 100 },
    { field: 'lot', headerName: 'Lot', minWidth: 100 },
    { field: 'ftype', headerName: 'FType', minWidth: 100 },
    { field: 'accessories', headerName: 'Accessories', minWidth: 100 },
    { field: 'mtype', headerName: 'M.Type', minWidth: 100 },
    { field: 'purity', headerName: 'Purity', minWidth: 100 },
    { field: 'color', headerName: 'Color', minWidth: 100 },
    { field: 'gm', headerName: 'GM', minWidth: 60 },
    { field: 'tunch', headerName: 'Tunch', minWidth: 60 },
    {
      field: 'wastage', headerName: 'Wastage', minWidth: 110,
      renderCell: (params) => params.value,
    },
    {
      field: 'receivepcs', headerName: 'Receive Pcs', minWidth: 150,
      renderCell: (params) => params.value,
    },
    {
      field: 'receivegm', headerName: 'Receive GM', minWidth: 150,
      renderCell: (params) => params.value,
    },
  ];

  useEffect(() => {
    setTabValue(1);
    setArrType(diamond_data);
    setColumns(diamond_columns);
  }, []);

  const handleTabsChange = (e, newValue) => {
    setTabValue(newValue);
    if (newValue === 1 || newValue === 2) {
      setArrType(diamond_data);
      setColumns(diamond_columns);
    } else if (newValue === 3) {
      setArrType(misc_data);
      setColumns(misc_columns);
    } else if (newValue === 4) {
      setArrType(finding_data);
      setColumns(finding_columns);
    }
  };

  const getTabStyle = (isSelected) => ({
    color: isSelected ? `${theme?.palette?.customColors?.purple}` : 'black',
    fontWeight: isSelected ? 'bold' : 'normal',
  });

  const indicatorStyle = {
    backgroundColor: `${theme?.palette?.customColors?.purple}`,
    height: '2px',
  };

  return (
    <>
      <Modal
        open={issuedMaterialModal}
        onClose={() => dispatch(handleIssuedMaterialModal(false))}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxHeight: 1000,
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '300px',
            border: 'none',
            minWidth: '60vw',
          }}
        >
          <div className='d-flex justify-content-between align-items-center w-100 py-2 pb-2 px-0 border-bottom mb-2'>
            <div>&nbsp;</div>
            <div>
              <Typography variant='h5' className='fs_fgp' sx={{ color: theme?.palette?.customColors?.purple }}>
                Receive From Vendor
              </Typography>
            </div>
            <div>
              <Tooltip title="Close">
                <CancelIcon style={{ cursor: 'pointer' }} onClick={() => dispatch(handleIssuedMaterialModal(false))} />
              </Tooltip>
            </div>
          </div>

          <div className='pb-2 w-100 d-flex align-items-center justify-content-end px-1'>
            <Grid2 container spacing={2}>
              <Grid2 item xs={12} sm={6} md={3}>
                <select name="issueBy" id="issueBy" className='p-1 fs_fgp'>
                  <option value="" selected disabled>Search By</option>
                  <option value="design">Design#</option>
                  <option value="po">PO#</option>
                  <option value="job">Job#</option>
                  <option value="batch">Batch#</option>
                </select>
              </Grid2>
              <Grid2 item xs={12} sm={6} md={3}>
                <Button size='small' variant='contained' className='fs_fgp' sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }}>
                  Receive Now
                </Button>
              </Grid2>
              <Grid2 item xs={12} sm={6} md={3}>
                <Button size='small' variant='contained' className='fs_fgp' sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }}>
                  Receive & Close
                </Button>
              </Grid2>
            </Grid2>
          </div>

          <div className='mb-1'>
            <Tabs
              value={tabValue}
              onChange={handleTabsChange}
              TabIndicatorProps={{ style: indicatorStyle }}
            >
              <Tab style={getTabStyle(tabValue === 1)} className='fs_fgp' label="Diamond" value={1} />
              <Tab style={getTabStyle(tabValue === 2)} className='fs_fgp' label="Colorstone" value={2} />
              <Tab style={getTabStyle(tabValue === 3)} className='fs_fgp' label="Misc" value={3} />
              <Tab style={getTabStyle(tabValue === 4)} className='fs_fgp' label="Finding" value={4} />
            </Tabs>
          </div>

          <div className='mt-1 mb-2 d-flex align-items-center fs_fgp flex-wrap gap-1'>
            <div style={{ width: '100px' }} className='d-flex justify-content-center'>
              <Button size='small' variant='contained' sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }}>
                All
              </Button>
            </div>
            {/* Search Inputs */}
            {columns.slice(1, 8).map((col, idx) => (
              <input key={idx} type="text" placeholder={col.headerName} style={{ width: '93px' }} className='mx-1 ibtninput' />
            ))}
          </div>

          <div style={{ height: 631, width: '100%' }}>
            <DataGrid
              rows={arrType}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={(model) => setPaginationModel(model)}
              pageSizeOptions={[10, 20, 30, 50]}
              pagination
              disableColumnMenu
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newSize) => setRowsPerPage(newSize)}
              sx={{
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                '& .MuiDataGrid-cell:focus-within': {
                  outline: 'none',
                },
              }}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default IssuedMaterial;
