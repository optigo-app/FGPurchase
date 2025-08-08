import React, { useEffect, useRef, useState } from "react";
import "./userdata.css";
import {
  handleCustomizeJobFlag,
  handleSaveAndNextFlag,
  handleSelectedButton,
} from "../../redux/slices/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../assets/images/delete.png";
import { handlePopUpJobDetails } from "../../redux/slices/FgpSlice";
import { Settings } from "@mui/icons-material";
import JobGrid from "./JobGrid";
import "./jobgrid.css";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
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
import SummaryPanel from "./SummaryPanel";
import JobDataGrid from "./JobDataGrid";

const UserData = () => {
  const theme = useTheme();
  const mode = useSelector((state) => state?.fgp?.mode);
  const [showTaxDropDown, setShowTaxDropDown] = useState(false);
  const [showModeOfDelDropDown, setShowModeOfDelDropDown] = useState(false);
  const [showAddLess, setShowAddLess] = useState(false);

  const [jobListData, setJobListData] = useState();
  console.log('jobListData: ', jobListData);
  const [selectedRows, setSelectedRows] = useState([]);
  console.log('selectedRows: ', selectedRows);

  const [jobSearch, setJobSearch] = useState('');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  useEffect(() => {
    setJobListData([
      { id: 1, details: '1/271928 ', gwt: 3.120, netwt: 2.654, totalamt: 3081.5, delete: null },
      { id: 2, details: '1/271929', gwt: 4.019, netwt: 3.254, totalamt: 4081.5, delete: null },
      { id: 3, details: '1/271929', gwt: 4.228, netwt: 3.621, totalamt: 4081.5, delete: null },
      { id: 4, details: '1/271929', gwt: 4.145, netwt: 3.690, totalamt: 4081.5, delete: null },
      { id: 5, details: '1/271929', gwt: 4.841, netwt: 3.687, totalamt: 4081.5, delete: null },
      { id: 6, details: '1/271929', gwt: 4.992, netwt: 3.678, totalamt: 4081.5, delete: null },
      { id: 7, details: '1/271929', gwt: 4.100, netwt: 3.600, totalamt: 4081.5, delete: null },
    ])
  }, []);

  const dispatch = useDispatch();
  const MoreJobDetailsFlag = useSelector((state) => state?.fgp?.MoreJobDetails);
  const PopUpJobDetails = useSelector((state) => state?.fgp?.PopUpJobDetails);
  const [tagBreakPopUp, setTagBreakPopUp] = useState(false);
  const [inputValueHidden, setInputValueHidden] = useState("");
  const [enteredValues, setEnteredValues] = useState([]);
  const [inputValue, setInputValue] = useState(undefined);
  const [inputError, setInputError] = useState(false);
  const ScanRef = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [hoveredTax, setHoveredTax] = useState(false);
  const [hoveredModeOfDel, setHoveredModeOfDel] = useState(false);
  const [hoveredAddLess, setHoveredAddLess] = useState(false);

  const handleTaxSelectionChange = (e) => { };

  const moveToSaveNNextPage = () => {
    dispatch(handleSaveAndNextFlag(true));
    dispatch(handleCustomizeJobFlag(false));
    dispatch(handleSelectedButton("add"));
  }

  const handleOpenPopup = (row) => {
    console.log(row);
    setTagBreakPopUp(true);
  }

  const handleJobSearch = (e) => {
    setJobSearch(e.target.value);
  }

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
    moveToSaveNNextPage(true);
  }

  const handleSingleDelete = (id) => {
    setJobListData(prev => prev.filter(item => item.id !== id));
    setSelectedRows(prev => prev.filter(rowId => rowId !== id));
  };

  const handleBulkDelete = () => {
    setJobListData(prev => prev.filter(item => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const handleClubJob = () => {
    setJobListData(prev =>
      prev.map(item =>
        selectedRows.includes(item.id)
          ? { ...item, isClubJob: true }
          : item
      )
    );
  }

  const handleUnclubJob = (row) => {
    setJobListData(prev =>
      prev.map(item =>
        item.id === row.id
          ? { ...item, isClubJob: false }
          : item
      )
    );
  }

  const handleAllUnclubJob = () => {
    setJobListData(prev =>
      prev.map(item => ({
        ...item,
        isClubJob: false
      }))
    );
  };

  const handleSelectAllChange = (e) => {
    debugger
    if (e.target.checked) {
      const allSelectable = jobListData?.filter(row => !row.isClubJob)?.map(row => row.id);
      setSelectedRows(allSelectable);
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedRows(prev => [...prev, id]);
    } else {
      setSelectedRows(prev => prev.filter(rowId => rowId !== id));
    }
  };

  const allClubbed = jobListData?.every(item => item.isClubJob);

  <Button
    variant="contained"
    size="small"
    className="action-btn"
    onClick={() => {
      allClubbed ? handleAllUnclubJob() : handleClubJob();
    }}
    sx={{
      backgroundColor: theme?.palette?.customColors?.purple,
      color: 'white'
    }}
  >
    {allClubbed ? 'Unclub All' : 'Club Job'}
  </Button>
  // ... existing code ...

  return (
    <div className="userDataContainer">
      {/* Bill Info Section */}
      <div className={`bill-info ${MoreJobDetailsFlag ? "narrow" : "full"}`}>
        <div className="bill-header">
          <span className="label">Bill No-</span>
          <span className="value">SK15012024</span>
        </div>
      </div>

      {/* Bill Summary Section */}
      <div className={`bill-summary ${MoreJobDetailsFlag ? "narrow" : "full"}`}>
        <div className="summary-item align-start">
          <div className="label">Amount</div>
          <div className="value">7908149.86 Dr</div>
        </div>
        <div className="summary-item align-center">
          <div className="label">Metal</div>
          <div className="value">242.922</div>
        </div>
        <div className="summary-item align-end">
          <div className="label">Diamond</div>
          <div className="value">116.923</div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center w-100">
        <div className='d-flex  align-items-center'>
          <div >
            <input type="Search Job" value={jobSearch} className="jobSearchINP fs_fgp" style={{ maxWidth: '150px', padding: '5px' }} placeholder="Search job" onChange={e => handleJobSearch(e)} />
          </div>
          <div className="userAction-buttons">
            <Button
              variant="contained"
              size="small"
              className="action-btn"
              onClick={() => {
                allClubbed ? handleAllUnclubJob() : handleClubJob();
              }}
              sx={{
                backgroundColor: theme?.palette?.customColors?.purple,
                color: 'white'
              }}
            >
              {allClubbed ? 'Unclub All' : 'Club Job'}
            </Button>

            <Button
              variant="contained"
              size="small"
              className="action-btn"
              onClick={() => dispatch(handlePopUpJobDetails(true))}
              sx={{ backgroundColor: theme?.palette?.customColors?.purple, color: 'white' }}
            >
              More Details
            </Button>
          </div>
        </div>
        <Button variant="contained" className="action-btn" size="small" sx={{ color: 'white', background: theme?.palette?.customColors?.red }} disabled={selectedRows?.length === 0} onClick={handleBulkDelete}>Delete All</Button>
      </div>
      <div className="tableContainer mt-2">
        <JobDataGrid
          rows={jobListData || []}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          handleRowClick={handleRowClick}
          theme={theme}
          mode={mode}
          setTagBreakPopUp={setTagBreakPopUp}
          dispatch={dispatch}
          handleSingleDelete={handleSingleDelete}
          handleCustomizeJobFlag={handleCustomizeJobFlag}
          handleSelectedButton={handleSelectedButton}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          handleSelectAllChange={handleSelectAllChange}
          handleCheckboxChange={handleCheckboxChange}
          handleUnclubJob={handleUnclubJob}

        />
      </div>
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
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>Tag Break For <Typography color="primary" style={{ fontSize: '18px' }} sx={{ fontWeight: 'bold' }}>(1/17409)</Typography></div>
                <Tooltip title="Close" onClick={() => setTagBreakPopUp(false)}>
                  <CancelIcon style={{ fontSize: '24px', color: 'black', cursor: 'pointer' }} />
                </Tooltip>
              </div>
              <div className="fw-semibold mb-3 fs_fgp" style={{ fontSize: '16px', color: '#333', display: 'flex', alignItems: 'center', gap: '5px' }}>
                Gross Wt: <Typography color="primary" sx={{ fontWeight: 'bold' }}>30.000 gms</Typography>&nbsp;&nbsp; Net Wt: <Typography color="primary" sx={{ fontWeight: 'bold' }}>28.000 gms</Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ flex: '1', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                  <div style={{ position: 'relative', marginBottom: '20px' }}>
                    <img src={scanGif} className="createImageQrCode" alt="Scan QR" />
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
                          marginTop: '10px',
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
                  <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '12px' }}><span style={{ color: 'black', backgroundColor: 'lightgreen', padding: '5px', borderRadius: '5px' }}>1/17409</span> &nbsp;&nbsp; for stock</div>

                  {/* PCS Split Inputs */}
                  <div style={{ fontWeight: '600' }}>Available Pcs: 15</div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div style={{ fontWeight: '600', width: '150px' }}>Split Pcs :</div>
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
                    <div style={{ fontWeight: '600', width: '150px' }}>Split Gross Wt :</div>
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

      {mode !== "alteration_issue" && (
        <SummaryPanel
          theme={theme}
          showTaxDropDown={showTaxDropDown}
          setShowTaxDropDown={setShowTaxDropDown}
          hoveredTax={hoveredTax}
          setHoveredTax={setHoveredTax}
          handleTaxSelectionChange={handleTaxSelectionChange}
          showModeOfDelDropDown={showModeOfDelDropDown}
          setShowModeOfDelDropDown={setShowModeOfDelDropDown}
          hoveredModeOfDel={hoveredModeOfDel}
          setHoveredModeOfDel={setHoveredModeOfDel}
          showAddLess={showAddLess}
          setShowAddLess={setShowAddLess}
          hoveredAddLess={hoveredAddLess}
          setHoveredAddLess={setHoveredAddLess}
        />
      )}

    </div>
  );
};

export default UserData;