import React, { useState } from 'react'
import "./mountgrid.css"
import { Tooltip, Modal, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CancelIcon from '@mui/icons-material/Cancel';
import { handleMountModal } from '../../../../redux/slices/HomeSlice';
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Typography  from '@mui/material/Typography';
import { Grid } from '@mui/material';
const MountGrid = () => {
    const mountModal = useSelector(state => state?.home?.mountModal);
    const dispatch = useDispatch();
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page2, setPage2] = useState(0);
    const [rowsPerPage2, setRowsPerPage2] = useState(5);

    const [selectedMount, setSelectedMount] = useState('studcustmfg');

    const handleMountSelection = (event) => {
      setSelectedMount(event.target.value);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage)
    }
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value)
      setPage(0)
    }

    const handleChangePage2 = (event, newPage) => {
      setPage2(newPage)
    }
    const handleChangeRowsPerPage2 = event => {
      setRowsPerPage2(+event.target.value)
      setPage2(0)
    }

    const data = Array?.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        job: `1/271928`,
        category:'Bracelet',
        type:'Gold',
        purity:'18K',
        color:'YW',
        wtgm:'4.500',
        remaining:'5.500',
        addwt: <input type='text' className='p-1 mountGrid_input' style={{width:'100px'}} />
      }));

      const columns = [
        { id: 'job', label: 'Job#', minWidth: 100 , align: 'center'},
        { id: 'category', label: 'Category', minWidth: 100 , align: 'center'},
        { id: 'type', label: 'Type', minWidth: 100 , align: 'center'},
        { id: 'purity', label: 'Purity', minWidth: 100 , align: 'center'},
        { id: 'color', label: 'Color', minWidth: 100 , align: 'center'},
        { id: 'wtgm', label: 'Wt (Gm)', minWidth: 100 , align: 'center'},
        { id: 'remaining', label: 'Remaining', minWidth: 100 , align: 'center'},
        { id: 'addwt', label: 'Add Wt', minWidth: 40 , align: 'center'},
      ]

    const data2 = Array?.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        customer:'az',
        job: `1/271928`,
        category:'Bracelet',
        type:'Gold',
        color:'YW',
        wtgm:'4.500',
        addwt: <input type='text' className='p-1 mountGrid_input' style={{width:'100px'}} />
      }));

      const columns2 = [
        { id: 'customer', label: 'Customer#', minWidth: 100 , align: 'center'},
        { id: 'job', label: 'Job#', minWidth: 100 , align: 'center'},
        { id: 'category', label: 'Category', minWidth: 100 , align: 'center'},
        { id: 'type', label: 'Type', minWidth: 100 , align: 'center'},
        { id: 'color', label: 'Color', minWidth: 100 , align: 'center'},
        { id: 'wtgm', label: 'Wt (Gm)', minWidth: 100 , align: 'center'},
        { id: 'addwt', label: 'Add Wt', minWidth: 40 , align: 'center'},
      ]
      

  return (
    <>
        <Modal
            open={mountModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxHeight: 700,
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    boxShadow: 24,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '300px',
                    overflowY:'scroll',
                    border: 'none',
                    height:'100%'
                  }}
            >
                <div className='d-flex justify-content-between align-items-center w-100 mb-2'>
                    <div>&nbsp;</div>
                    <div><Typography variant='h5' color='primary'>Add Mount</Typography></div>
                    <div><CancelIcon style={{cursor:'pointer'}} onClick={() => dispatch(handleMountModal(false))} /></div>
                </div>

                <Grid container spacing={1} >
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <div>
                            <input type="radio" id="studcustmfg" value="studcustmfg"
                                checked={selectedMount === 'studcustmfg'}
                                onChange={handleMountSelection}
                                name='mountval'
                             />
                            <label className='text-secondary fs-6 mx-1' htmlFor="studcustmfg">Studded by Cust/MFG.</label>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <div>
                            <input type="radio" id="usefromstock"  value="usefromstock"
                                checked={selectedMount === 'usefromstock'}
                                onChange={handleMountSelection} name='mountval' />
                            <label className='text-secondary fs-6 mx-1' htmlFor="usefromstock">Use From Stock</label>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <div>
                            <input type="radio" id="issuetomanu"  value="issuetomanu"
                                checked={selectedMount === 'issuetomanu'}
                                onChange={handleMountSelection} name='mountval' />
                            <label className='text-secondary fs-6 mx-1' htmlFor="issuetomanu">Issue To Manufacturer</label>
                        </div>
                    </Grid>
                </Grid>

                  {/* studded by cust/mfg */}
                { selectedMount === 'studcustmfg' && <div className='w-100 mt-4'>
                    <Grid container spacing={1} className=''>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <div className='d-flex flex-wrap justify-content-around align-items-center'>
                                <div className='mx-1 border  p-1 py-2'>
                                    <div>For Metal</div>
                                    <div className='fw-bold'>GOLD 18K</div>
                                </div>
                                <div className='mx-1 border  p-1 py-2'>
                                    <div>Metal Color</div>
                                    <div className='fw-bold'>Yellow</div>
                                </div>
                            </div>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <div>
                                <div>Metal Weight</div>
                                <div className='fw-bold'><input type="text" placeholder="0" className='mountGrid_input' /></div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <div>
                                <div>Metal Purity</div>
                                <div className='fw-bold'><input type="text" placeholder="0" className='mountGrid_input' /></div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <div>
                                <div>Wastage</div>
                                <div className='fw-bold'><input type="text" placeholder="0" className='mountGrid_input' /></div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2}>
                            <div>
                                <div>Supplier</div>
                                <div className='fw-bold'><input type="text" placeholder="0" className='mountGrid_input' /></div>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={2} className='d-flex justify-content-center align-items-end pb-1'>
                            {/* <div> */}
                                <Button color='success' variant='contained' size='small'>ADD</Button>
                                {/* <div>Supplier</div>
                                <div className='fw-bold'><input type="text" placeholder="0" className='mountGrid_input' /></div> */}
                            {/* </div> */}
                        </Grid>
                    </Grid>
                </div>}

                {/* use from stock */}
                { selectedMount === 'usefromstock' && <div className='w-100'>
                    {/* header part */}
                    <div className='d-flex justify-content-between align-items-end w-100 mb-2 px-2'>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={4} md={2}>
                                <select name="applyon" id="applyon" className='mount_locker p-1'>
                                    <option value="" >Locker1</option>
                                    <option value="">Vlocker</option>
                                    <option value="amount">Tlocker</option>
                                    <option value="amount">Slocker</option>
                                    <option value="amount">Alocker</option>
                                    <option value="amount">Klocker</option>
                                    <option value="amount">Blocker</option>
                                    <option value="amount">SNlocker</option>
                                    <option value="amount">KPlocker</option>
                                    <option value="amount">Jlocker</option>
                                </select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} sm={6} md={3} spacing={1} alignItems="flex-end">
                            <Grid item xs={6}>
                                <div>
                                    <label htmlFor="wastage" className='mb-0'>Wastage</label>
                                    <input type="text" className='mountGrid_input p-1' />
                                </div>
                            </Grid>
                            <Grid item xs={6} >
                                <div className='w-100 d-flex justify-content-center align-items-center'>
                                    <Button size='small' variant='contained' color='success'>Add</Button>
                                </div>
                            </Grid>
                        </Grid>
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
                </div>}

                {/* issue to manufacturer */}
                { selectedMount === 'issuetomanu' && <div className='w-100 mt-2'>
                        <div className='my-3 w-100 '>
                        <Grid container spacing={1} justifyContent={'flex-end'}>
                            <Grid item xs={12} sm={6} md={3} lg={2}>
                                <div className='px-1'>
                                    <select name="applyon" id="applyon" className='mount_locker p-1'>
                                        <option value="" disabled selected>SearchBy</option>
                                        <option value="">PO#</option>
                                        <option value="amount">Job#</option>
                                        <option value="amount">Batch#</option>
                                    </select>
                                </div>
                            </Grid>
                            <Grid  item xs={12} sm={6} md={3} lg={2}>
                                <div className='d-flex align-items-center px-1'>
                                    <div className='fw-semibold mx-1'>Supplier</div>
                                    <select name="applyon" id="applyon" className='mount_locker p-1'>
                                        <option value="" disabled selected>Select</option>
                                        <option value="comapny">Company</option>
                                        <option value="manufacturer">Manufacturer</option>
                                    </select>
                                </div>
                            </Grid>
                            <Grid  item xs={12} sm={6} md={3} lg={2}>
                                <div className='d-flex align-items-center px-1'>
                                    <label htmlFor='wastage' className='mb-0 fw-semibold mx-1'>Wastage</label>
                                    <input type="text" id="wastage" className='mountGrid_input p-1' />
                                </div>
                            </Grid>
                            <Grid  item xs={12} sm={6} md={3} lg={2} >
                                <div className='d-flex align-items-center justify-content-center px-1'>
                                    <Button size='small' color='success' variant='contained'>Add</Button>
                                </div>
                            </Grid>
                        </Grid>
                        </div>
                        <div className='pt-2'>
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
                        {columns2?.map(column => (
                            <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }} style={{backgroundColor:'#F6F6F7'}}>
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data2?.slice(page2 * rowsPerPage2, page2 * rowsPerPage2 + rowsPerPage2)?.map(row => {
                        return (
                            <TableRow hover role='checkbox' tabIndex={-1} key={row?.id}>
                            {columns2?.map(column => {
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
                    count={data2?.length}
                    rowsPerPage={rowsPerPage2}
                    page={page2}
                    onPageChange={handleChangePage2}
                    onRowsPerPageChange={handleChangeRowsPerPage2}
                    className='jobgrid_fgp'
                />
                        </div>
                </div>}
                
            </Box>
        </Modal>
    </>
  )
}

export default MountGrid