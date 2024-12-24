// import React from 'react'
// import "./jobbased.css";
// const JobBased = () => {
//   return (
//     <>
//     <div className='jobbased_container'>
//       <div className='mt-3 mb-3 d-flex justify-content-start align-items-end'>
//         <select name="" id="" className='mx-2'>
//           <option value="">Search By</option>
//         </select>
//         <div className='d-flex flex-column'>
//           <label htmlFor="searchBy" className='text-secondary'>Jobno/ PO no/ customer code/ designno/ all</label>
//           <input type="text" style={{height:'23px'}} id='searchBy' autoFocus />
//         </div>
//       </div>
//       <div className='tableContainerMaxWidth mt-5 mb-3 '>
//         <table className='table table-warning'>
//           <thead>
//             <tr>
//               <th>Sr#</th>
//               <th>Jobno#</th>
//               <th>Design#</th>
//               <th>Custome code</th>
//               <th>Metal</th>
//               <th>Category</th>
//               <th>Procced</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>1/53543(25)</td>
//               <td>T321</td>
//               <td>bunty</td>
//               <td>GOLD 18K Y</td>
//               <td>women ring</td>
//               <td style={{color:'blue', textDecoration:'underline'}}>Procced</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </>
//   )
// }

// export default JobBased
import React, { useState } from 'react';
import './jobbased.css';
import { useDispatch } from 'react-redux';
import { handleSaveAndNextFlag } from '../../../../redux/slices/HomeSlice';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

const JobBased = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const columns = [
    { id: 'srNo', label: 'Sr#' },
    { id: 'jobNo', label: 'Jobno#' },
    { id: 'designNo', label: 'Design#' },
    { id: 'customerCode', label: 'Customer Code' },
    { id: 'po', label: 'PO' },
    { id: 'metal', label: 'Metal' },
    { id: 'category', label: 'Category' },
    { id: 'proceed', label: 'Proceed' },
  ];

  const rows = [
    {
      srNo: 1,
      jobNo: '1/53543(25)',
      designNo: 'T321',
      customerCode: 'bunty',
      po: 'PO NUMBER',
      metal: 'GOLD 18K Y',
      category: 'women ring',
    },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <div className='jobbased_container'>
        <div className='mt-3 mb-3 d-flex justify-content-start align-items-end'>
          {/* <select name="" id="" className='search-select mx-2'>
            <option value="">Search By</option>
          </select> */}
          <div className='mb-2 fw-semibold mx-1'>Search By</div>
          <div className='d-flex flex-column'>
            <label htmlFor="searchBy" className='text-secondary search-label'>Jobno/ PO no/ customer code/ designno/ all</label>
            <input type="text" style={{ height: '35px' }} id='searchBy' autoFocus className='search-input' />
          </div>
        </div>
        <div className='d-flex justify-content-start align-items-start  py-5 bg-white border px-2'>
        <div className='w-100' style={{maxWidth:'1200px'}}>
          {/* <table className='table table-bordered table-hover'>
            <thead className='thead-light'>
              <tr>
                <th>Sr#</th>
                <th>Jobno#</th>
                <th>Design#</th>
                <th>Customer Code</th>
                <th>PO</th>
                <th>Metal</th>
                <th>Category</th>
                <th>Proceed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1/53543(25)</td>
                <td>T321</td>
                <td>bunty</td>
                <td>PO NUMBER</td>
                <td>GOLD 18K Y</td>
                <td>women ring</td>
                <td className='proceed-btn' onClick={() => dispatch(handleSaveAndNextFlag(true))}>Proceed</td>
              </tr>
            </tbody>
          </table> */}
          <TableContainer component={Paper}         sx={{
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
          mt:3,
          
        }}>
      <Table>
        <TableHead stickyHeader aria-label='sticky table' sx={{boxShadow:'none'}}>
          <TableRow style={{backgroundColor:'#F6F6F7', fontWeight:'bolder'}}>
            {columns?.map((column) => (
              <TableCell key={column.id} align="center">
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns?.map((column) => {
                if (column.id === 'proceed') {
                  return (
                    <TableCell
                      key={column.id}
                      align="center"
                      sx={{ cursor: 'pointer', color: 'blue', textDecoration:'underline' }}
                      onClick={() => dispatch(handleSaveAndNextFlag(true))}
                    >
                      Proceed
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={column.id} align="center">
                    {row[column.id]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div className='w-100 d-flex justify-content-end align-items-center'>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default JobBased;
