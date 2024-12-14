import React, { useEffect, useState } from "react";
import "./userdata.css";
import {
  handleCustomizeJobFlag,
  handleSaveAndNextFlag,
  handleSelectedButton,
} from "../../redux/slices/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../assets/images/delete.png";
import {  handlePopUpJobDetails } from "../../redux/slices/FgpSlice";
import { Settings } from "@mui/icons-material";
import JobGrid from "./JobGrid";
import "./jobgrid.css";
import  EditIcon  from '@mui/icons-material/Edit';
import { Tooltip } from "@mui/material";

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

const UserData = () => {
  const [showTaxDropDown, setShowTaxDropDown] = useState(false);
  const [showModeOfDelDropDown, setShowModeOfDelDropDown] = useState(false);
  const [showAddLess, setShowAddLess] = useState(false);

  const [jobListData, setJobListData] = useState();

  useEffect(() => {
    setJobListData([
      { details: '1/271928 ', gwt: 3.0, netwt: 2.6, totalamt: 3081.5, delete: null },
      { details: '1/271929', gwt: 4.0, netwt: 3.6, totalamt: 4081.5, delete: null },
      { details: '1/271929', gwt: 4.0, netwt: 3.6, totalamt: 4081.5, delete: null },
      { details: '1/271929', gwt: 4.0, netwt: 3.6, totalamt: 4081.5, delete: null },
      { details: '1/271929', gwt: 4.0, netwt: 3.6, totalamt: 4081.5, delete: null },
      { details: '1/271929', gwt: 4.0, netwt: 3.6, totalamt: 4081.5, delete: null },
      { details: '1/271929', gwt: 4.0, netwt: 3.6, totalamt: 4081.5, delete: null },
    ])
  },[]);

  const dispatch = useDispatch();
  const MoreJobDetailsFlag = useSelector((state) => state?.fgp?.MoreJobDetails);
  const PopUpJobDetails = useSelector((state) => state?.fgp?.PopUpJobDetails);

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleTaxSelectionChange = (e) => {};

  const moveToSaveNNextPage = () => {
      dispatch(handleSaveAndNextFlag(true));
      dispatch(handleCustomizeJobFlag(false));
      dispatch(handleSelectedButton("add"));
  }
  const columns = [
    {
      id: 'details',
      label: 'Details',
      minWidth: 80,
      align: 'left',
      render: (value, row) => (
        <td style={{ cursor: 'pointer' }}>
          <span className="d-flex">
            <span
              onClick={() => {
                dispatch(handleCustomizeJobFlag(true));
                dispatch(handleSelectedButton('add'));
              }}
            >
              {value}
            </span>
            <Tooltip title="Edit Job">
              <EditIcon
                fontSize="small"
                style={{ border: '1px solid #e8e8e8', padding: '2px', marginLeft: '8px' }}
                onClick={() => moveToSaveNNextPage(row)}
              />
            </Tooltip>
          </span>
          <span className="smallText">D#: {row?.details?.split('/')[1]}</span>
        </td>
      ),
    },
    { id: 'gwt', label: 'GWT', minWidth: 60 },
    { id: 'netwt', label: 'NetWt', minWidth: 60, align: 'center', format: value => value?.toLocaleString('en-US') },
    { id: 'totalamt', label: 'Amount', minWidth: 90, align: 'center', format: value => value?.toFixed(2) },
    {
      id: 'delete',
      label: 'Delete',
      minWidth: 40,
      align: 'center',
      render: () => (
        <Tooltip title="Remove Job">
          <img
            src={DeleteIcon}
            alt="#delete"
            title="Delete"
            style={{ height: '20px', width: '20px', cursor: 'pointer' }}
          />
        </Tooltip>
      ),
    },
  ]

  return (
    <div className="userDataContainer">

      {/* Bill Info */}
      <div className={`billInfo px-0 ${MoreJobDetailsFlag ? "w-25" : "w-100"}`}>
        <div className="billItem p-1   fw-bold">
          <span>BILL NO</span>
          <span>SK15012024</span>
        </div>
      </div>
      <div
        className={`mb-3 d-flex flex-wrap justify-content-between align-items-center ${
          MoreJobDetailsFlag ? "w-25" : "w-100"
        } bg_info px-1 py-2`}
      >
        {/* <div className="summaryItem"> */}
        <div
          className="d-flex flex-column justify-content-center align-items-start"
          style={{ width: "33.33%" }}
        >
          <div>Amount</div>
          <div className="boldText">7908149.86 Dr</div>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ width: "33.33%" }}
        >
          <div>Metal</div>
          <div className="boldText">242.922</div>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-end"
          style={{ width: "33.33%" }}
        >
          <div>Diamond</div>
          <div className="boldText">116.923</div>
        </div>
        {/* <div className="filterItem">
          <select>
            <option value="bookname">Book Name</option>
          </select>
        </div>
        <div className="filterItem">
          <input type="text" placeholder="User" className="form-control" />
        </div>
        <div className="filterItem">
          <input type="text" placeholder="Refno" className="form-control" />
        </div> */}
      </div>

      {/* Table */}
      <div className="tableContainer">
        {/* <table className="table">
          <thead>
              <tr>
                <th>Details</th>
                <th>GWT</th>
                <th>NetWt</th>
                <th>Amount</th>
                <th>Delete</th>
              </tr>
          </thead>
          <tbody>
              {
                jobListData?.map((e, i) => {
                  return <tr key={i}>
                  <td align="left" style={{ cursor: "pointer" }}    >
                    <span> <span onClick={() => {
                    dispatch(handleCustomizeJobFlag(true));
                    dispatch(handleSelectedButton("add"));
                  }}>1/271928 </span> <Tooltip title="Edit Job"><EditIcon fontSize="small" style={{border:'1px solid #e8e8e8', padding:'2px'}} onClick={() => moveToSaveNNextPage()} /></Tooltip> </span> <br />
                    <span className="smallText">D#: LR23453</span>
                  </td>
                  <td>
                    3.000 <br />
                  </td>
                  <td>2.600</td>
                  <td>
                    3,081.50 <br />
                  </td>
                  <td align="center !important" valign="center"><Tooltip title="Remove Job"><img src={DeleteIcon} alt="#delete" title='Delete' style={{height:'20px', width:'20px', cursor:'pointer'}} /></Tooltip></td>
                </tr>
                })
              }
              <tr className="fw-bold">
                <td>Total</td>
                <td>13.230</td>
                <td>11.230</td>
                <td>11,000.23</td>
                <td></td>
              </tr>
          </tbody>
        </table> */}

        <TableContainer component={Paper} 
        sx={{
          maxHeight: 440,
          height: 323.5, 
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
            {jobListData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row?.id}>
                  {columns?.map(column => {
                    const value = row[column?.id]

                    return (
                      <TableCell key={column?.id} align={column?.align} sx={{padding:'5px'}}>
                        {/* {column?.format && typeof value === 'number' ? column?.format(value) : value} */}
                        {column?.render // If render function exists, call it
                ? column.render(value, row)
                : column?.format && typeof value === 'number' // Otherwise, check for format
                ? column.format(value)
                : value // Default to raw value
              }
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
        rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
        component='div'
        count={jobListData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className='jobgrid_fgp'
      />    

        <div className="d-flex justify-content-center mt-2">
          {/* { !MoreJobDetailsFlag && <span className='text-decoration-underline text-primary' style={{cursor:'pointer'}} onClick={() => dispatch(handleMoreJobDetails(true))}>Show More Job Details</span>}
          { MoreJobDetailsFlag && <span className='text-decoration-underline text-primary' style={{cursor:'pointer'}} onClick={() => dispatch(handleMoreJobDetails(false))}>Show Less Job Details</span>} */}
          <span
            className="text-decoration-underline text-primary user-select-none"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(handlePopUpJobDetails(true))}
          >
            Show Job Details
          </span>
        </div>
      </div>

      {
        PopUpJobDetails && <JobGrid />
        
      }

      {/* Total Summary and Taxes */}
      <div className={`totalSummary ${MoreJobDetailsFlag ? "w-25" : "w-100"}`}>
        <div className="totalItem">
          <span>Total</span>
          <span>11,391 /-</span>
        </div>
        <div className="totalItem">
          <span> Discount </span>
          <span>0.00 /-</span>
        </div>
        <div className="totalItem">
          <span>Amount After Discount</span>
          <span>11,391 /-</span>
        </div>

        {/* Tax and Add/Less Dropdowns */}
        {!showTaxDropDown ? (
          <div className="d-flex justify-content-between align-items-center">
            <div className="taxOption" onClick={() => setShowTaxDropDown(true)}>
              <span>Taxes</span>
            </div>
            <span>340/-</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div className="taxOptionDropdown">
              <select
                onChange={handleTaxSelectionChange}
                className="tax_select_us"
              >
                <option value="cgst+sgst">CGST + SGST</option>
                <option value="igst">IGST</option>
                <option value="gst">GST</option>
              </select>
              <button className="btnApply">Apply</button>
              <button
                className="btnClose"
                onClick={() => setShowTaxDropDown(false)}
              >
                Close
              </button>
            </div>
            <span>340/-</span>
          </div>
        )}

        {/* Tax and Add/Less Dropdowns */}
        {!showModeOfDelDropDown ? (
          <div className="d-flex justify-content-between align-items-center">
            <div
              className="taxOption"
              onClick={() => setShowModeOfDelDropDown(true)}
            >
              <span>Mode of Delivery</span>
            </div>
            <span>340/-</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center mt-1">
            <div className="taxOptionDropdown">
              <select
                onChange={handleTaxSelectionChange}
                className="tax_select_us"
              >
                <option value="cgst+sgst">By Train</option>
                <option value="igst">By DTDC</option>
                <option value="gst">By Courier</option>
              </select>
              <button className="btnApply">Apply</button>
              <button
                className="btnClose"
                onClick={() => setShowModeOfDelDropDown(false)}
              >
                Close
              </button>
            </div>
            <span>340/-</span>
          </div>
        )}

        {!showAddLess ? (
          <div className="d-flex justify-content-between align-items-center">
            <div className="addLessOption" onClick={() => setShowAddLess(true)}>
              <span>Add/Less</span>
            </div>
            <span>1234/-</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div className="addLessOptionDropdown mt-1">
              <input type="radio" id="add" name="addless" className="me-1" />
              <label htmlFor="add" className="me-1 fw-normal">
                Add
              </label>
              <input type="radio" id="less" name="addless" className="me-1" />
              <label htmlFor="less" className="me-1 fw-normal">
                Less
              </label>
              <input type="text" className="addLessInput" />
              {/* <button className="btnClose" onClick={() => setShowAddLess(false)}>Close</button> */}
              <button
                className="btnRoundUp fs_btn_us"
                onClick={() => setShowAddLess(false)}
              >
                ROUNDUP
              </button>
            </div>
            <div>1234 /-</div>
          </div>
        )}

        <div className="finalAmount">
          <span>Final Amount</span>
          <span className="boldText">11,391.46 /-</span>
        </div>
      </div>
    </div>
  );
};

export default UserData;
