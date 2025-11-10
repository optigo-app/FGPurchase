import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./savennext.css";
import DeleteIcon from "../../../../assets/images/delete.png";
import { handleIssuedMaterialModal, handleShowImgListPopUp } from '../../../../redux/slices/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { startWorking, updateWorkingData, addBulkMaterialRows, saveJob, saveAndNew, resetJobCounter, cancelJobEdit, testAction } from '../../../../redux/slices/jobSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from "@mui/icons-material/Save";
import { Tooltip, Button, Avatar, useTheme } from '@mui/material';
import MountGrid from './MountGrid';
import IssuedMaterial from './IssuedMaterial';
import { brandMainData, categorymainData, collectionMainData, genderMainData, occasionMainData, productTypeMainData, styleMainData, subCategoryMainData } from '../../../../master/MasterData';
import MaterialDetailsModal from '../../../../ShortcutComponent/stockPurchase/MaterialDetailsModal';
import { materialConfigs } from '../../../../ShortcutComponent/stockPurchase/MaterialDetailsConfig';
import MarkupModal from '../../../../ShortcutComponent/stockPurchase/MarkupModal';
import AltReceiveTimeModal from '../../../../ShortcutComponent/stockPurchase/AltReceiveTimeModal';
import ChangeCriteriaModal from '../../../../ShortcutComponent/stockPurchase/ChangeCriteriaModal';
import GroupedTableSection from '../../../../ShortcutComponent/stockPurchase/GroupedTableSection';
import PrimaryDetails from '../../../../ShortcutComponent/stockPurchase/PrimaryDetails';
import RemarkModal from '../../../../ShortcutComponent/stockPurchase/RemarkModal';
import MaterialInfo from './selectedJobDetail/MaterialInfo';
import { mapMultipleIssuedToMaterialDetails } from '../../../../Utils/materialDataMapper';

