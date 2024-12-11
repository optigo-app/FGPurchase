import React, { useState } from 'react'
// import "./issuedmaterial.css";
import { Tooltip, Modal, Box, Button, Grid2, Select, useTheme } from '@mui/material';
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
const IssuedMaterial = () => {
    const issuedMaterialModal = useSelector(state => state?.home?.issuedMaterialModal);
    const dispatch = useDispatch();
    const theme = useTheme();
    console.log(theme);
    

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }


    const data = Array?.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        job: `1/271928`,
        collection:'Fine Jewellery',
        subcategory:'Antique Jewellery',
        diactw:'5.000',
        csctw:'2.000'
      }));

      const columns = [
        { id: 'job', label: 'Job#', minWidth: 100 },
        { id: 'collection', label: 'Collection', minWidth: 100 },
        { id: 'category', label: 'Category', minWidth: 100, align: 'center', format: value => value?.toLocaleString('en-US') },
        { id: 'subcategory', label: 'Sub Category', minWidth: 100, align: 'center', format: value => value?.toLocaleString('en-US') },
        { id: 'diactw', label: 'Diam. Ctw', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
        { id: 'csctw', label: 'CS. Ctw', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'netwt', label: 'NetWt', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'net(24k)', label: 'Net(24K)', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'amount', label: 'Amount', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'metal', label: 'Metal', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'diactw', label: 'DiaCtw', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'diarate', label: 'DiaRate', minWidth: 90, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'diaamt', label: 'DiaAmt.', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'csctw', label: 'CSCtw', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'csrate', label: 'CSRate', minWidth: 90, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'csamt', label: 'CSAmt.', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'miscctw', label: 'MiscCtw', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'miscrate', label: 'MiscRate', minWidth: 90, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'miscamt', label: 'MiscAmt.', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'makerate', label: 'MakeRate', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
        // { id: 'totalamt', label: 'TotalAmt', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
      ]
      

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
                  <div className='d-flex justify-content-between align-items-center w-100 py-2 pb-4 px-3'>
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
                <div>
                  
                </div>
                <div>
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
        }}
        >
        <Table stickyHeader aria-label='sticky table' sx={{boxShadow:'none'}}>
          <TableHead>
            <TableRow>
              {columns?.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }} style={{backgroundColor:'#F6F6F7'}}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row?.id}>
                  {columns?.map(column => {
                    const value = row[column?.id]

                    return (
                      <TableCell key={column?.id} align={column?.align} sx={{color:'#595959'}}>
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
        count={data?.length}
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