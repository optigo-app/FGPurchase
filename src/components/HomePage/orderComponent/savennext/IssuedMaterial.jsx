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
  Alert,
  Collapse,
  Divider,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { handleIssuedMaterialModal } from '../../../../redux/slices/HomeSlice';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import './issuedmaterial.css';
import { validateMultipleRows } from '../../../../Utils/materialDataMapper';

const IssuedMaterial = ({ onReceiveData }) => {
  const issuedMaterialModal = useSelector((state) => state?.home?.issuedMaterialModal);
  const dispatch = useDispatch();
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(1);
  const [page, setPage] = useState(0);
  const [arrType, setArrType] = useState([]);
  const [columns, setColumns] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 100,
  });

  const [selectedRows, setSelectedRows] = useState({
    diamond: [],
    colorstone: [],
    misc: [],
    finding: []
  });

  const [checkedItems, setCheckedItems] = useState({
    diamond: {},
    colorstone: {},
    misc: {},
    finding: {}
  });

  const [inputValues, setInputValues] = useState({
    diamond: {},
    colorstone: {},
    misc: {},
    finding: {}
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);

  const getCurrentMaterialType = () => {
    switch (tabValue) {
      case 1: return 'diamond';
      case 2: return 'colorstone';
      case 3: return 'misc';
      case 4: return 'finding';
      default: return 'diamond';
    }
  };

  const handleInputChange = (rowId, fieldName, value, materialType) => {
    const targetMaterialType = materialType || getCurrentMaterialType();
    setInputValues(prev => ({
      ...prev,
      [targetMaterialType]: {
        ...prev[targetMaterialType],
        [rowId]: {
          ...prev[targetMaterialType][rowId],
          [fieldName]: value
        }
      }
    }));
  };

  const getInputValue = (rowId, fieldName) => {
    const materialType = getCurrentMaterialType();
    return inputValues[materialType]?.[rowId]?.[fieldName] || '';
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
      setErrorMessage('');
    }, 5000);
  };

  const handleInputFocus = (e) => {
    e.target.select();
  };

  const handleKeyDown = (e, currentRowId, currentField) => {
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      e.target.select();
      return;
    }

    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      let nextRowId, nextField;
      if (currentField === 'receivepcs') {
        nextRowId = currentRowId;
        const materialType = getCurrentMaterialType();
        nextField = (materialType === 'finding' || materialType === 'misc') ? 'receivegm' : 'receivectw';
      } else {
        nextRowId = currentRowId + 1;
        nextField = 'receivepcs';
      }
      const nextInput = document.querySelector(`input[data-row="${nextRowId}"][data-field="${nextField}"]`);
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      let nextRowId, nextField;
      if (currentField === 'receivepcs') {
        nextRowId = currentRowId;
        const materialType = getCurrentMaterialType();
        nextField = (materialType === 'finding' || materialType === 'misc') ? 'receivegm' : 'receivectw';
      } else {
        nextRowId = currentRowId + 1;
        nextField = 'receivepcs';
      }
      const nextInput = document.querySelector(`input[data-row="${nextRowId}"][data-field="${nextField}"]`);
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  };

  const getDiamondData = () => Array.from({ length: 50 }, (_, index) => {
    const rowId = index + 1;
    return {
      id: rowId,
      sr: rowId,
      customer: 'Stock',
      lot: 1412,
      type: 'Dr-01',
      shape: '9P AS',
      clarity: 'Any',
      color: 'Any',
      size: '1mm',
      ctw: 10.345,
      receivepcs: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          data-row={rowId}
          data-field="receivepcs"
          value={inputValues.diamond?.[rowId]?.receivepcs || ''}
          onChange={(e) => handleInputChange(rowId, 'receivepcs', e.target.value, 'diamond')}
          onKeyDown={(e) => handleKeyDown(e, rowId, 'receivepcs')}
          onFocus={handleInputFocus}
        />
      ),
      receivectw: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          data-row={rowId}
          data-field="receivectw"
          value={inputValues.diamond?.[rowId]?.receivectw || ''}
          onChange={(e) => handleInputChange(rowId, 'receivectw', e.target.value, 'diamond')}
          onKeyDown={(e) => handleKeyDown(e, rowId, 'receivectw')}
          onFocus={handleInputFocus}
        />
      ),
      receivepcsValue: inputValues.diamond?.[rowId]?.receivepcs || '',
      receivectwValue: inputValues.diamond?.[rowId]?.receivectw || '',
    };
  });

  const getColorstoneData = () => Array.from({ length: 50 }, (_, index) => {
    const rowId = index + 1;
    return {
      id: rowId,
      sr: rowId,
      customer: 'Stock',
      lot: 1412,
      type: 'CS-01',
      shape: 'Round',
      clarity: 'Any',
      color: 'Any',
      size: '2mm',
      ctw: 5.234,
      receivepcs: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          data-row={rowId}
          data-field="receivepcs"
          value={inputValues.colorstone?.[rowId]?.receivepcs || ''}
          onChange={(e) => handleInputChange(rowId, 'receivepcs', e.target.value, 'colorstone')}
          onKeyDown={(e) => handleKeyDown(e, rowId, 'receivepcs')}
          onFocus={handleInputFocus}
        />
      ),
      receivectw: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          data-row={rowId}
          data-field="receivectw"
          value={inputValues.colorstone?.[rowId]?.receivectw || ''}
          onChange={(e) => handleInputChange(rowId, 'receivectw', e.target.value, 'colorstone')}
          onKeyDown={(e) => handleKeyDown(e, rowId, 'receivectw')}
          onFocus={handleInputFocus}
        />
      ),
      receivepcsValue: inputValues.colorstone?.[rowId]?.receivepcs || '',
      receivectwValue: inputValues.colorstone?.[rowId]?.receivectw || '',
    };
  });

  const getMiscData = () => Array.from({ length: 10 }, (_, index) => {
    const rowId = index + 1;
    return {
      id: rowId,
      sr: rowId,
      customer: 'Stock',
      lot: 1412,
      type: 'Dr-01',
      shape: '9P AS',
      clarity: 'Any',
      color: 'Any',
      size: '1mm',
      ctw: 10.345,
      receivepcs: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          data-row={rowId}
          data-field="receivepcs"
          value={inputValues.misc?.[rowId]?.receivepcs || ''}
          onChange={(e) => handleInputChange(rowId, 'receivepcs', e.target.value, 'misc')}
          onKeyDown={(e) => handleKeyDown(e, rowId, 'receivepcs')}
          onFocus={handleInputFocus}
        />
      ),
      receivegm: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          data-row={rowId}
          data-field="receivegm"
          value={inputValues.misc?.[rowId]?.receivegm || ''}
          onChange={(e) => handleInputChange(rowId, 'receivegm', e.target.value, 'misc')}
          onKeyDown={(e) => handleKeyDown(e, rowId, 'receivegm')}
          onFocus={handleInputFocus}
        />
      ),
      gwt: '',
      receivepcsValue: inputValues.misc?.[rowId]?.receivepcs || '',
      receivegmValue: inputValues.misc?.[rowId]?.receivegm || '',
    };
  });

  const getFindingData = () => Array.from({ length: 10 }, (_, index) => {
    const rowId = index + 1;
    return {
      id: rowId,
      sr: rowId,
      customer: 'Stock',
      lot: 1412,
      ftype: 'Block Chain',
      accessories: 'Anchor Chain',
      mtype: 'Gold',
      purity: '18K',
      color: 'yellow pl',
      gm: 0.1,
      tunch: 76,
      wastage: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          value={getInputValue(rowId, 'wastage')}
          onChange={(e) => handleInputChange(rowId, 'wastage', e.target.value)}
        />
      ),
      receivepcs: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          data-row={rowId}
          data-field="receivepcs"
          value={inputValues.finding?.[rowId]?.receivepcs || ''}
          onChange={(e) => handleInputChange(rowId, 'receivepcs', e.target.value, 'finding')}
          onKeyDown={(e) => handleKeyDown(e, rowId, 'receivepcs')}
          onFocus={handleInputFocus}
        />
      ),
      receivegm: (
        <input
          type="text"
          placeholder="Enter value"
          style={{ height: '35px', maxWidth: '130px', paddingLeft: '8px' }}
          className="ibtninput"
          data-row={rowId}
          data-field="receivegm"
          value={inputValues.finding?.[rowId]?.receivegm || ''}
          onChange={(e) => handleInputChange(rowId, 'receivegm', e.target.value, 'finding')}
          onKeyDown={(e) => handleKeyDown(e, rowId, 'receivegm')}
          onFocus={handleInputFocus}
        />
      ),
      receivepcsValue: inputValues.finding?.[rowId]?.receivepcs || '',
      receivegmValue: inputValues.finding?.[rowId]?.receivegm || '',
    };
  });

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
      field: 'receivegm', headerName: 'Receive GM', minWidth: 150,
      renderCell: (params) => params.value,
    },
    {
      field: 'gwt',
      headerName: 'GWT',
      minWidth: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const materialType = getCurrentMaterialType();
        const isChecked = checkedItems[materialType]?.[params.row.id] || false;

        return (
          <input
            type="checkbox"
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              accentColor: '#776BF0'
            }}
            checked={isChecked}
            onChange={(e) => {
              e.stopPropagation();
              handleCheckboxChange(params.row.id, params.row);
            }}
          />
        );
      },
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
      field: 'wastage', headerName: 'Wastage', minWidth: 150,
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
    setArrType(getDiamondData());
    setColumns(diamond_columns);
  }, []);

  useEffect(() => {
    if (tabValue === 1) {
      setArrType(getDiamondData());
    } else if (tabValue === 2) {
      setArrType(getColorstoneData());
    } else if (tabValue === 3) {
      setArrType(getMiscData());
    } else if (tabValue === 4) {
      setArrType(getFindingData());
    }
  }, [inputValues, tabValue]);

  const handleTabsChange = (e, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      setArrType(getDiamondData());
      setColumns(diamond_columns);
    } else if (newValue === 2) {
      setArrType(getColorstoneData());
      setColumns(diamond_columns);
    } else if (newValue === 3) {
      setArrType(getMiscData());
      setColumns(misc_columns);
    } else if (newValue === 4) {
      setArrType(getFindingData());
      setColumns(finding_columns);
    }
  };

  const getTabStyle = (isSelected) => ({
    color: isSelected ? `${theme?.palette?.customColors?.purple}` : 'black',
    fontWeight: isSelected ? 'bold' : 'normal',
  });

  const handleCheckboxChange = (rowId, rowData) => {
    const materialType = getCurrentMaterialType();

    setCheckedItems(prev => ({
      ...prev,
      [materialType]: {
        ...prev[materialType],
        [rowId]: !prev[materialType][rowId]
      }
    }));

    setSelectedRows(prev => {
      const currentSelected = prev[materialType];
      const isCurrentlySelected = currentSelected.some(row => row.id === rowId);

      if (isCurrentlySelected) {
        return {
          ...prev,
          [materialType]: currentSelected.filter(row => row.id !== rowId)
        };
      } else {
        return {
          ...prev,
          [materialType]: [...currentSelected, rowData]
        };
      }
    });
  };

  const handleReceiveNow = () => {
    const allSelectedData = {
      diamond: selectedRows.diamond,
      colorstone: selectedRows.colorstone,
      misc: selectedRows.misc,
      finding: selectedRows.finding
    };
    // console.log('Selected data for receiving:', allSelectedData);
    // console.log('Current input values:', inputValues);

    const hasSelectedData = Object.values(allSelectedData).some(arr => arr.length > 0);

    if (!hasSelectedData) {
      showErrorMessage('Please select at least one item to receive.');
      return;
    }

    const updatedSelectedData = {};
    Object.entries(allSelectedData).forEach(([materialType, rows]) => {
      updatedSelectedData[materialType] = rows.map(row => ({
        ...row,
        receivepcsValue: inputValues[materialType]?.[row.id]?.receivepcs || '',
        receivectwValue: inputValues[materialType]?.[row.id]?.receivectw || '',
        receivegmValue: inputValues[materialType]?.[row.id]?.receivegm || '',
      }));
    });

    const { validRows, invalidRows } = validateMultipleRows(updatedSelectedData);

    if (invalidRows.length > 0) {
      const invalidRowIds = invalidRows.map(row => `Row ${row.sr}`).join(', ');
      showErrorMessage(`Please enter Receive Pcs and Receive Weight for the following rows: ${invalidRowIds}`);
      return;
    }

    if (validRows.length === 0) {
      showErrorMessage('No valid rows to receive. Please enter Receive Pcs and Receive Weight for selected items.');
      return;
    }

    const validGroupedData = {
      diamond: validRows.filter(row => row.materialType === 'diamond'),
      colorstone: validRows.filter(row => row.materialType === 'colorstone'),
      misc: validRows.filter(row => row.materialType === 'misc'),
      finding: validRows.filter(row => row.materialType === 'finding')
    };

    if (onReceiveData) {
      onReceiveData(validGroupedData);
    }

    dispatch(handleIssuedMaterialModal(false));

    setSelectedRows({
      diamond: [],
      colorstone: [],
      misc: [],
      finding: []
    });
    setCheckedItems({
      diamond: {},
      colorstone: {},
      misc: {},
      finding: {}
    });
  };

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

          {/* Error Message Display */}
          <Collapse in={showError} sx={{ width: '100%', mb: 2 }}>
            <Alert
              severity="error"
              onClose={() => setShowError(false)}
              sx={{
                '& .MuiAlert-message': {
                  fontSize: '0.9rem',
                  fontWeight: 500
                }
              }}
            >
              {errorMessage}
            </Alert>
          </Collapse>

          <div className='pb-2 w-100 d-flex align-items-center justify-content-end px-1'>
            <Grid2 container spacing={2}>
              <Grid2 item xs={12} sm={6} md={4}>
                <select name="issueBy" id="issueBy" className='p-1 fs_fgp issue_sl_op'>
                  <option value="" selected disabled>Search By</option>
                  <option value="design">Design#</option>
                  <option value="po">PO#</option>
                  <option value="job">Job#</option>
                  <option value="batch">Batch#</option>
                </select>
              </Grid2>
              <Grid2 item xs={12} sm={6} md={3}>
                <Button
                  size='small'
                  variant='contained'
                  className='fs_fgp'
                  sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }}
                  onClick={handleReceiveNow}
                >
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
          <Divider sx={{ width: '100%', mx: 2, my: 2 }} color={theme?.palette?.customColors?.main} />
          <div className='mt-1 mb-3 d-flex align-items-center fs_fgp flex-wrap gap-1'>
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
              pageSizeOptions={[10, 20, 30, 50, 100]}
              pagination
              disableColumnMenu
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
              onRowClick={(params) => {
                handleCheckboxChange(params.row.id, params.row);
              }}
              getRowClassName={(params) => {
                const materialType = getCurrentMaterialType();
                const isSelected = checkedItems[materialType]?.[params.row.id] || false;
                return isSelected ? 'selected-row' : '';
              }}
              sx={{
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                '& .MuiDataGrid-cell:focus-within': {
                  outline: 'none',
                },
                '& .MuiDataGrid-cell': {
                  minHeight: '45px !important',
                  maxHeight: '45px !important',
                  height: '45px !important',
                  lineHeight:'45px !important'
                },
                '& .MuiDataGrid-row': {
                  minHeight: '45px !important',
                  maxHeight: '45px !important',
                  cursor: 'pointer',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#f5f5f5',
                },
                '& .selected-row': {
                  backgroundColor: '#e3f2fd !important',
                  '&:hover': {
                    backgroundColor: '#bbdefb !important',
                  },
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
