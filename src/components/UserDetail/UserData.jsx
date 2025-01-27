import React, { useEffect, useRef, useState } from "react";
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
import  CancelIcon  from '@mui/icons-material/Cancel';
import { Box, Button, Checkbox, IconButton, Modal, Tooltip, Typography, useTheme } from "@mui/material";

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import scanGif from "../../assets/images/scan.gif";
import { Trash } from "tabler-icons-react";
import MergeIcon from '@mui/icons-material/Merge';
import GridOnSharpIcon from '@mui/icons-material/GridOnSharp';
// import { set } from "react-datepicker/dist/date_utils";

const UserData = () => {

  const theme = useTheme();

  const mode = useSelector((state) => state?.fgp?.mode);
  const [showTaxDropDown, setShowTaxDropDown] = useState(false);
  const [showModeOfDelDropDown, setShowModeOfDelDropDown] = useState(false);
  const [showAddLess, setShowAddLess] = useState(false);

  const [jobListData, setJobListData] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  const [jobSearch, setJobSearch] = useState('');

  useEffect(() => {
    setJobListData([
      { id:1, details: '1/271928 ', gwt: 3.120, netwt: 2.654, totalamt: 3081.5, delete: null },
      { id:2, details: '1/271929', gwt: 4.019, netwt: 3.254, totalamt: 4081.5, delete: null },
      { id:3, details: '1/271929', gwt: 4.228, netwt: 3.621, totalamt: 4081.5, delete: null },
      { id:4, details: '1/271929', gwt: 4.145, netwt: 3.690, totalamt: 4081.5, delete: null },
      { id:5, details: '1/271929', gwt: 4.841, netwt: 3.687, totalamt: 4081.5, delete: null },
      { id:6, details: '1/271929', gwt: 4.992, netwt: 3.678, totalamt: 4081.5, delete: null },
      { id:7, details: '1/271929', gwt: 4.100, netwt: 3.600, totalamt: 4081.5, delete: null },
    ])
  },[]);

  const dispatch = useDispatch();
  const [trashColor, setTrashColor] = useState('grey');
  const MoreJobDetailsFlag = useSelector((state) => state?.fgp?.MoreJobDetails);
  const PopUpJobDetails = useSelector((state) => state?.fgp?.PopUpJobDetails);
  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [tagBreakPopUp, setTagBreakPopUp] = useState(false);
  const [inputValueHidden, setInputValueHidden] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [inputValue, setInputValue] = useState(undefined);
  const [inputError, setInputError] = useState(false);
  const ScanRef = useRef(null);

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

  const handleOpenPopup = (row) => {
    console.log(row);
    setTagBreakPopUp(true);  
  }

  const columns = [
    {
      id: 'details',
      label: 'Details',
      minWidth: 80,
      align: 'left',
      render: (value, row) => (
        <td style={{ cursor: 'pointer' }}>
          <span className="d-flex" style={{minWidth:'100px'}}>
          { mode !== 'alteration_issue' && <Tooltip title="Edit Job">
              {/* <EditIcon
                fontSize="small"
                style={{ border: '1px solid #e8e8e8', padding: '2px', marginLeft: '8px' }}
                onClick={() => moveToSaveNNextPage(true)}
              /> */}
            </Tooltip>}
            <div>
            <span>
              {mode === 'alteration_receive' ? (
                <span  
                  onClick={(e) => {
                    console.log('click',e);
                    e.preventDefault(); // Prevent default anchor behavior
                    setTagBreakPopUp(true); // Logic to open the popup
                  }}
                  style={{
                    textDecoration: 'underline',
                    color: 'blue',
                    cursor: 'pointer',
                  }}
                >
                  {value}
                </span>
              ) : (
                <span style={{cursor:'pointer'}} onClick={() => {
                  dispatch(handleCustomizeJobFlag(true));
                  dispatch(handleSelectedButton('add'));
                }}>{value}</span>
              )}
            </span>
            {/* <span
              onClick={() => {
                dispatch(handleCustomizeJobFlag(true));
                dispatch(handleSelectedButton('add'));
              }}
            >
              {value}
            </span> */}
            <br/>
            <span className="smallText"><span className="fs_fgp text_color fw-normal">Details:</span> {row?.details?.split('/')[1]}</span>
            </div>
          </span>
          
        </td>
      ),
    },
    { id: 'gwt', label: 'GWT', minWidth: 60, align: 'center', },
    { id: 'netwt', label: 'NetWt', minWidth: 60, align: 'center', format: value => value?.toLocaleString('en-US') },
    // { id: 'totalamt', label: 'Amount', minWidth: 90, align: 'center',  format: value => value?.toFixed(2) },
    mode !== 'alteration_issue' && {
      id: 'totalamt',
      label: 'Amount',
      minWidth: 90,
      align: 'center',
      format: (value) => value?.toFixed(2),
    },
    {
      id: 'delete',
      label: 'Actions',
      minWidth: 40,
      align: 'center',
      render: () => (
        <Tooltip title="Remove Job">
          
                                <IconButton size='small'>
                                  <Trash color={trashColor} onMouseEnter={() => setTrashColor(`${theme?.palette?.customColors?.purple}`)} onMouseLeave={() => setTrashColor('grey')} />
                                </IconButton>
                              
          {/* <img
            src={DeleteIcon}
            alt="#delete"
            title="Delete"
            style={{ height: '20px', width: '20px', cursor: 'pointer' }}
          /> */}
        </Tooltip>
      ),
    },
    // {
    //   id: 'more',
    //   label: 'More',
    //   minWidth: 40,
    //   align: 'center',
    //   render: () => (
    //     <div
    //       style={{
    //         display: 'inline-block',
    //         position: 'relative',
    //       }}
    //       className="hover-container"
    //     >
    //       {/* Small Dot Initially */}
    //       <span
    //         style={{
    //           fontSize: '20px',
    //           cursor: 'pointer',
    //           color: 'grey',
    //         }}
    //         className="hover-dot"
    //       >
    //         .
    //       </span>
    
    //       {/* Hover Icons */}
    //       <div
    //         style={{
    //           position: 'absolute',
    //           top: '-10px',
    //           left: '-30px',
    //           background: 'white',
    //           boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    //           borderRadius: '4px',
    //           padding: '5px',
    //           display: 'none', // Initially hidden
    //         }}
    //         className="hover-icons"
    //       >
    //         <Tooltip title="Settings">
    //           <IconButton size="small">
    //             <Settings color="grey" />
    //           </IconButton>
    //         </Tooltip>
    //         <Tooltip title="Delete">
    //           <IconButton size="small">
    //             <Trash color="grey" />
    //           </IconButton>
    //         </Tooltip>
    //       </div>
    
    //       {/* Hover Behavior */}
    //       <style>
    //         {`
    //           .hover-container:hover .hover-icons {
    //             display: flex;
    //             gap: 5px;
    //           }
    
    //           .hover-container:hover .hover-dot {
    //             display: none; /* Hide the dot on hover */
    //           }
    //         `}
    //       </style>
    //     </div>
    //   ),
    // }
    
    
  ];

  const handleJobSearch = (e) => {
      setJobSearch(e.target.value);
  }


  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allRowIds = jobListData?.map((row) => row.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows?.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  const handleInputChangeHidden = (event) => {
    setInputValueHidden(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleGoButtonClick();
    }
  };

  const handleGoButtonClick = () => {
    if (inputValue === "" || inputValue === undefined) {
      setInputError(true);
    } else {
      setInputError(false);
      setEnteredValues([...enteredValues, inputValue]);
      setInputValue("");
    }
  };

const handleRowClick = (row) => {
  console.log(row);
  moveToSaveNNextPage(true);
}

const [hovered, setHovered] = useState(false);
const [hoveredTax, setHoveredTax] = useState(false);
const [hoveredModeOfDel, setHoveredModeOfDel] = useState(false);
const [hoveredAddLess, setHoveredAddLess] = useState(false);
  return (
    <div className="userDataContainer">

      {/* Bill Info */}
      <div className={`billInfo px-0 ${MoreJobDetailsFlag ? "w-25" : "w-100"} `}>
        <div className="billItem p-1   fw-bold fs_fgp " style={{backgroundColor:theme?.palette?.customColors?.lightBgPurple}}>
          <span>BILL NO</span>
          <span>SK15012024</span>
        </div>
      </div>
      <div
        className={`mb-3 d-flex flex-wrap justify-content-between align-items-center  ${
          MoreJobDetailsFlag ? "w-25" : "w-100"
        } bg_info px-1 py-2`}
        style={{backgroundColor:theme?.palette?.customColors?.lightBgPurple}}
      >
        {/* <div className="summaryItem"> */}
        <div
          className="d-flex flex-column justify-content-center align-items-start fs_fgp "
          style={{ width: "33.33%" }}
        >
          <div>Amount</div>
          <div className="boldText">7908149.86 Dr</div>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-center fs_fgp"
          style={{ width: "33.33%" }}
        >
          <div>Metal</div>
          <div className="boldText">242.922</div>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-end fs_fgp"
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
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className='d-flex  align-items-center'>
          <div >
            <input type="Search Job" value={jobSearch} className="jobSearchINP fs_fgp" style={{maxWidth:'120px', padding:'5px'}} placeholder="Search job" onChange={e => handleJobSearch(e)} />
          </div>
          <div>
            <Tooltip title="Club Job" style={{cursor:'pointer'}}><MergeIcon /></Tooltip>
          </div>
          <div>
            <Tooltip title="Show Job Details" style={{cursor:'pointer'}}><GridOnSharpIcon style={{
                  cursor: "pointer",
                  color: hovered ? `${theme?.palette?.customColors?.purple}` : "black",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => dispatch(handlePopUpJobDetails(true))} /></Tooltip>
          </div>
        </div>
        {/* { mode === "stock_purchase" && <div><Button style={{marginRight:'10px'}} variant="contained" size="small" color="primary">Club</Button></div>} */}
        {/* <div ><Button variant="contained" size="small" color="error" disabled={selectedRows.length === 0}>Delete All</Button></div> */}
        <Button variant="contained" size="small" sx={{color:'white', backgroundColor:theme?.palette?.customColors?.red}} disabled={selectedRows.length === 0}>Delete All</Button>
      </div>
      <div className="tableContainer mt-2">
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

        <TableContainer component={Paper} className='fs_fgp'
        sx={{
          maxHeight: 440,
          // height: 323.5, 
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
        <Table stickyHeader aria-label='sticky table' className='fs_fgp' sx={{boxShadow:'none'}}>
          <TableHead>
            <TableRow>
            <TableCell padding="checkbox" style={{backgroundColor:'#F6F6F7'}}>
                <Checkbox
                  size="small"
                  sx={{
                    // backgroundColor: theme?.palette?.customColors?.primary,
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change this to the color you want when checked
                    },
                  }}
                  indeterminate={selectedRows?.length > 0 && selectedRows?.length < jobListData?.length}
                  checked={selectedRows?.length === jobListData?.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              {columns?.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }} style={{backgroundColor:'#F6F6F7', color:'grey'}} className="fs_usd fs_fgp text_color">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {jobListData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row?.id} onClick={() => handleRowClick(row)}>
                   <TableCell padding="checkbox">
                  <Checkbox
                       sx={{
                        // backgroundColor: theme?.palette?.customColors?.primary,
                        '&.Mui-checked': {
                          color: theme?.palette?.customColors?.purple, // Change this to the color you want when checked
                        },
                      }}
                  size="small"
                    color="primary"
                    checked={isRowSelected(row.id)}
                    onChange={() => handleRowSelection(row.id)}
                  />
                </TableCell>
                  {columns?.map(column => {
                    const value = row[column?.id]

                    return (
                      <>
                       
                      <TableCell key={column?.id} align={column?.align} sx={{padding:'0px'}} className="fs_usd fs_fgp">
                        {/* {column?.format && typeof value === 'number' ? column?.format(value) : value} */}
                        { column?.render // If render function exists, call it
                            ? column.render(value, row)
                            : column?.format && typeof value === 'number' // Otherwise, check for format
                            ? column.format(value)
                            : value // Default to raw value
                        }
                      </TableCell>
                      </>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 20, 30 ,50]}
        component='div'
        count={jobListData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className='jobgrid_fgp fs_fgp text_color'
      />    

        {/* <div className="d-flex justify-content-center mt-2">
          { !MoreJobDetailsFlag && <span className='text-decoration-underline text-primary' style={{cursor:'pointer'}} onClick={() => dispatch(handleMoreJobDetails(true))}>Show More Job Details</span>}
          { MoreJobDetailsFlag && <span className='text-decoration-underline text-primary' style={{cursor:'pointer'}} onClick={() => dispatch(handleMoreJobDetails(false))}>Show Less Job Details</span>}
          <span
            className="text-decoration-underline  user-select-none fs_fgp taxOption_hover"
            style={{ cursor: "pointer", color:'black' }}
            onClick={() => dispatch(handlePopUpJobDetails(true))}
          >
           <span
                className="text-decoration-underline user-select-none fs_fgp"
                style={{
                  cursor: "pointer",
                  color: hovered ? `${theme?.palette?.customColors?.purple}` : "black",
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => dispatch(handlePopUpJobDetails(true))}
              >
            Show Job Details
          </span>
        </div> */}
      </div>

       {/* {
        tagBreakPopUp && <>
          <Modal
              open={tagBreakPopUp}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
              onClose={() => setTagBreakPopUp(false)}
            >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: '99%',
                maxWidth:'800px',
                minHeight:'350px',
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
                <div>Tag Break For (1/17409)</div>
                <div>
                  <Tooltip title="Close" style={{cursor:'pointer'}} onClick={() => setTagBreakPopUp(false)}><CancelIcon /></Tooltip>
                </div>
              </div>
                <div className="fw-semibold">GWT:30.000 gms NetWt:28.000 gms</div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  
              <div style={{position:'relative'}}>
                <img src={scanGif} className="createImageQrCode"  />
                <div>
                  <input
                    type="text"
                    id="hiddeninp"
                    ref={ScanRef}
                    value={inputValueHidden}
                    onChange={handleInputChangeHidden}
                    style={{
                      width: "100px",
                      position: "absolute",
                      top: "30px",
                      left: "10px",
                      zIndex: -1,
                    }}
                  />
                  <input type="text" />
                    <Button
                    variant="contained"
                    className="createGoBtn"
                    style={{
                      color: "white",
                      backgroundColor: "#e68900",
                      borderRadius: "0px",
                    }}
                    onClick={handleGoButtonClick}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                      GO
                    </Typography>
                  </Button>
                </div>
              </div>
                </div>
                <div>
                  <div><span style={{backgroundColor:'lightgreen', padding:'5px', borderRadius:'5px'}}>1/17409</span> for Stock</div>
                  <div>
                    Available Pcs: 15
                  </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Split Pcs: </div>
                      <div>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>Split Gross Wt: </div>
                      <div>
                        <input type="text" />
                      </div>
                    </div>
                    <div><Button color="success" onClick={() => setTagBreakPopUp(false)}>Apply</Button></div>

                </div>
              </div>
        </Box>
        </Modal>
        </>
       } */}
{
  tagBreakPopUp && <>
    <Modal
      open={tagBreakPopUp}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      onClose={() => setTagBreakPopUp(false)}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: '90%',
          maxWidth: '1000px',
          minHeight: '400px',
          bgcolor: "background.paper",
          border: "none",
          pt: 3,
          px: 5,
          pb: 4,
          borderRadius: "12px",
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          background: "linear-gradient(to bottom, #ffffff, #f7f7f7)"
        }}
        className="boxShadow_hp"
      >
        {/* Modal Header */}
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div style={{ fontSize: '18px', display:'flex', alignItems:'center', gap:'5px', fontWeight: '600' }}>Tag Break For <Typography color="primary" style={{fontSize:'18px'}} sx={{fontWeight:'bold'}}>(1/17409)</Typography></div>
          <Tooltip title="Close"  onClick={() => setTagBreakPopUp(false)}>
            <CancelIcon style={{ fontSize: '24px', color: 'black', cursor: 'pointer' }} />
          </Tooltip>
        </div>

        {/* Modal Content */}
        <div className="fw-semibold mb-3 fs_fgp" style={{ fontSize: '16px', color: '#333', display:'flex', alignItems:'center', gap:'5px' }}>
          Gross Wt: <Typography color="primary" sx={{fontWeight:'bold'}}>30.000 gms</Typography>&nbsp;&nbsp; Net Wt: <Typography color="primary" sx={{fontWeight:'bold'}}>28.000 gms</Typography>
        </div>

        {/* Row for Scan and PCS Split */}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* Left Section - Scan and Enter Job */}
          <div style={{ flex: '1', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {/* <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}>Scan and Enter Job</div> */}
            
            {/* Scan QR and Input */}
            <div style={{ position: 'relative', marginBottom: '20px' }}>
              <img src={scanGif} className="createImageQrCode" alt="Scan QR"  />
              <input
                type="text"
                id="hiddeninp"
                ref={ScanRef}
                value={inputValueHidden}
                onChange={handleInputChangeHidden}
                style={{
                  width: "100px",
                  position: "absolute",
                  top: "30px",
                  left: "10px",
                  zIndex: -1,
                  opacity: 0
                }}
              />
<div className="d-flex justify-content-between align-items-center">
<input
                type="text"
                placeholder="Scan QR Code"
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  outline: "none",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  color: "#333",
                  marginTop:'10px',
                  transition: "all 0.3s ease",
                  ':focus': {
                    borderColor: "#4caf50",
                    boxShadow: "0 0 5px rgba(76, 175, 80, 0.5)"
                  }
                }}
              />
              <Button
                variant="contained"
                className="createGoBtn"
                style={{
                  color: "white",
                  backgroundColor: "#e68900",
                  borderRadius: "8px",
                  padding: '8px 16px',
                  marginTop: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  ':hover': { backgroundColor: '#ff9800' }
                }}
                onClick={handleGoButtonClick}
              >
                <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>GO</Typography>
              </Button>
</div>
            </div>
          </div>
          
          {/* Right Section - PCS Split */}
          <div style={{ flex: '1', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}><span style={{color:'black', backgroundColor:'lightgreen', padding:'5px', borderRadius:'5px'}}>1/17409</span> &nbsp;&nbsp; for stock</div>

            {/* PCS Split Inputs */}
              <div style={{ fontWeight: '600' }}>Available Pcs: 15</div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div style={{ fontWeight: '600', width:'150px' }}>Split Pcs :</div>
              <input
                type="text"
                style={{
                  width: "80%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  outline: "none",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  color: "#333",
                }}
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div style={{ fontWeight: '600', width:'150px' }}>Split Gross Wt :</div>
              <input
                type="text"
                style={{
                  width: "80%",
                  padding: "8px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  outline: "none",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  color: "#333",
                }}
              />
            </div>

            {/* Apply Button */}
            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="contained"
                color="success"
                onClick={() => setTagBreakPopUp(false)}
                style={{
                  padding: '10px 20px',
                  fontWeight: '600',
                  fontSize: '14px',
                  backgroundColor: '#4caf50',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  ':hover': { backgroundColor: '#45a049' }
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

      </Box>
    </Modal>
  </>
}



      {
        PopUpJobDetails && <JobGrid />
      }

      {/* Total Summary and Taxes */}
      {/* { mode !== "alteration_issue" && <div className={`totalSummary pt-0 mt-0 ${MoreJobDetailsFlag ? "w-25" : "w-100"}`}> */}
      { mode !== "alteration_issue" && 
      <>
      <div className="d-flex justify-content-end">
      <div className={`totalSummary pt-0 mt-0 `}>
        <div className="totalItem fs_fgp  ">
          <span className="text_color fs_custome_size fs_weight labelColor">Total</span>
          <span className=" fs_custome_size fs_weight">11,391</span>
        </div>
        <div className="totalItem fs_fgp">
          <span className="text_color fs_custome_size fs_weight labelColor"> Discount </span>
          <span className=" fs_custome_size fs_weight">0.00</span>
        </div>
        <div className="totalItem fs_fgp">
          <span className="text_color fs_custome_size fs_weight labelColor">Amount After Discount</span>
          <span className=" fs_custome_size fs_weight">11,391</span>
        </div>

        {/* Tax and Add/Less Dropdowns */}
        {!showTaxDropDown ? (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{minHeight:'45px'}}>
            {/* <div className="taxOption " onClick={() => setShowTaxDropDown(true)}> */}
            <div
                className="taxOption"
                style={{
                  cursor: "pointer",
                  color: hoveredTax ? `${theme?.palette?.customColors?.purple}` : "",
                }}
                onMouseEnter={() => setHoveredTax(true)}
                onMouseLeave={() => setHoveredTax(false)}
                onClick={() => setShowTaxDropDown(true)}
              >
              <span className="fs_custome_size fs_weight labelColor">Taxes</span>
            </div>
            <span className=" fs_custome_size fs_weight">340</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{minHeight:'45px'}}>
            {/* <div className="taxOptionDropdown taxOption_hover"> */}
            <div>
              <select
                onChange={handleTaxSelectionChange}
                className="tax_select_us"
              >
                <option value="cgst+sgst">CGST + SGST</option>
                <option value="igst">IGST</option>
                <option value="gst">GST</option>
              </select>
              <button className="btnApply ms-1">Apply</button>
              <button
                className="btnClose"
                onClick={() => setShowTaxDropDown(false)}
              >
                Close
              </button>
            </div>
            <span className="fs_custome_size fs_weight">340</span>
          </div>
        )}

        {/* Tax and Add/Less Dropdowns */}
        {!showModeOfDelDropDown ? (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{minHeight:'45px'}}>
            {/* <div
              className="taxOption taxOption_hover"
              onClick={() => setShowModeOfDelDropDown(true)}
            > */}
                    <div
                      className="taxOption"
                      style={{
                        cursor: "pointer",
                        color: hoveredModeOfDel ? `${theme?.palette?.customColors?.purple}` : "",
                      }}
                      onMouseEnter={() => setHoveredModeOfDel(true)}
                      onMouseLeave={() => setHoveredModeOfDel(false)}
                      onClick={() => setShowModeOfDelDropDown(true)}
                    >
              <span className="fs_custome_size fs_weight labelColor">Mode of Delivery</span>
            </div>
            <span className=" fs_custome_size fs_weight">340</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center  fs_fgp" style={{minHeight:'45px'}}>
            {/* <div className="taxOptionDropdown"> */}
            <div className="">
              <select
                onChange={handleTaxSelectionChange}
                className="tax_select_us"
              >
                <option value="cgst+sgst">By Train</option>
                <option value="igst">By DTDC</option>
                <option value="gst">By Courier</option>
              </select>
              <button className="btnApply ms-1">Apply</button>
              <button
                className="btnClose"
                onClick={() => setShowModeOfDelDropDown(false)}
              >
                Close
              </button>
            </div>
            <span className="fs_custome_size fs_weight">340</span>
          </div>
        )}

        {!showAddLess ? (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{minHeight:'45px'}}>
            {/* <div className="addLessOption taxOption_hover" onClick={() => setShowAddLess(true)}> */}
            <div
                      className="addLessOption"
                      style={{
                        cursor: "pointer",
                        color: hoveredAddLess ? `${theme?.palette?.customColors?.purple}` : "",
                      }}
                      onMouseEnter={() => setHoveredAddLess(true)}
                      onMouseLeave={() => setHoveredAddLess(false)}
                      onClick={() => setShowAddLess(true)}
                    >
              <span className="fs_custome_size fs_weight labelColor" >Add/Less</span>
            </div>
            <span className=" fs_custome_size fs_weight">1234</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{minHeight:'45px'}}>
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
            <div className=" fs_custome_size fs_weight">1234</div>
          </div>
        )}
  <hr />  
        <div className="finalAmount fs_fgp">
          <span className=" fs_custome_size fs_weight labelColor"  >Final Amount</span>
          <span className=" fs_custome_size fs_weight">11,391.46</span>
        </div>
      </div>
      </div>
      </>
      }
    </div>
  );
};

export default UserData;