const SaveNNext = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const mode = useSelector(state => state?.fgp?.mode);
  const mountModal = useSelector(state => state?.home?.mountModal);
  const issuedMaterialModal = useSelector(state => state?.home?.issuedMaterialModal);
  const uploadImage = useSelector(state => state?.home?.uploadImage);
  const subTagUploadImages = useSelector(state => state?.home?.subTagUploadImages);
  const jobState = useSelector(state => state?.job);
  const primaryDetailsRef = useRef(null);

  // Get current job info for sub-tag mode
  const currentJobInfo = jobState?.formData?.mode === 'subtag' && jobState?.formData?.pendingJobs?.length > 1 ? {
    isSubTagMode: true,
    currentJobIndex: jobState?.workingArea?.currentJobIndex || 0,
    totalJobs: jobState?.formData?.pendingJobs?.length || 1,
    currentTagData: jobState?.formData?.pendingJobs?.[jobState?.workingArea?.currentJobIndex || 0]?.tagData || {},
    isSubTag: jobState?.formData?.pendingJobs?.[jobState?.workingArea?.currentJobIndex || 0]?.isSubTag || false
  } : {
    isSubTagMode: false,
    currentJobIndex: 0,
    totalJobs: 1,
    currentTagData: jobState?.formData?.mainTagData || {},
    isSubTag: false
  };

  console.log("currentJobInfo", currentJobInfo)

  useEffect(() => {
    dispatch(testAction('Redux connection test successful!'));
    if (jobState?.jobCounter > 0 && jobState?.createdJobs?.length === 0) {
      dispatch(resetJobCounter());
    }
    dispatch(startWorking());
  }, []);

  useEffect(() => {
    if (jobState?.selectedJobFromList) {
      console.log('🟢 SaveNNext - EDIT MODE - Job:', jobState.selectedJobFromList);
    }
  }, [jobState?.selectedJobFromList]);

  useEffect(() => {
    if (jobState?.formData?.hasFormData && primaryDetailsRef.current) {
      setTimeout(() => {
        primaryDetailsRef.current.focusHSN();
      }, 100);
    }
  }, [jobState?.formData?.hasFormData]);

  const [markUpModal, setMarkUpModal] = useState(false);
  const [addMoreMaterial, setAddMoreMaterial] = useState(false);
  const [remarkModal, setRemarkModal] = useState(false);
  const [saveRemark, setSaveRemark] = useState('');
  // Separate remark states for main and sub tag
  const [subTagRemarkModal, setSubTagRemarkModal] = useState(false);
  const [addDiaInfoPopUp, setAddDiaInfoPopUp] = useState(false);
  const diamond_Focus = useRef();
  const [addCSInfoPopUp, setAddCSInfoPopUp] = useState(false);
  const colorstone_focus = useRef();
  const csWtFocus = useRef();
  const [addMiscInfoPopUp, setAddMiscInfoPopUp] = useState(false);
  const misc_focus = useRef();
  const miscWtFocus = useRef();
  const [addFindingInfoPopUp, setAddFindingInfoPopUp] = useState(false);
  const findingWtFocus = useRef();
  const finding_focus = useRef();
  const [materialDetails, setMaterialDetails] = useState({});
  const [showTableEntry, setShowTableEntry] = useState(false);
  const [changeCriteria, setChangeCriteria] = useState(false);
  const [altReceiveTimeHide, setAltReceiveTimeHide] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMaterialContext, setCurrentMaterialContext] = useState({ type: '', isSubTag: false });
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

  const handleSubTagAddRemark = () => {
    setSubTagRemarkModal(true);
  }

  const handleRemarkChange = (e) => {
    setSaveRemark(e.target.value);
  }

  const handleSaveRemark = () => {
    if (saveRemark) {
      setRemarkModal(false);
    }
  }

  // Save & Print Handler (saves job and prints)
  const handleSaveJob = () => {
    const isEditing = jobState?.selectedJobFromList;
    console.log(`💾 SaveNNext - ${isEditing ? 'Update & Print' : 'Save & Print'} clicked`);

    // Validate sub-tag data if in sub-tag mode
    if (jobState?.formData?.mode === 'subtag') {
      const mainHasData = Object.values(jobState?.workingArea?.materialDetails || {}).some(value => value && value.trim() !== '');
      const subHasData = Object.values(jobState?.workingArea?.subTagMaterialDetails || {}).some(value => value && value.trim() !== '');

      if (!mainHasData || !subHasData) {
        alert('Please fill both Main Tag and Sub Tag data before saving.');
        return;
      }
    }

    dispatch(saveJob({
      customer: 'Test Customer'
    }));
  };

  // Save & New Handler  
  const handleSaveAndNewJob = () => {
    const isEditing = jobState?.selectedJobFromList;
    console.log(`💾 SaveNNext - ${isEditing ? 'Save & Update' : 'Save & New'} clicked`);
    if (jobState?.formData?.mode === 'subtag') {
      const mainHasData = Object.values(jobState?.workingArea?.materialDetails || {})?.some(value => value && value.trim() !== '');
      const subHasData = Object.values(jobState?.workingArea?.subTagMaterialDetails || {})?.some(value => value && value.trim() !== '');

      if (!mainHasData || !subHasData) {
        alert('Please fill both Main Tag and Sub Tag data before saving.');
        return;
      }
    }
    dispatch(saveAndNew({
      customer: 'Test Customer 2'
    }));
    setTimeout(() => {
      if (primaryDetailsRef.current) {
        primaryDetailsRef.current.focusHSN();
      }
    }, 100);
  };

  // Cancel Handler - cancels job editing and clears form
  const handleCancelJob = () => {
    const isEditing = jobState?.selectedJobFromList;
    console.log(`❌ SaveNNext - Cancel ${isEditing ? 'Edit' : 'Job'} clicked`);
    
    // Dispatch cancel action to reset state
    dispatch(cancelJobEdit());
  };

  const handleEnterKeyChange = useCallback((e, args, isSubTag = false) => {
    if (e?.key?.toLowerCase() === "enter") {
      if (args === 'diawt') {
        setAddDiaInfoPopUp(true);
        setCurrentMaterialContext({ type: 'diamond', isSubTag });
      }
      if (args === 'cswt') {
        setAddCSInfoPopUp(true);
        setCurrentMaterialContext({ type: 'colorstone', isSubTag });
      }
      if (args === 'miscwt') {
        setAddMiscInfoPopUp(true);
        setCurrentMaterialContext({ type: 'misc', isSubTag });
      }
      if (args === 'finewt') {
        setAddFindingInfoPopUp(true);
        setCurrentMaterialContext({ type: 'finding', isSubTag });
      }
    }
  }, [addDiaInfoPopUp, addCSInfoPopUp, addMiscInfoPopUp, addFindingInfoPopUp]);

  // Redux-based material details change handler
  const handleFilterChange = (field, value, isSubTag = false) => {
    dispatch(updateWorkingData({
      type: 'materialDetails',
      payload: { field, value, isSubTag }
    }));
  };

  const handleCriteriaChange = (field, value) => {
    setMaterialDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleDiamondInputChange = (e, rowIndex) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    dispatch(updateWorkingData({
      type: 'materialRow',
      payload: {
        materialType: 'diamond',
        index: rowIndex,
        field: name,
        value: finalValue,
        isSubTag: currentMaterialContext.isSubTag
      }
    }));
  };

  const handleAddRow = () => {
    const diamondRows = jobState?.workingArea?.materials?.diamond || [];
    const lastRow = diamondRows[diamondRows.length - 1];
    const keysToIgnore = ['onPcs'];
    const isLastRowValid = Object.entries(lastRow)
      .filter(([key]) => !keysToIgnore.includes(key))
      .every(([, value]) => value !== '');

    if (!isLastRowValid) {
      alert('Please fill out all required fields in the last row before adding a new one.');
      return;
    }

    dispatch(updateWorkingData({
      type: 'addRow',
      payload: { materialType: 'diamond', isSubTag: currentMaterialContext.isSubTag }
    }));
  };

  const handleDIamondsKeyDown = (e) => {
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
  }

  const handleSaveColorstoneDetails = () => {
    setAddCSInfoPopUp(false);
  }

  const handleColorstoneInputChange = (e, rowIndex) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    dispatch(updateWorkingData({
      type: 'materialRow',
      payload: {
        materialType: 'colorstone',
        index: rowIndex,
        field: name,
        value: finalValue,
        isSubTag: currentMaterialContext.isSubTag
      }
    }));
  };

  // Add a new row
  const handleCSAddRow = () => {
    const colorstoneRows = jobState?.workingArea?.materials?.colorstone || [];
    const lastRow = colorstoneRows[colorstoneRows.length - 1];
    const keysToIgnore = ['onPcs'];
    const isLastRowValid = Object.entries(lastRow)
      .filter(([key]) => !keysToIgnore.includes(key))
      .every(([, value]) => value !== '');

    if (!isLastRowValid) {
      alert('Please fill out all required fields in the last row before adding a new one.');
      return;
    }

    dispatch(updateWorkingData({
      type: 'addRow',
      payload: { materialType: 'colorstone', isSubTag: currentMaterialContext.isSubTag }
    }));
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
  }

  const handleMiscInputChange = (e, rowIndex) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    dispatch(updateWorkingData({
      type: 'materialRow',
      payload: {
        materialType: 'misc',
        index: rowIndex,
        field: name,
        value: finalValue,
        isSubTag: currentMaterialContext.isSubTag
      }
    }));
  };

  const handleMiscAddRow = () => {
    const miscRows = jobState?.workingArea?.materials?.misc || [];
    const lastRow = miscRows[miscRows?.length - 1];
    const keysToIgnore = ['onPcs'];
    const isLastRowValid = Object.entries(lastRow)
      .filter(([key]) => !keysToIgnore.includes(key))
      .every(([, value]) => value !== '');

    if (!isLastRowValid) {
      alert('Please fill out all required fields in the last row before adding a new one.');
      return;
    }

    dispatch(updateWorkingData({
      type: 'addRow',
      payload: { materialType: 'misc', isSubTag: currentMaterialContext.isSubTag }
    }));
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
  }

  const handleFindingInputChange = (e, rowIndex) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    dispatch(updateWorkingData({
      type: 'materialRow',
      payload: {
        materialType: 'finding',
        index: rowIndex,
        field: name,
        value: finalValue,
        isSubTag: currentMaterialContext.isSubTag
      }
    }));
  };

  // Add a new row
  const handleFindingAddRow = () => {
    const findingRows = jobState?.workingArea?.materials?.finding || [];
    const lastRow = findingRows[findingRows?.length - 1];
    const keysToIgnore = ['onPcs'];
    const isLastRowValid = Object.entries(lastRow)
      .filter(([key]) => !keysToIgnore.includes(key))
      .every(([, value]) => value !== '');
    if (!isLastRowValid) {
      alert('Please fill out all required fields in the last row before adding a new one.');
      return;
    }

    dispatch(updateWorkingData({
      type: 'addRow',
      payload: { materialType: 'finding', isSubTag: currentMaterialContext.isSubTag }
    }));
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

  // Delete functions for each material type
  const handleDeleteDiamondRow = (index) => {
    dispatch(updateWorkingData({
      type: 'deleteRow',
      payload: { materialType: 'diamond', index }
    }));
  };

  const handleDeleteCsRow = (index) => {
    dispatch(updateWorkingData({
      type: 'deleteRow',
      payload: { materialType: 'colorstone', index }
    }));
  };

  const handleDeleteMiscRow = (index) => {
    dispatch(updateWorkingData({
      type: 'deleteRow',
      payload: { materialType: 'misc', index }
    }));
  };

  const handleDeleteFindingRow = (index) => {
    dispatch(updateWorkingData({
      type: 'deleteRow',
      payload: { materialType: 'finding', index }
    }));
  };

  const handleReceivedMaterialData = (receivedData) => {
    const { diamond, colorstone, misc, finding } = receivedData;
    const isSubTag = currentMaterialContext.isSubTag;

    if (diamond && diamond.length > 0) {
      const mappedDiamondData = mapMultipleIssuedToMaterialDetails(diamond, 'diamond');

      dispatch(addBulkMaterialRows({
        materialType: 'diamond',
        rows: mappedDiamondData,
        isSubTag: isSubTag
      }));

      if ((!colorstone || colorstone.length === 0) &&
        (!misc || misc.length === 0) && (!finding || finding.length === 0))
        setTimeout(() => setAddDiaInfoPopUp(true), 100);
    }

    if (colorstone && colorstone.length > 0) {
      const mappedColorstoneData = mapMultipleIssuedToMaterialDetails(colorstone, 'colorstone');
      dispatch(addBulkMaterialRows({
        materialType: 'colorstone',
        rows: mappedColorstoneData,
        isSubTag: isSubTag
      }));

      if (!diamond || diamond.length === 0) {
        setTimeout(() => setAddCSInfoPopUp(true), 100);
      }
    }

    if (misc && misc.length > 0) {
      const mappedMiscData = mapMultipleIssuedToMaterialDetails(misc, 'misc');
      dispatch(addBulkMaterialRows({
        materialType: 'misc',
        rows: mappedMiscData,
        isSubTag: isSubTag
      }));

      if ((!diamond || diamond.length === 0) && (!colorstone || colorstone.length === 0)) {
        setTimeout(() => setAddMiscInfoPopUp(true), 100);
      }
    }

    if (finding && finding.length > 0) {
      const mappedFindingData = mapMultipleIssuedToMaterialDetails(finding, 'finding');
      dispatch(addBulkMaterialRows({
        materialType: 'finding',
        rows: mappedFindingData,
        isSubTag: isSubTag
      }));

      if ((!diamond || diamond.length === 0) &&
        (!colorstone || colorstone.length === 0) &&
        (!misc || misc.length === 0)) {
        setTimeout(() => setAddFindingInfoPopUp(true), 100);
      }
    }
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  const renderFilePreview = (file, index) => {
    return (
      <Avatar
        src={URL.createObjectURL(file)}
        key={index}
        sx={{
          height: hoveredIndex === index ? 42 : 39,
          width: hoveredIndex === index ? 42 : 39,
          transition: "transform 0.2s ease, height 0.2s ease, width 0.2s ease",
          cursor: "pointer",
          border: hoveredIndex === index ? "2px solid grey !important" : "1px solid #989898",
        }}
        onClick={() => {
          setHoveredIndex(null);
          dispatch(handleShowImgListPopUp(true));
        }}
        onMouseEnter={() => {
          setHoveredIndex(index);
        }}
        onMouseLeave={() => {
          setHoveredIndex(null);
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

        {/* Job Line - Main Tag */}
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
          materialDetails={jobState?.workingArea?.materialDetails || {}}
          calculations={jobState?.workingArea?.calculations || {}}
          diamondRows={jobState?.workingArea?.materials?.diamond || []}
          colorstoneRows={jobState?.workingArea?.materials?.colorstone || []}
          miscRows={jobState?.workingArea?.materials?.misc || []}
          findingRows={jobState?.workingArea?.materials?.finding || []}
          currentJob={jobState?.selectedJobFromList ?
            jobState?.createdJobs?.find(job => job.jobNo === jobState.selectedJobFromList) : null}
          isSubTag={false}
          setCurrentMaterialContext={setCurrentMaterialContext}
        />

        <PrimaryDetails
          ref={primaryDetailsRef}
          mode={mode}
          values={jobState?.workingArea?.materialDetails || {}}
          subTagValues={jobState?.workingArea?.subTagMaterialDetails || {}}
          materials={jobState?.workingArea?.materials || {}}
          subTagMaterials={jobState?.workingArea?.subTagMaterials || {}}
          onChange={handleFilterChange}
          showSubTag={jobState?.formData?.mode === 'subtag'}
          setChangeCriteria={setChangeCriteria}
          handleEnterKeyChange={handleEnterKeyChange}
          csWtFocus={csWtFocus}
          miscWtFocus={miscWtFocus}
          findingWtFocus={findingWtFocus}
          // MaterialInfo props for subtag
          theme={theme}
          showTableEntry={showTableEntry}
          setShowTableEntry={setShowTableEntry}
          handleAddRemark={handleAddRemark}
          handleSubTagAddRemark={handleSubTagAddRemark}
          subTagUploadImages={subTagUploadImages || []}
          renderFilePreview={renderFilePreview}
          subTagMaterialDetails={jobState?.workingArea?.subTagMaterialDetails || {}}
          subTagCalculations={jobState?.workingArea?.subTagCalculations || {}}
          // InfoOutlinedIcon props
          onMainInfoIconClick={() => {
            setCurrentMaterialContext({ type: 'main', isSubTag: false });
            dispatch(handleIssuedMaterialModal(true));
          }}
          onSubTagInfoIconClick={() => {
            setCurrentMaterialContext({ type: 'sub', isSubTag: true });
            dispatch(handleIssuedMaterialModal(true));
          }}
          dispatch={dispatch}
          // Material context props
          setCurrentMaterialContext={setCurrentMaterialContext}
        />
        <div>
          {
            1 && <>
              <div className='d-flex justify-content-between align-items-center mb-2 pt-3'>
                {<h5 className='ps-2 mb-0'>{showTableEntry && ""}</h5>}
              </div>
              {mountModal && <MountGrid />}
              {issuedMaterialModal && <IssuedMaterial onReceiveData={handleReceivedMaterialData} />}

              {showTableEntry && (
                <>
                  {/* Show Main Tag Material Details Table only when context is main */}
                  {!currentMaterialContext.isSubTag && (
                    <div className='mb-3'>
                      <h6 className="ps-2 mb-2" style={{ color: theme?.palette?.customColors?.primary }}>
                        📋 Main Tag Material Details
                      </h6>
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
                            <GroupedTableSection title="💎 Diamond Rows" rows={jobState?.workingArea?.materials?.diamond || []} type="diamond" mode={mode} onDelete={handleDeleteDiamondRow} />
                            <GroupedTableSection title="🔷 CS Stone Rows" rows={jobState?.workingArea?.materials?.colorstone || []} type="cs" mode={mode} onDelete={handleDeleteCsRow} />
                            <GroupedTableSection title="🛠 Misc Rows" rows={jobState?.workingArea?.materials?.misc || []} type="misc" mode={mode} onDelete={handleDeleteMiscRow} />
                            <GroupedTableSection title="🔗 Finding Rows" rows={jobState?.workingArea?.materials?.finding || []} type="finding" mode={mode} onDelete={handleDeleteFindingRow} />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Show Sub Tag Material Details Table only when context is sub tag */}
                  {currentMaterialContext.isSubTag && jobState?.formData?.mode === 'subtag' && (
                    <div className='mb-3'>
                      <h6 className="ps-2 mb-2" style={{ color: theme?.palette?.customColors?.primary }}>
                        Sub Tag Material Details
                      </h6>
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
                            <GroupedTableSection title="💎 Diamond Rows" rows={jobState?.workingArea?.subTagMaterials?.diamond || []} type="diamond" mode={mode} onDelete={handleDeleteDiamondRow} />
                            <GroupedTableSection title="🔷 CS Stone Rows" rows={jobState?.workingArea?.subTagMaterials?.colorstone || []} type="cs" mode={mode} onDelete={handleDeleteCsRow} />
                            <GroupedTableSection title="🛠 Misc Rows" rows={jobState?.workingArea?.subTagMaterials?.misc || []} type="misc" mode={mode} onDelete={handleDeleteMiscRow} />
                            <GroupedTableSection title="🔗 Finding Rows" rows={jobState?.workingArea?.subTagMaterials?.finding || []} type="finding" mode={mode} onDelete={handleDeleteFindingRow} />
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </>
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
                    rows={currentMaterialContext.isSubTag ? 
                      (jobState?.workingArea?.subTagMaterials?.diamond || []) : 
                      (jobState?.workingArea?.materials?.diamond || [])}
                    onInputChange={handleDiamondInputChange}
                    onAddRow={handleAddRow}
                    onSave={handleSaveDiamondDetails}
                    onKeyDown={handleDIamondsKeyDown}
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
                    rows={currentMaterialContext.isSubTag ? 
                      (jobState?.workingArea?.subTagMaterials?.colorstone || []) : 
                      (jobState?.workingArea?.materials?.colorstone || [])}
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
                    rows={currentMaterialContext.isSubTag ? 
                      (jobState?.workingArea?.subTagMaterials?.misc || []) : 
                      (jobState?.workingArea?.materials?.misc || [])}
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
                    rows={currentMaterialContext.isSubTag ? 
                      (jobState?.workingArea?.subTagMaterials?.finding || []) : 
                      (jobState?.workingArea?.materials?.finding || [])}
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
              <Button variant='contained' className='fs_fgp' size='small' sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }} style={{ minWidth: '100px' }} onClick={handleSaveAndNewJob}>
                {jobState?.selectedJobFromList ? 'Save & Update' :
                  jobState?.formData?.mode === 'subtag' ? 'Save Both Jobs & New' : 'Save & New'}
              </Button>
            </div>
            <div className="m-1">
              <Button variant='contained' className='fs_fgp' size='small' sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }} style={{ minWidth: '100px' }} onClick={handleSaveJob}>
                {jobState?.selectedJobFromList ? 'Update & Print' :
                  jobState?.formData?.mode === 'subtag' ? 'Save Both Jobs & Print' : 'Save & Print'}
              </Button>
            </div>
            <div className="m-1">
              <Button variant='outlined' className='fs_fgp' size='small' sx={{ borderColor: theme?.palette?.customColors?.purple, color: theme?.palette?.customColors?.purple }} style={{ minWidth: '100px' }} onClick={handleCancelJob}>
                Cancel
              </Button>
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