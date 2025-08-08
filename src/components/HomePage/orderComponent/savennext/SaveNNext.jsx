import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./savennext.css";
import DeleteIcon from "../../../../assets/images/delete.png";
import SettingsIcon from '@mui/icons-material/Settings';
import { handleIssuedMaterialModal, handleSaveAndNextFlag, handleSelectedButton, handleShowImgListPopUp } from '../../../../redux/slices/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from "@mui/icons-material/Save";
import { Tooltip, Button, AvatarGroup, Avatar, useTheme, IconButton } from '@mui/material';
import FileUploaderMultiple from './FileUploaderMultiple';
import MountGrid from './MountGrid';
import IssuedMaterial from './IssuedMaterial';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { brandMainData, categorymainData, collectionMainData, genderMainData, occasionMainData, productTypeMainData, styleMainData, subCategoryMainData } from '../../../../master/MasterData';
import InfoIcon from '@mui/icons-material/Info';
import Grid4x4SharpIcon from '@mui/icons-material/Grid4x4Sharp';
import MaterialDetailsModal from '../../../../ShortcutComponent/stockPurchase/MaterialDetailsModal';
import { materialConfigs } from '../../../../ShortcutComponent/stockPurchase/MaterialDetailsConfig';
import MarkupModal from '../../../../ShortcutComponent/stockPurchase/MarkupModal';
import AltReceiveTimeModal from '../../../../ShortcutComponent/stockPurchase/AltReceiveTimeModal';
import ChangeCriteriaModal from '../../../../ShortcutComponent/stockPurchase/ChangeCriteriaModal';
import GroupedTableSection from '../../../../ShortcutComponent/stockPurchase/GroupedTableSection';
import PrimaryDetails from '../../../../ShortcutComponent/stockPurchase/PrimaryDetails';
import RemarkModal from '../../../../ShortcutComponent/stockPurchase/RemarkModal';
import MaterialInfo from './selectedJobDetail/MaterialInfo';
const SaveNNext = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector(state => state?.fgp?.mode);
  const mountModal = useSelector(state => state?.home?.mountModal);
  const selectedTabValue = useSelector(state => state?.home?.selectedTabValue);
  const addSubTag = useSelector(state => state?.home?.addSubtag);
  const issuedMaterialModal = useSelector(state => state?.home?.issuedMaterialModal);
  const uploadImage = useSelector(state => state?.home?.uploadImage);
  const [markUpModal, setMarkUpModal] = useState(false);
  const [addMoreMaterial, setAddMoreMaterial] = useState(false);
  const [remarkModal, setRemarkModal] = useState(false);
  const [saveRemark, setSaveRemark] = useState('');
  const [addDiaInfoPopUp, setAddDiaInfoPopUp] = useState(false);
  const [addDiamondRows, setAddDiamondRows] = useState([
    {
      material: '',
      type: '',
      shape: '',
      clarity: '',
      color: '',
      size: '',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
      onPcs: null,
      addInGrossWt: null,
      tunch: 0,
      wastage: 0
    },
  ]);
  const diamond_Focus = useRef();
  const [addCSInfoPopUp, setAddCSInfoPopUp] = useState(false);
  const [addCsRows, setAddCSRows] = useState([
    {
      material: '',
      type: '',
      shape: '',
      clarity: '',
      color: '',
      size: '',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
      onPcs: null,
      addInGrossWt: null,
      tunch: 0,
      wastage: 0
    },
  ]);
  const colorstone_focus = useRef();
  const csWtFocus = useRef();
  const [addMiscInfoPopUp, setAddMiscInfoPopUp] = useState(false);
  const [addMiscRows, setAddMiscRows] = useState([
    {
      material: '',
      type: '',
      shape: '',
      clarity: '',
      color: '',
      size: '',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
      onPcs: null,
      addInGrossWt: null,
      tunch: 0,
      wastage: 0
    },
  ]);
  const misc_focus = useRef();
  const miscWtFocus = useRef();
  const [addFindingInfoPopUp, setAddFindingInfoPopUp] = useState(false);
  const [addFindingRows, setAddFindingRows] = useState([
    {
      material: '',
      type: '',
      shape: '',
      clarity: '',
      color: '',
      size: '',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
      onPcs: null,
      addInGrossWt: null,
      tunch: 0,
      wastage: 0
    },
  ]);
  const findingWtFocus = useRef();
  const finding_focus = useRef();
  const [materialDetails, setMaterialDetails] = useState({});
  const [showTableEntry, setShowTableEntry] = useState(false);
  const [changeCriteria, setChangeCriteria] = useState(false);
  const [altReceiveTimeHide, setAltReceiveTimeHide] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState({
    type: "D",
    criteria: "RND",
    pcs: "25",
    wt: "1.235",
    pcsWt: "25/1.255",
    supplier: "Company",
    rate: "12000",
    amount: "27000",
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const markUpModalOpen = () => {
    setMarkUpModal(true);
  }

  const handleAddRemark = () => {
    setRemarkModal(true);
  }

  const handleRemarkChange = (e) => {
    setSaveRemark(e.target.value);
  }

  const handleSaveRemark = () => {
    if (saveRemark) {
      setRemarkModal(false);
    }
  }

  const handleEnterKeyChange = useCallback((e, args) => {
    debugger
    if (e?.key?.toLowerCase() === "enter") {
      if (args === 'diawt') {
        setAddDiaInfoPopUp(true);
      }
      if (args === 'cswt') {
        setAddCSInfoPopUp(true);
      }
      if (args === 'miscwt') {
        setAddMiscInfoPopUp(true);
      }
      if (args === 'finewt') {
        setAddFindingInfoPopUp(true);
      }
    }
  }, [addDiaInfoPopUp, addCSInfoPopUp, addMiscInfoPopUp, addFindingInfoPopUp]);

  const handleFilterChange = (field, value) => {
    setMaterialDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleCriteriaChange = (field, value) => {
    setMaterialDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleDiamondInputChange = (e, rowIndex) => {
    const { name, value, type, checked } = e.target;
    const updatedRows = [...addDiamondRows];
    updatedRows[rowIndex][name] = type === "checkbox" ? checked : value;
    setAddDiamondRows(updatedRows);
  };

  const handleAddRow = () => {
    const lastRow = addDiamondRows[addDiamondRows.length - 1];
    const keysToIgnore = ['onPcs'];
    const isLastRowValid = Object.entries(lastRow)
      .filter(([key]) => !keysToIgnore.includes(key))
      .every(([, value]) => value !== '');

    if (!isLastRowValid) {
      alert('Please fill out all required fields in the last row before adding a new one.');
      return;
    }

    setAddDiamondRows([
      ...addDiamondRows,
      {
        material: '',
        type: '',
        shape: '',
        clarity: '',
        color: '',
        size: '',
        pcs: '',
        wt: '',
        supplier: '',
        rate: '',
        amount: '',
        onPcs: false,
        addInGrossWt: null,
        tunch: 0,
        wastage: 0
      },
    ]);
  };

  const handleDIamondKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddRow();
    }
  };

  useEffect(() => {
    if (addDiaInfoPopUp) {
      setTimeout(() => {
        if (diamond_Focus.current) {
          diamond_Focus.current.focus();
        }
      }, 0);
    }
  }, [addDiaInfoPopUp]);

  const handleSaveDiamondDetails = () => {
    setAddDiaInfoPopUp(false);
    const hasValidDiamondData = isTableDataValid(addDiamondRows);
    if (!hasValidDiamondData) {
      return;
    }
    setMaterialDetails({
      ...materialDetails,
      moreMaterial: {
        ...materialDetails.moreMaterial,
        diamond: addDiamondRows
      }
    })
  }

  const handleSaveColorstoneDetails = () => {
    setAddCSInfoPopUp(false);
    const hasValidCsData = isTableDataValid(addCsRows);
    if (!hasValidCsData) {
      return;
    }
    setMaterialDetails({
      ...materialDetails,
      moreMaterial: {
        ...materialDetails.moreMaterial,
        colorstone: addCsRows
      }
    })
  }

  const handleColorstoneInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...addCsRows];
    updatedRows[rowIndex][name] = value;
    setAddCSRows(updatedRows);
  };

  // Add a new row
  const handleCSAddRow = () => {
    const lastRow = addCsRows[addCsRows.length - 1];
    const keysToIgnore = ['onPcs'];
    const isLastRowValid = Object.entries(lastRow)
      .filter(([key]) => !keysToIgnore.includes(key))
      .every(([, value]) => value !== '');

    if (!isLastRowValid) {
      alert('Please fill out all required fields in the last row before adding a new one.');
      return;
    }

    setAddCSRows([
      ...addCsRows,
      {
        material: '',
        type: '',
        shape: '',
        clarity: '',
        color: '',
        size: '',
        pcs: '',
        wt: '',
        supplier: '',
        rate: '',
        amount: '',
        onPcs: false,
        addInGrossWt: null,
        tunch: 0,
        wastage: 0
      },
    ]);
  };

  const handleColorstoneKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCSAddRow();
    }
  };

  useEffect(() => {
    if (addCSInfoPopUp) {
      setTimeout(() => {
        if (colorstone_focus.current) {
          colorstone_focus.current.focus();
        }
      }, 0);
    }
  }, [addCSInfoPopUp]);

  //add misc pop up logic
  const handleSaveMiscDetails = () => {
    setAddMiscInfoPopUp(false);
    const hasValidMiscData = isTableDataValid(addMiscRows);
    if (!hasValidMiscData) {
      return;
    }
    setMaterialDetails({
      ...materialDetails,
      moreMaterial: {
        ...materialDetails.moreMaterial,
        misc: addMiscRows
      }
    })
  }

  const handleMiscInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...addMiscRows];
    updatedRows[rowIndex][name] = value;
    setAddMiscRows(updatedRows);
  };

  const handleMiscAddRow = () => {
    const lastRow = addMiscRows[addMiscRows?.length - 1];
    const keysToIgnore = ['onPcs'];
    const isLastRowValid = Object.entries(lastRow)
      .filter(([key]) => !keysToIgnore.includes(key)) // Exclude ignored keys
      .every(([, value]) => value !== ''); // Check remaining fields

    if (!isLastRowValid) {
      alert('Please fill out all required fields in the last row before adding a new one.');
      return; // Stop adding a new row
    }
    setAddMiscRows([
      ...addMiscRows,
      {
        material: '',
        type: '',
        shape: '',
        clarity: '',
        color: '',
        size: '',
        pcs: '',
        wt: '',
        supplier: '',
        rate: '',
        amount: '',
        onPcs: false,
        addInGrossWt: false,
        tunch: 0,
        wastage: 0
      },
    ]);
  };

  const handleMiscKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMiscAddRow();
    }
  };

  useEffect(() => {
    if (addMiscInfoPopUp) {
      setTimeout(() => {
        if (misc_focus.current) {
          misc_focus.current.focus();
        }
      }, 0);
    }
  }, [addMiscInfoPopUp]);

  //add finding pop up logic
  const handleSaveFindingDetails = () => {
    setAddFindingInfoPopUp(false);
    const hasValidFindingData = isTableDataValid(addFindingRows);
    if (!hasValidFindingData) {
      return;
    }
    setMaterialDetails({
      ...materialDetails,
      moreMaterial: {
        ...materialDetails.moreMaterial,
        finding: addFindingRows
      }
    })
  }

  const handleFindingInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...addFindingRows];
    updatedRows[rowIndex][name] = value;
    setAddFindingRows(updatedRows);
  };

  // Add a new row
  const handleFindingAddRow = () => {
    const lastRow = addFindingRows[addFindingRows?.length - 1];
    const keysToIgnore = ['onPcs'];
    const isLastRowValid = Object.entries(lastRow)
      .filter(([key]) => !keysToIgnore.includes(key)) // Exclude ignored keys
      .every(([, value]) => value !== ''); // Check remaining fields
    if (!isLastRowValid) {
      alert('Please fill out all required fields in the last row before adding a new one.');
      return; // Stop adding a new row
    }
    setAddFindingRows([
      ...addFindingRows,
      {
        material: '',
        type: '',
        shape: '',
        clarity: '',
        color: '',
        size: '',
        pcs: '',
        wt: '',
        supplier: '',
        rate: '',
        amount: '',
        onPcs: false,
        addInGrossWt: null,
        tunch: 0,
        wastage: 0
      },
    ]);
  };

  const handleFindingKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFindingAddRow();
    }
  };

  useEffect(() => {
    if (addFindingInfoPopUp) {
      setTimeout(() => {
        if (finding_focus.current) {
          finding_focus.current.focus();
        }
      }, 0);
    }
  }, [addFindingInfoPopUp]);

  const isTableDataValid = (rows) => {
    return rows.some(row =>
      Object.values(row).some(value => value !== "" && value !== null && value !== 0)
    );
  };

  const handleSaveAndNew = () => {
    if (selectedTabValue === 'neworder') {
      dispatch(handleSaveAndNextFlag(true));
    } else {
      dispatch(handleSaveAndNextFlag(false));
    }
    if (mode === "alteration_issue") {
      dispatch(handleSelectedButton("add"));
    }
    if (mode === "alteration_receive") {
      dispatch(handleSelectedButton("altjobs"));
    }
  }

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const renderFilePreview = (file, index) => {
    return (
      <Avatar
        src={URL.createObjectURL(file)}
        key={index}
        sx={{
          height: hoveredIndex === index ? 42 : 39, // Larger size on hover
          width: hoveredIndex === index ? 42 : 39,
          transition: "transform 0.2s ease, height 0.2s ease, width 0.2s ease", // Smooth transition
          cursor: "pointer",
          border: hoveredIndex === index ? "2px solid grey !important" : "1px solid #989898", // Distinct border on hover
        }}
        onClick={() => {
          setHoveredIndex(null);
          dispatch(handleShowImgListPopUp(true));
        }}
        onMouseEnter={() => {
          setHoveredIndex(index); // Update hovered index
        }}
        onMouseLeave={() => {
          setHoveredIndex(null); // Reset hovered index
        }}
      />
    );
  };

  useEffect(() => {
    const avatar = document.querySelector('.css-18k2bs-MuiAvatar-root');
    if (avatar) {
      avatar.addEventListener('click', () => {
        dispatch(handleShowImgListPopUp(true));
      })
      avatar.style.height = '28px !important';
      avatar.style.width = '28px !important';
      avatar.style.cursor = 'pointer !important';
    }
  }, [uploadImage]);


  return (
    <>
      <div className='savennext_container'>
        <div>
          <h5 className='header_title_fgp fs_fgp'>Add Product Details</h5>
        </div>

        {/* Job Line */}
        <MaterialInfo
          theme={theme}
          showTableEntry={showTableEntry}
          setShowTableEntry={setShowTableEntry}
          handleAddRemark={handleAddRemark}
          setAltReceiveTimeHide={() => console.log('Show alt receive time')}
          setChangeCriteria={() => console.log('Change criteria')}
          uploadImage={uploadImage}
          renderFilePreview={renderFilePreview}
          mode={mode}
        />

        <PrimaryDetails
          mode={mode}
          onChange={handleFilterChange}
          showSubTag={addSubTag}
          setChangeCriteria={setChangeCriteria}
          handleEnterKeyChange={handleEnterKeyChange}
          csWtFocus={csWtFocus}
          miscWtFocus={miscWtFocus}
          findingWtFocus={findingWtFocus}
        />
        <div>
          {
            //  addMoreMaterial && <>
            1 && <>
              <div className='d-flex justify-content-between align-items-center mb-2 pt-3'>
                {<h5 className='ps-2 mb-0'>{showTableEntry && ""}</h5>}
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <Tooltip title="Receive From Vendor">
                      <IconButton
                        onClick={() => dispatch(handleIssuedMaterialModal(true))}
                        sx={{
                          color: '#fff',
                          border: `1px solid ${theme?.palette?.customColors?.purple}`,
                          background: `${theme?.palette?.customColors?.primary}`,
                          p: 1,
                        }}
                      >
                        <InfoOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
                {mountModal && <MountGrid />}
                {issuedMaterialModal && <IssuedMaterial />}
              </div>
              {showTableEntry && (
                <div className='w-100 d-flex justify-content-start align-items-center'>
                  <table className='table tableCus fs_fgp' style={{ width: '90%', overflow: 'auto' }}>
                    <thead>
                      <tr>
                        <th>Sr</th>
                        <th>Type</th>
                        <th>Shape</th>
                        <th>Clarity / FType</th>
                        <th>Color</th>
                        <th>Size / Accessories</th>
                        <th>Pcs/Wt</th>
                        <th>Tunch/Wastage</th>
                        <th>Supplier</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th>On Pcs</th>
                        <th>AddIn GrossWt</th>
                        <th>Update</th>
                        <th>{mode === 'alteration_receive' ? 'Detach' : 'Remove'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <GroupedTableSection title="💎 Diamond Rows" rows={addDiamondRows} type="diamond" mode={mode} />
                      <GroupedTableSection title="🔷 CS Stone Rows" rows={addCsRows} type="cs" mode={mode} />
                      <GroupedTableSection title="🛠 Misc Rows" rows={addMiscRows} type="misc" mode={mode} />
                      <GroupedTableSection title="🔗 Finding Rows" rows={addFindingRows} type="finding" mode={mode} />
                    </tbody>
                  </table>
                </div>
              )}

              <div style={{ maxHeight: '245px' }}>
                {addMoreMaterial && <table className='table'>
                  <thead>
                    <tr>
                      <th align='center'>Sr</th>
                      <th align='center'>Type</th>
                      <th align='center'>Criteria</th>
                      <th align='center'>Pcs/Wt</th>
                      <th align='center'>Supplier</th>
                      <th align='center'>Rate</th>
                      <th align='center'>Amount</th>
                      <th align='center'>Mark Up</th>
                      <th align='center'>{isEditing ? 'Save' : 'Edit'}</th>
                      <th align='center'>Del</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td align="center">1</td>
                      <td align="left">
                        {isEditing ? (
                          <input
                            type="text"
                            name="type"
                            value={rowData.type}
                            onChange={handleInputChange}
                            style={{ width: '100px', border: "1px solid #ccc" }}
                            className='onfocus_snv'
                          />
                        ) : (
                          rowData.type
                        )}
                      </td>
                      <td align="left">
                        {isEditing ? (
                          <input
                            type="text"
                            name="criteria"
                            value={rowData.criteria}
                            onChange={handleInputChange}
                            style={{ width: '100px', border: "1px solid #ccc" }}
                            className='onfocus_snv'
                          />
                        ) : (
                          rowData.criteria
                        )}
                      </td>
                      <td align="center">
                        {isEditing ? (
                          <div>
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.pcs}
                              onChange={handleInputChange}
                              style={{ width: '40px', marginRight: '2px', border: "1px solid #ccc" }}
                              className='onfocus_snv'
                            />
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.wt}
                              onChange={handleInputChange}
                              style={{ width: '60px', border: "1px solid #ccc" }}
                              className='onfocus_snv'
                            />
                          </div>
                        ) : (
                          rowData.pcsWt
                        )}
                      </td>
                      <td align="left">
                        {isEditing ? (
                          <input
                            type="text"
                            name="supplier"
                            value={rowData.supplier}
                            onChange={handleInputChange}
                            style={{ width: '100px', border: "1px solid #ccc" }}
                            className='onfocus_snv'
                          />
                        ) : (
                          rowData.supplier
                        )}
                      </td>
                      <td align="right">
                        {isEditing ? (
                          <input
                            type="text"
                            name="rate"
                            value={rowData.rate}
                            onChange={handleInputChange}
                            style={{ width: '100px', border: "1px solid #ccc" }}
                            className='onfocus_snv'
                          />
                        ) : (
                          rowData.rate
                        )}
                      </td>
                      <td align="right">
                        {isEditing ? (
                          <input
                            type="text"
                            name="amount"
                            value={rowData.amount}
                            onChange={handleInputChange}
                            style={{ width: '100px', border: "1px solid #ccc" }}
                            className='onfocus_snv'
                          />
                        ) : (
                          rowData.amount
                        )}
                      </td>
                      <td align="center">
                        <Tooltip title="Mark Up Details"><VisibilityIcon onClick={() => markUpModalOpen()} /></Tooltip>
                      </td>
                      <td align="center">
                        {isEditing ? (
                          <SaveIcon
                            titleAccess="Save Entry"
                            onClick={handleSaveClick}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <EditIcon
                            titleAccess="Update Entry"
                            onClick={handleEditClick}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </td>
                      <td>
                        <img
                          src={DeleteIcon}
                          alt="#Delete"
                          title="Delete"
                          style={{ height: "20px", width: "20px", cursor: "pointer" }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>}
                <MarkupModal open={markUpModal} onClose={() => setMarkUpModal(false)} theme={theme} />
                <AltReceiveTimeModal open={altReceiveTimeHide} onClose={() => setAltReceiveTimeHide(false)} theme={theme} />
                <ChangeCriteriaModal
                  open={changeCriteria}
                  onClose={() => setChangeCriteria(false)}
                  theme={theme}
                  brandMainData={brandMainData}
                  collectionMainData={collectionMainData}
                  categorymainData={categorymainData}
                  subCategoryMainData={subCategoryMainData}
                  productTypeMainData={productTypeMainData}
                  genderMainData={genderMainData}
                  occasionMainData={occasionMainData}
                  styleMainData={styleMainData}
                  onChange={handleCriteriaChange}
                />

                {/* diam, cs, misc, find pop up render part */}
                {addDiaInfoPopUp && (
                  <MaterialDetailsModal
                    open={addDiaInfoPopUp}
                    onClose={() => setAddDiaInfoPopUp(false)}
                    title={materialConfigs.diamond.title}
                    rows={addDiamondRows}
                    onInputChange={handleDiamondInputChange}
                    onAddRow={handleAddRow}
                    onSave={handleSaveDiamondDetails}
                    onKeyDown={handleDIamondKeyDown}
                    config={materialConfigs.diamond}
                    theme={theme}
                    dispatch={dispatch}
                    handleIssuedMaterialModal={handleIssuedMaterialModal}
                    markUpModalOpen={markUpModalOpen}
                    focusRef={diamond_Focus}
                  />
                )}

                {addCSInfoPopUp && (
                  <MaterialDetailsModal
                    open={addCSInfoPopUp}
                    onClose={() => setAddCSInfoPopUp(false)}
                    title={materialConfigs.colorstone.title}
                    rows={addCsRows}
                    onInputChange={handleColorstoneInputChange}
                    onAddRow={handleCSAddRow}
                    onSave={handleSaveColorstoneDetails}
                    onKeyDown={handleColorstoneKeyDown}
                    config={materialConfigs.colorstone}
                    theme={theme}
                    dispatch={dispatch}
                    handleIssuedMaterialModal={handleIssuedMaterialModal}
                    markUpModalOpen={markUpModalOpen}
                    focusRef={colorstone_focus}
                  />
                )}

                {addMiscInfoPopUp && (
                  <MaterialDetailsModal
                    open={addMiscInfoPopUp}
                    onClose={() => setAddMiscInfoPopUp(false)}
                    title={materialConfigs.misc.title}
                    rows={addMiscRows}
                    onInputChange={handleMiscInputChange}
                    onAddRow={handleMiscAddRow}
                    onSave={handleSaveMiscDetails}
                    onKeyDown={handleMiscKeyDown}
                    config={materialConfigs.misc}
                    theme={theme}
                    dispatch={dispatch}
                    handleIssuedMaterialModal={handleIssuedMaterialModal}
                    markUpModalOpen={markUpModalOpen}
                    focusRef={misc_focus}
                  />
                )}

                {addFindingInfoPopUp && (
                  <MaterialDetailsModal
                    open={addFindingInfoPopUp}
                    onClose={() => setAddFindingInfoPopUp(false)}
                    title={materialConfigs.finding.title}
                    rows={addFindingRows}
                    onInputChange={handleFindingInputChange}
                    onAddRow={handleFindingAddRow}
                    onSave={handleSaveFindingDetails}
                    onKeyDown={handleFindingKeyDown}
                    config={materialConfigs.finding}
                    theme={theme}
                    dispatch={dispatch}
                    handleIssuedMaterialModal={handleIssuedMaterialModal}
                    markUpModalOpen={markUpModalOpen}
                    focusRef={finding_focus}
                  />
                )}
              </div>
            </>
          }

          <div className='d-flex align-items-center justify-content-center pb-2'>
            <div className="m-1">
              <Button variant='contained' className='fs_fgp' size='small' sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }} style={{ minWidth: '100px' }} onClick={() => handleSaveAndNew()}>Save & New</Button>
            </div>
            <div className="m-1">
              <Button variant='contained' className='fs_fgp' size='small' sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }} style={{ minWidth: '100px' }}>Save & Print</Button>
            </div>
          </div>

        </div>
        <RemarkModal
          open={remarkModal}
          onClose={() => setRemarkModal(false)}
          remark={saveRemark}
          onChange={handleRemarkChange}
          onSave={handleSaveRemark}
          theme={theme}
        />
      </div>
    </>
  )
}

export default SaveNNext;