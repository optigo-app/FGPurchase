// import React, { useState } from 'react'
// import "./jobgrid.css";

// import { Tooltip } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { handlePopUpJobDetails } from '../../redux/slices/FgpSlice';
// import ReactPaginate from 'react-paginate';
// const JobGrid = () => {

//   const tableData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

//   const PopUpJobDetails = useSelector(state => state?.fgp?.PopUpJobDetails);
//   const dispatch = useDispatch();
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(0);
//   const rowsPerPage = 5;
  
//   // Handle page change
//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage.selected);
//   };

//   // Slice data for current page
//   const offset = currentPage * rowsPerPage;
//   console.log(currentPage);
//   console.log(offset);
//   const currentData = tableData?.slice(offset, offset + rowsPerPage);


//   const data = Array?.from({ length: 20 }, (_, index) => ({
//     id: index + 1,
//     details: `1/271928`,
//     group: "",
//     quality: "PD 18K",
//     weight: "10.400",
//     grossWeight: "10.000",
//     netWeight: "2.700",
//     net24K: "2.900",
//     amount: "20000",
//     metal: "",
//     diaCTW: "1.040",
//     diaRate: "670",
//     diaAmt: "3400",
//     csCTW: "2.809",
//     csRate: "120",
//     csAmt: "680",
//     miscCTW: "1.234",
//     miscRate: "230",
//     miscAmt: "4500",
//     makeRate: "10000",
//     totalAmt: "20000"
//   }));


//   return (
//     <>
//       <Modal
//         open={PopUpJobDetails}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: '99%',
//             bgcolor: "background.paper",
//             border: "none",
//             pt: 2,
//             px: 4,
//             pb: 3,
//             borderRadius: "8px",
//           }}
//           className="boxShadow_hp"
//         >
//           <div>
//             <div className="d-flex align-items-center justify-content-between">
//                 <div>&nbsp;</div>
//                 <div className="fs-6 text-secondary fw-bold">Jobs Detail</div>
//                 <div><Tooltip title="Close" style={{cursor:'pointer'}} onClick={() => dispatch(handlePopUpJobDetails(false))}><CancelIcon /></Tooltip></div>
//             </div>
//             <div>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>Details</th>
//                     <th>Group#</th>
//                     <th>Quality</th>
//                     <th>Wt(G+D)</th>
//                     <th>GrossWt</th>
//                     <th>NetWt</th>
//                     <th>Net(24K)</th>
//                     <th>Amount</th>
//                     <th>Metal</th>
//                     <th>Dia CTW</th>
//                     <th>Dia Rate</th>
//                     <th>Dia Amt.</th>
//                     <th>CS CTW</th>
//                     <th>CS Rate</th>
//                     <th>CS Amt.</th>
//                     <th>MISC CTW</th>
//                     <th>MISC Rate</th>
//                     <th>MISC Amt.</th>
//                     <th>Make Rate</th>
//                     <th>Total Amt</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     currentData?.map((e, i) => {
//                       return <tr key={i}>
//                       <td align="left" style={{ cursor: "pointer" }}>
//                         <span>1/271928</span> <br />
//                         <span className="smallText">D#: LR23453</span>
//                       </td>
//                       <td>{e}</td>
//                       <td>PD 18K</td>
//                       <td>10.400</td>
//                       <td>10.000</td>
//                       <td>2.700</td>
//                       <td>2.900</td>
//                       <td>20000</td>
//                       <td></td>
//                       <td>1.040</td>
//                       <td>670</td>
//                       <td>3400</td>
//                       <td>2.809</td>
//                       <td>120</td>
//                       <td>680</td>
//                       <td>1.234</td>
//                       <td>230</td>
//                       <td>4500</td>
//                       <td>10000</td>
//                       <td>20000</td>
//                     </tr>
//                     })
//                   }
//                 </tbody>
//               </table>
//               {/* <ReactPaginate
//                 previousLabel={'<'}
//                 nextLabel={'>'}
//                 breakLabel={'...'}
//                 pageCount={Math.ceil(tableData?.length / rowsPerPage)}
//                 onPageChange={handlePageChange}
//                 containerClassName={'pagination d_flex_paginate_grid'}
//                 activeClassName={'active'}
//                 pageClassName={'page-item'}
//                 pageLinkClassName={'page-link'}
//                 previousClassName={'page-item'}
//                 nextClassName={'page-item'}
//                 previousLinkClassName={'page-link'}
//                 nextLinkClassName={'page-link'}
//                 marginPagesDisplayed={1}
//               /> */}
//             </div>
//           </div> 
//         </Box>
//         </Modal>
//     </>
//   )
// }

