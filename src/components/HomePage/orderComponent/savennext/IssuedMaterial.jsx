import React, { useEffect, useState } from 'react'
// import "./issuedmaterial.css";
import { Tooltip, Modal, Box, Button, Grid2, Select, useTheme, Tabs, Tab } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import { handleIssuedMaterialModal } from '../../../../redux/slices/HomeSlice';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import  Typography  from '@mui/material/Typography';
import "./issuedmaterial.css";
const IssuedMaterial = () => {
    const issuedMaterialModal = useSelector(state => state?.home?.issuedMaterialModal);
    const dispatch = useDispatch();

    const [tabValue, setTabValue] = useState(1);

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [arrType, setArrType] = useState([]);
    const [columns, setColumns] = useState([]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }


    const diamond_data = Array?.from({ length: 10 }, (_, index) => ({
        sr: index + 1,
        customer: `Stock`,
        lot:1412,
        type:'Dr-01',
        shape:'9P AS',
        clarity:'Any',
        color:'Any',
        size:'1mm',
        ctw:10.345,
        receivepcs:<input type="text" style={{maxWidth:'90px'}} className='ibtninput' />,
        receivectw:<input type="text" style={{maxWidth:'90px'}} className='ibtninput' />,
      }));
    const misc_data = Array?.from({ length: 10 }, (_, index) => ({
        sr: index + 1,
        customer: `Stock`,
        lot:1412,
        type:'Dr-01',
        shape:'9P AS',
        clarity:'Any',
        color:'Any',
        size:'1mm',
        ctw:10.345,
        receivepcs:<input type="text" style={{maxWidth:'90px'}} className='ibtninput' />,
        receivectw:<input type="text" style={{maxWidth:'90px'}} className='ibtninput' />,
        gwt:<input type="checkbox" style={{maxWidth:'50px', cursor:'pointer'}} className='ibtninput' />,
      }));
    const finding_data = Array?.from({ length: 10 }, (_, index) => ({
        sr: index + 1,
        customer: `Stock`,
        lot:1412,
        ftype:'Block Chain',
        accessories:'Anchor Chain',
        mtype:'Gold',
        purity:'18K',
        color:'yelow pl',
        gm:0.1,
        tunch:76,
        wastage:<input type="text" style={{maxWidth:'90px'}} className='ibtninput' />,
        receivepcs:<input type="text" style={{maxWidth:'90px'}} className='ibtninput' />,
        receivegm:<input type="text" style={{maxWidth:'90px'}} className='ibtninput' />,
      }));

      const diamond_columns = [
        { id: 'sr', label: 'Sr#', minWidth: 50, align:'center' },
        { id: 'customer', label: 'Customer#', minWidth: 100, align:'left' },
        { id: 'lot', label: 'Lot', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'type', label: 'Type', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'shape', label: 'Shape', minWidth: 100, align: 'center', format: value => value?.toLocaleString('en-US') },
        { id: 'clarity', label: 'Clarity', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'color', label: 'Color', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'size', label: 'Size', minWidth: 50, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'ctw', label: 'Ctw', minWidth: 60, align: 'right',  },
        { id: 'receivepcs', label: 'Receive Pcs', minWidth: 110, align: 'center',  },
        { id: 'receivectw', label: 'Receive Ctw', minWidth: 110, align: 'center',  },
      ];
      const misc_columns = [
        { id: 'sr', label: 'Sr#', minWidth: 50, align:'center' },
        { id: 'customer', label: 'Customer#', minWidth: 100, align:'left' },
        { id: 'lot', label: 'Lot', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'type', label: 'Type', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'shape', label: 'Shape', minWidth: 100, align: 'center', format: value => value?.toLocaleString('en-US') },
        { id: 'clarity', label: 'Clarity', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'color', label: 'Color', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'size', label: 'Size', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'ctw', label: 'Ctw', minWidth: 60, align: 'right',  },
        { id: 'receivepcs', label: 'Receive Pcs', minWidth: 110, align: 'center',  },
        { id: 'receivectw', label: 'Receive Ctw', minWidth: 110, align: 'center',  },
        { id: 'gwt', label: 'GWT', minWidth: 50, align: 'center',  },
      ];
      const finding_columns = [
        { id: 'sr', label: 'Sr#', minWidth: 50, align:'center' },
        { id: 'customer', label: 'Customer#', minWidth: 100, align:'left' },
        { id: 'lot', label: 'Lot', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'ftype', label: 'FType', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'accessories', label: 'Accessories', minWidth: 100, align: 'center', format: value => value?.toLocaleString('en-US') },
        { id: 'mtype', label: 'M.Type', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'purity', label: 'Purity', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'color', label: 'Color', minWidth: 100, align: 'left', format: value => value?.toLocaleString('en-US') },
        { id: 'gm', label: 'GM', minWidth: 60, align: 'right',  },
        { id: 'tunch', label: 'Tunch', minWidth: 60, align: 'right',  },
        { id: 'wastage', label: 'Wastage', minWidth: 110, align: 'right',  },
        { id: 'receivepcs', label: 'Receive Pcs', minWidth: 110, align: 'center',  },
        { id: 'receivegm', label: 'Receive GM', minWidth: 110, align: 'center',  },
      ];

      useEffect(() => {
        setTabValue(1);
        setArrType(diamond_data);
        setColumns(diamond_columns);
      },[]);

      const handleTabsChange = (e, newValue) => {
        setTabValue(newValue);

        if(newValue === 1 || newValue === 2){
          setArrType(diamond_data);
          setColumns(diamond_columns);
        }
        if(newValue === 3){
          setArrType(misc_data);
          setColumns(misc_columns);
        }
        if(newValue === 4){
          setArrType(finding_data);
          setColumns(finding_columns);
        }
      }
      

  return (
    <>
        <Modal
            open={issuedMaterialModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxHeight: 700,
                        bgcolor: 'background.paper',
                        borderRadius: '12px',
                        boxShadow: 24,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '300px',
                        border: 'none',
                      }}
            >
                  <div className='d-flex justify-content-between align-items-center w-100 py-2 pb-2 px-0 border-bottom mb-2'>
                    <div>&nbsp;</div>
                    <div><Typography variant='h5' color='primary'>Issued Material</Typography></div>
                    <div><CancelIcon style={{cursor:'pointer'}} onClick={() => dispatch(handleIssuedMaterialModal(false))} /></div>
                </div>
                <div className='pb-2 w-100 d-flex align-items-center justify-content-end px-1'>
                  <Grid2 container spacing={2}>
                    <Grid2 item xs={12} sm={6} md={3} >
                      <select name="issueBy" id="issueBy" className='p-1'>
                        <option value="" selected disabled>Search By</option>
                        <option value="design">Design#</option>
                        <option value="po">PO#</option>
                        <option value="job">Job#</option>
                        <option value="batch">Batch#</option>
                      </select>
                    </Grid2>
                    <Grid2 item xs={12} sm={6} md={3} >
                      <Button size='small' variant='contained' color='error'>Receive Now</Button>
                    </Grid2>
                    <Grid2 item xs={12} sm={6} md={3} >
                      <Button size='small' variant='contained' color='success'>Receive & Close</Button>
                    </Grid2>
                  </Grid2>
                </div>
                
                <div className='mb-1'>
                  <Tabs value={tabValue} onChange={handleTabsChange}>
                      <Tab color='primary' label="Diamond" value={1}></Tab>
                      <Tab color='primary' label="Colorstone" value={2}></Tab>
                      <Tab color='primary' label="Misc" value={3}></Tab>
                      <Tab color='primary' label="Finding" value={4}></Tab>
                  </Tabs>
                </div>

                <div>
                  { (tabValue === 1 || tabValue === 2 || tabValue === 3) && <div className='mt-1 mb-2 d-flex align-items-center'>
                    <div style={{width:'100px'}} className='d-flex justify-content-center'><Button size='small' variant='contained' color='success'>All</Button></div>
                    <input type='text' placeholder='Customer#' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Lot' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Type' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Shape' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Clarity' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Color' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Size' style={{width:'93px'}} className='mx-1 ibtninput' />
                  </div>}
                  
                  { tabValue === 4 && <div className='mt-1 mb-2 d-flex align-items-center'>
                    <div style={{width:'100px'}} className='d-flex justify-content-center'><Button size='small' variant='contained' color='success'>All</Button></div>
                    <input type='text' placeholder='Customer#' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Lot' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='FType' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Accessories' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='M.Type' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Purity' style={{width:'93px'}} className='mx-1 ibtninput' />
                    <input type='text' placeholder='Color' style={{width:'93px'}} className='mx-1 ibtninput' />
                  </div>}
                <TableContainer component={Paper} 
                  sx={{
                    maxHeight: 440,
                    overflow: 'auto', // Enable scrolling for both directions
                    '&::-webkit-scrollbar': {
                      height: '6px', // Reduce the scrollbar height for horizontal scrolling
                      width: '6px', // Adjust scrollbar width for vertical scrolling
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'rgba(0,0,0,0.3)', // Adjust scrollbar thumb color
                      borderRadius: '4px', // Rounded corners for the scrollbar thumb
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'rgba(0,0,0,0.1)', // Adjust scrollbar track color
                      borderRadius: '4px', // Rounded corners for the scrollbar track
                    },
                    boxShadow: 'none',
                    border: '1px solid #e8e8e8',
                    minWidth:'1350px'
                  }}
                  >
                    <Table stickyHeader aria-label='sticky table' sx={{boxShadow:'none'}}>
                      <TableHead>
                        <TableRow>
                          {columns?.map(column => (
                            <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }} style={{backgroundColor:'#F6F6F7', border:'1px solid #e8e8e8', borderCollapse:'collapse', fontSize:'12px'}}>
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {arrType?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(row => {
                          return (
                            <TableRow hover role='checkbox' tabIndex={-1} key={row?.id}>
                              {columns?.map(column => {
                                const value = row[column?.id]

                                return (
                                  <TableCell key={column?.id} align={column?.align} sx={{color:'#595959', border:'1px solid #e8e8e8',  fontSize: '12px',padding:'3px' }}>
                                    {column?.format && typeof value === 'number' ? column?.format(value) : value}
                                  </TableCell>
                                )
                              })}
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component='div'
                  count={arrType?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  className='jobgrid_fgp'
                />
                </div>
            </Box>
        </Modal>
    </>
  )
}

export default IssuedMaterial