// export default JobGrid

// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { useDispatch, useSelector } from "react-redux";
import { handlePopUpJobDetails } from "../../redux/slices/FgpSlice";
import { Modal } from "@mui/material";
import { Box } from '@mui/material';
import  CancelIcon  from '@mui/icons-material/Cancel';
import { Tooltip } from '@mui/material';

const columns = [
  { id: 'details', label: 'Details', minWidth: 80 },
  { id: 'group', label: 'Group#', minWidth: 80 },
  { id: 'quality', label: 'Quality', minWidth: 100, align: 'center', format: value => value?.toLocaleString('en-US') },
  { id: 'Wt(G+D)', label: 'Wt(G+D)', minWidth: 80, align: 'center', format: value => value?.toLocaleString('en-US') },
  { id: 'grosswt', label: 'GrossWt', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
  { id: 'netwt', label: 'NetWt', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
  { id: 'net(24k)', label: 'Net(24K)', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
  { id: 'amount', label: 'Amount', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
  { id: 'metal', label: 'Metal', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
  { id: 'diactw', label: 'DiaCtw', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
  { id: 'diarate', label: 'DiaRate', minWidth: 90, align: 'center', format: value => value?.toFixed(2) },
  { id: 'diaamt', label: 'DiaAmt.', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
  { id: 'csctw', label: 'CSCtw', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
  { id: 'csrate', label: 'CSRate', minWidth: 90, align: 'center', format: value => value?.toFixed(2) },
  { id: 'csamt', label: 'CSAmt.', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
  { id: 'miscctw', label: 'MiscCtw', minWidth: 80, align: 'center', format: value => value?.toFixed(2) },
  { id: 'miscrate', label: 'MiscRate', minWidth: 90, align: 'center', format: value => value?.toFixed(2) },
  { id: 'miscamt', label: 'MiscAmt.', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
  { id: 'makerate', label: 'MakeRate', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
  { id: 'totalamt', label: 'TotalAmt', minWidth: 100, align: 'center', format: value => value?.toFixed(2) },
]
function createData(name, code, population, size) {
  const density = population / size

  return { name, code, population, size, density }
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767)
]
  const data = Array?.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    details: `1/271928`,
    group: index + 1,
    quality: "PD 18K",
    ['Wt(G+D)']: "10.400",
    grosswt: "10.000",
    netwt: "2.700",
    ['net(24k)']: "2.900",
    amount: "20000",
    metal: "GOld 18K",
    diactw: "1.040",
    diarate: "670",
    diaamt: "3400",
    csctw: "2.809",
    csrate: "120",
    csamt: "680",
    miscctw: "1.234",
    miscrate: "230",
    miscamt: "4500",
    makerate: "10000",
    totalamt: "20000"
  }));


const JobGrid = () => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const PopUpJobDetails = useSelector(state => state?.fgp?.PopUpJobDetails);
  const dispatch = useDispatch();
  return (
    <>
    <Modal
        open={PopUpJobDetails}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: '99%',
            bgcolor: "background.paper",
            border: "none",
            pt: 2,
            px: 4,
            pb: 3,
            borderRadius: "8px",
            boxShadow:'none'
          }}
          className="boxShadow_hp"
        >
          <div className="d-flex align-items-center justify-content-between mb-3">
                 <div>&nbsp;</div>
                 <div className="fs-6 text-secondary fw-bold">Jobs Detail</div>
                 <div><Tooltip title="Close" style={{cursor:'pointer'}} onClick={() => dispatch(handlePopUpJobDetails(false))}><CancelIcon /></Tooltip></div>
             </div>
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
                      <TableCell key={column?.id} align={column?.align}>
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
      </Box>
      </Modal>
    </>
  )
}

export default JobGrid
