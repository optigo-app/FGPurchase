import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./savennext.css";
// import  DeleteIcon  from '@mui/icons-material/Delete';
import DeleteIcon from "../../../../assets/images/delete.png";
import  SettingsIcon  from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { handleIssuedMaterialModal, handleMountModal, handleSaveAndNextFlag , handleSelectedButton, handleShowImgListPopUp } from '../../../../redux/slices/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  EditIcon  from '@mui/icons-material/Edit';
import SaveIcon from "@mui/icons-material/Save";
import { Tooltip, Modal, Box, Button, Typography, IconButton, Icon, AvatarGroup, Avatar, useTheme } from '@mui/material';
import FileUploaderMultiple from './FileUploaderMultiple';
import CancelIcon from '@mui/icons-material/Cancel';
import MountGrid from './MountGrid';
import IssuedMaterial from './IssuedMaterial';
import Snackbar from '@mui/material/Snackbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { Trash } from 'tabler-icons-react'; 
import { brandMainData, categorymainData, collectionMainData, genderMainData, occasionMainData, productTypeMainData, styleMainData, subCategoryMainData } from '../../../../master/MasterData';
import InfoIcon from '@mui/icons-material/Info';
import Grid4x4SharpIcon from '@mui/icons-material/Grid4x4Sharp';
import imgShow from '../../../../assets/images/projectlogo.png';
const SaveNNext = () => {
  const dispatch = useDispatch();
  const mode = useSelector(state => state?.fgp?.mode);
  const mountModal = useSelector(state => state?.home?.mountModal);
  const selectedTabValue = useSelector(state => state?.home?.selectedTabValue);
  const addSubTag = useSelector(state => state?.home?.addSubtag);
  const showImgListPopUp = useSelector(state => state?.home?.showImgListPopUp);

  const issuedMaterialModal = useSelector(state => state?.home?.issuedMaterialModal);
  const uploadImage = useSelector(state => state?.home?.uploadImage);
  
  const [materialSelectedValue, setMaterialSelectedValue] = useState('diamond');
  const [showUpdateFields, setShowUpdateFields] = useState(false);
  const [markUpModal, setMarkUpModal] = useState(false);

  const [addMoreMaterial, setAddMoreMaterial] = useState(false);

  //remark variables
  const [remarkModal, setRemarkModal] = useState(false);
  const [saveRemark, setSaveRemark] = useState('');


  //add diamond details pop up
  const [addDiaInfoPopUp, setAddDiaInfoPopUp] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addDiamondRows, setAddDiamondRows] = useState([
    // Default row
    {
      material:'',
      type: '',
      shape: '',
      clarity:'',
      color:'',
      size:'',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
      onPcs:null,
      addInGrossWt:null,
      tunch:0,
      wastage:0
    },
  ]);
  const diamond_Focus = useRef();

  //add colorstone details pop up
  const [addCSInfoPopUp, setAddCSInfoPopUp] = useState(false);
  const [addCsRows, setAddCSRows] = useState([
    {
      material:'',
      type: '',
      shape: '',
      clarity:'',
      color:'',
      size:'',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
      onPcs:null,
      addInGrossWt:null,
      tunch:0,
      wastage:0
    },
  ]);
  const [isColorStoneAdding, setIsColorStoneAdding] = useState(false);
  const colorstone_focus = useRef();
  const csWtFocus = useRef();

  //add misc details pop up
  const [addMiscInfoPopUp, setAddMiscInfoPopUp] = useState(false);
  const [addMiscRows, setAddMiscRows] = useState([
    {
      material:'',
      type: '',
      shape: '',
      clarity:'',
      color:'',
      size:'',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
      onPcs:null,
      addInGrossWt:null,
      tunch:0,
      wastage:0
    },
  ]);
  const [isMiscAdding, setMiscAdding] = useState(false);
  const misc_focus = useRef();
  const miscWtFocus = useRef();


  //add finding details pop up
  const [addFindingInfoPopUp, setAddFindingInfoPopUp] = useState(false);
  const [addFindingRows, setAddFindingRows] = useState([
    {
      material:'',
      type: '',
      shape: '',
      clarity:'',
      color:'',
      size:'',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
      onPcs:null,
      addInGrossWt:null,
      tunch:0,
      wastage:0
    },
  ]);
  const [isFindingAdding, setFindingAdding] = useState(false);

   
  const findingWtFocus = useRef();
  const finding_focus = useRef();



  const [showTableEntry, setShowTableEntry] = useState(false);
  const [showDiarows, setShowDiaRows] = useState(null);
  const [showCSrows, setShowCSRows] = useState(null);
  const [showMiscrows, setShowMiscRows] = useState(null);
  const [showFindingrows, setShowFindingRows] = useState(null);


  //Change Criteria logic
  const [changeCriteria, setChangeCriteria] = useState(false);

  //alt receive time hide logic
  const [altReceiveTimeHide, setAltReceiveTimeHide] = useState(false);


  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState({
    type: "D",
    criteria: "RND",
    pcs:"25",
    wt:"1.235",
    pcsWt: "25/1.255",
    supplier: "Company",
    rate: "12000",
    amount: "27000",
  });

  const handleMaterialSelection = (e) => {
    setMaterialSelectedValue(e.target.value);
    console.log(e.target.value);
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    console.log("Updated Row Data:", rowData);
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


  //add remark logic
  const handleAddRemark = () => {
    setRemarkModal(true);
  }
  const handleRemarkChange = (e) => {
    setSaveRemark(e.target.value);
    
  }
  const handleSaveRemark = () => {
      if(saveRemark){
        console.log(saveRemark);
        setRemarkModal(false);
      }
  }
  





  //diamond, cs, misc, finding logic of pop up
  const handleEnterKeyChange = useCallback((e, args) => {
    
    if (e?.key?.toLowerCase() === "enter") {
      
      if(args === 'diamond'){
        setAddDiaInfoPopUp(true);
        // setIsAdding(true);
      }
      if(args === 'colorstone'){
        setAddCSInfoPopUp(true);
        // setIsColorStoneAdding(true);
      }
      if(args === 'misc'){
        setAddMiscInfoPopUp(true);
        // setMiscAdding(true);
      }
      if(args === 'finding'){
        setAddFindingInfoPopUp(true);
        // setIsF(true);
      }
    }

  }, [addDiaInfoPopUp, addCSInfoPopUp, addMiscInfoPopUp, addFindingInfoPopUp]);

  const handleCloseModal = () => {
    setAddDiaInfoPopUp(false);
    setAddCSInfoPopUp(false);
    setAddMiscInfoPopUp(false);
    setAddFindingInfoPopUp(false);
  };


  

  //add diamond pop up logic
  const handleDiamondInputChange = (e, rowIndex) => {
    // const { name, value } = e.target;
    // const updatedRows = [...addDiamondRows];
    // updatedRows[rowIndex][name] = value;
    // setAddDiamondRows(updatedRows);
    const { name, value, type, checked } = e.target;
    const updatedRows = [...addDiamondRows];
  
    // Use `checked` for checkboxes, `value` for other inputs
    updatedRows[rowIndex][name] = type === "checkbox" ? checked : value;
  
    setAddDiamondRows(updatedRows);
  };
    // // Add a new row
    // const handleAddRow = () => {
    //   setAddDiamondRows([
    //     ...addDiamondRows,
    //     {
    //       type: '',
    //       criteria: '',
    //       pcs: '',
    //       wt: '',
    //       supplier: '',
    //       rate: '',
    //       amount: '',
    //     },
    //   ]);
    // };
    const handleAddRow = () => {
      // Get the last row
      const lastRow = addDiamondRows[addDiamondRows.length - 1];
    
      // Keys to ignore during validation
      const keysToIgnore = ['onPcs'];
    
      // Validate only the fields not in keysToIgnore
      const isLastRowValid = Object.entries(lastRow)
        .filter(([key]) => !keysToIgnore.includes(key)) // Exclude ignored keys
        .every(([, value]) => value !== ''); // Check remaining fields
    
      if (!isLastRowValid) {
        alert('Please fill out all required fields in the last row before adding a new one.');
        return; // Stop adding a new row
      }
    
      // Add a new row if validation passes
      setAddDiamondRows([
        ...addDiamondRows,
        {
          material:'',
          type: '',
          shape: '',
          clarity:'',
          color:'',
          size:'',
          pcs: '',
          wt: '',
          supplier: '',
          rate: '',
          amount: '',
          onPcs:false,
          addInGrossWt:null,
          tunch:0,
          wastage:0
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
    console.log(addDiamondRows);
    setAddDiaInfoPopUp(false);

    const hasValidDiamondData = isTableDataValid(addDiamondRows);
    setShowDiaRows(hasValidDiamondData);
  }







//add colorstone pop up logic
  const handleSaveColorstoneDetails = () => {
    console.log(addCsRows);
    setAddCSInfoPopUp(false);
    const hasValidCsData = isTableDataValid(addCsRows);
    setShowCSRows(hasValidCsData);
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
    
        // Keys to ignore during validation
        const keysToIgnore = ['onPcs'];
      
        // Validate only the fields not in keysToIgnore
        const isLastRowValid = Object.entries(lastRow)
          .filter(([key]) => !keysToIgnore.includes(key)) // Exclude ignored keys
          .every(([, value]) => value !== ''); // Check remaining fields
      
        if (!isLastRowValid) {
          alert('Please fill out all required fields in the last row before adding a new one.');
          return; // Stop adding a new row
        }
      
        // Add a new row if validation passes
        setAddCSRows([
          ...addCsRows,
          {
            material:'',
            type: '',
            shape: '',
            clarity:'',
            color:'',
            size:'',
            pcs: '',
            wt: '',
            supplier: '',
            rate: '',
            amount: '',
            onPcs:false,
            addInGrossWt:null,
            tunch:0,
            wastage:0
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
    console.log(addCsRows);
    setAddMiscInfoPopUp(false);
    const hasValidMiscData = isTableDataValid(addMiscRows);
    setShowMiscRows(hasValidMiscData);
  }
  const handleMiscInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...addMiscRows];
    updatedRows[rowIndex][name] = value;
    setAddMiscRows(updatedRows);
  };
      // Add a new row
      const handleMiscAddRow = () => {
        const lastRow = addMiscRows[addMiscRows?.length - 1];
    
        // Keys to ignore during validation
        const keysToIgnore = ['onPcs'];
      
        // Validate only the fields not in keysToIgnore
        const isLastRowValid = Object.entries(lastRow)
          .filter(([key]) => !keysToIgnore.includes(key)) // Exclude ignored keys
          .every(([, value]) => value !== ''); // Check remaining fields
      
        if (!isLastRowValid) {
          alert('Please fill out all required fields in the last row before adding a new one.');
          return; // Stop adding a new row
        }
      
        // Add a new row if validation passes
        setAddMiscRows([
          ...addMiscRows,
          {
            material:'',
            type: '',
            shape: '',
            clarity:'',
            color:'',
            size:'',
            pcs: '',
            wt: '',
            supplier: '',
            rate: '',
            amount: '',
            onPcs:false,
            addInGrossWt:false,
            tunch:0,
            wastage:0
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
    console.log(addFindingRows);
    setAddFindingInfoPopUp(false);

    const hasValidFindingData = isTableDataValid(addFindingRows);
    setShowFindingRows(hasValidFindingData);

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
    
        // Keys to ignore during validation
        const keysToIgnore = ['onPcs'];
      
        // Validate only the fields not in keysToIgnore
        const isLastRowValid = Object.entries(lastRow)
          .filter(([key]) => !keysToIgnore.includes(key)) // Exclude ignored keys
          .every(([, value]) => value !== ''); // Check remaining fields
      
        if (!isLastRowValid) {
          alert('Please fill out all required fields in the last row before adding a new one.');
          return; // Stop adding a new row
        }
      
        // Add a new row if validation passes
        setAddFindingRows([
          ...addFindingRows,
          {
            material:'',
            type: '',
            shape: '',
            clarity:'',
            color:'',
            size:'',
            pcs: '',
            wt: '',
            supplier: '',
            rate: '',
            amount: '',
            onPcs:false,
            addInGrossWt:null,
            tunch:0,
            wastage:0
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

const handleTableToggle = () => {
  // Check if any row in each category (diamond, CS, misc, and finding) has valid data
  const hasValidDiamondData = isTableDataValid(addDiamondRows);
  setShowDiaRows(hasValidDiamondData);
  const hasValidCsData = isTableDataValid(addCsRows);
  setShowCSRows(hasValidCsData);
  const hasValidMiscData = isTableDataValid(addMiscRows);
  setShowMiscRows(hasValidMiscData);
  const hasValidFindingData = isTableDataValid(addFindingRows);
  setShowFindingRows(hasValidFindingData);

  

  // Only show the table if at least one row from any category has valid data
  // setShowTableEntry(hasValidDiamondData || hasValidCsData || hasValidMiscData || hasValidFindingData);
};

const handleSaveAndNew = () => {
  
    if(selectedTabValue === 'neworder'){
      dispatch(handleSaveAndNextFlag(true));
    }else{
      dispatch(handleSaveAndNextFlag(false));
    }
  if(mode === "alteration_issue"){
    dispatch(handleSelectedButton("add"));
  }
  if(mode === "alteration_receive"){
    dispatch(handleSelectedButton("altjobs"));
  }
}

// const renderFilePreview = (file, index) => {
//   if (file.type.startsWith('image')) {
//     // return <img width={28} height={28} alt={file.name} src={URL.createObjectURL(file)} />
//     return <Avatar src={URL.createObjectURL(file)} sx={{height:28, width:28}} key={index} style={{cursor:'pointer', border:'1px solid #989898', }}  />
//   } else {
//   //   return <Icon icon='tabler:file-description' />
//     return ''
//   }
// }
const [hoveredIndex, setHoveredIndex] = React.useState(null);

const renderFilePreview = (file, index) => {
  // const [hoveredIndex, setHoveredIndex] = React.useState(null); // State to track hovered image
  

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
        console.log('clicked', index);
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
    // avatar.style.backgroundColor = 'red';
    // avatar.style.color = 'green';
    avatar.style.height = '28px !important';
    avatar.style.width = '28px !important';
    avatar.style.cursor = 'pointer !important';
  }
}, [uploadImage]);

const theme = useTheme();


  return (
    <>
    <div className='savennext_container'>
        <div>
          <h5 className='header_title_fgp fs_fgp'>Add Product Details</h5>
        </div>
        
      {/* Job Line */}
      <div className='d-flex justify-content-between align-items-center'>
      <div className="job-info fs_fgp">
        <div><span className='text_color'>Tag No:</span> <b className="text-dark">1/12566</b></div>
        <div><span className='text_color'>Net Wt:</span> <b className="text-dark">2.256 gm</b></div>
        <div><span className='text_color'>Pure Wt:</span> <b className="text-dark">1.256</b></div>
        <div><span className='text_color'>Dia:</span> <b className="text-dark">2.256 cts 12000 Amount</b></div>
        <div>
          <Tooltip title="Material Details" style={{cursor:'pointer'}}><Grid4x4SharpIcon  onClick={() => setShowTableEntry(!showTableEntry)} style={{color:theme?.palette?.customColors?.purple, cursor:'pointer'}} /></Tooltip>
        </div>
        { mode !== 'alteration_receive' && <div className=' '>
                <FileUploaderMultiple fs="30px" classApply="" style={{color:theme?.palette?.customColors?.purple}} />
        </div>}
        <div>
          {/* <Button size='small' color='warning' variant='outlined' onClick={() => handleAddRemark()}>Add Remark</Button> */}
          <Tooltip title="Add Remark"><NoteAltIcon  style={{cursor:'pointer', color:theme?.palette?.customColors?.purple}} onClick={() => handleAddRemark()} /></Tooltip>
          <>
          {
            remarkModal && 
            <Modal
              open={remarkModal}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
              onClose={() => setRemarkModal(false)}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    maxHeight: 400,
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    boxShadow: 24,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '215px',
                    border: 'none',
                  }}
                >
                  <div className='w-100 d-flex flex-column my-1'>
                    <div className='mb-3 d-flex align-items-center justify-content-between'><span></span><Tooltip title="Close"><span style={{cursor:'pointer'}} onClick={() => setRemarkModal(false)}><CancelIcon /></span></Tooltip></div>
                    <textarea placeholder='Enter Your Remark' rows={5} className='mb-2 textareadRemark_snv fs_fgp' onChange={(e) => handleRemarkChange(e)} ></textarea>
                    <Button className='fs_fgp' sx={{backgroundColor:theme?.palette?.customColors?.green, color:'white', fontWeight:'bold'}} variant='contained' size='small' onClick={() => handleSaveRemark()} >Save Remark</Button>
                  </div>
                </Box>

            </Modal>

          }
          </>
        </div>
        {/* <div className="filter-item d-flex justify-content-center align-items-center w-100"> */}
           { mode === 'alteration_receive' && <Tooltip title="More Details" style={{cursor:'pointer', marginLeft:'10px'}} color='primary' onClick={() => setAltReceiveTimeHide(true)}><InfoIcon style={{color:theme?.palette?.customColors?.purple, cursor:'pointer'}}  /></Tooltip>}
           { mode === 'alteration_receive' && <Tooltip title="Change Criteria" style={{cursor:'pointer', marginLeft:'10px'}} onClick={() => setChangeCriteria(true)}><SettingsIcon style={{color:theme?.palette?.customColors?.purple, cursor:'pointer'}}  /></Tooltip>}
        {/* </div> */}
      </div>
      {/* <div className='me-5 ps-5'><img src={imgShow} alt="#" style={{maxWidth:'50px', maxHeight:'50px', border:'1px solid #e8e8e8', padding:'5px', objectFit:'contain'}} /></div> */}
      <div className='me-5 ps-5' style={{marginBottom:'20px'}}>
        {/* <img src={imgShow} alt="#" style={{maxWidth:'50px', maxHeight:'50px', border:'1px solid #e8e8e8', padding:'5px', objectFit:'contain'}} /> */}
        <AvatarGroup className='pull-up snv_custom'>
          {
          // [
          //   { avatar: '/images/avatars/1.png', name: 'Vinnie Mostowy' },
          //   { avatar: '/images/avatars/2.png', name: 'Allen Rieske' },
          //   { avatar: '/images/avatars/3.png', name: 'Julee Rossignol' },
          //   { avatar: '/images/avatars/4.png', name: 'George Burrill' }
          // ]
          uploadImage?.map((file, index) => (
            renderFilePreview(file, index)
            // <CustomAvatar key={index} src={src} sx={{ height: 26, width: 26 }} />
            // <Avatar key={index} src={src} sx={{ height: 26, width: 26 }} />
          ))}
        </AvatarGroup>
      </div>
      </div>

      <div className="filters-container_sn fs_fgp">
        { mode !== 'alteration_receive' && <><div className="filter-item">
          <div>
            <label htmlFor="HSN" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>HSN</label>
            <input type="text" id="HSN" placeholder="HSN" autoFocus />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="refno" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Ref No.</label>
            <input type="text" id="refno" placeholder="Ref No" />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="ctype" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Cert. Type</label>
            <input type="text" id="ctype" placeholder="Certificate Type" />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="certno" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Cert. No.</label>
            <input type="text" placeholder="Certificate No." id='certno' />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="huid" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>HUID. No.</label>
            <input type="text" placeholder="HUID No" id='huid' />
          </div>
        </div>
        <div className="filter-item d-flex justify-content-center align-items-center w-100">
          <Tooltip title="Change Criteria" style={{cursor:'pointer', marginTop:'20px'}} onClick={() => setChangeCriteria(true)}><SettingsIcon style={{color:theme?.palette?.customColors?.purple, cursor:'pointer'}}  /></Tooltip>
        </div></>}
      </div>
      <div className="filters-container2 fs_fgp">
        { mode !== 'alteration_receive' && <div className="filter-item">
          <div>
            <label htmlFor="metaltype" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>MetalType</label>
            <input type="text" placeholder="Metal Type" id='metaltype' />
          </div>
        </div>}
        <div className="filter-item">
          <div>
            <label htmlFor="grosswt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>GrossWt</label>
            <input type="text" placeholder="Gross Wt" id='grosswt' />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="netwt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>NetWt</label>
            <input type="text" placeholder="NetWt" id='netwt' />
          </div>
        </div>
        <div className="filter-item">
        <div>
            <label htmlFor="tunch" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Tunch</label>
            <input type="text" placeholder="Tunch" id='tunch' />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="wastage" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Wastage</label>
            <input type="text" placeholder="Wastage" id='wastage' />
          </div>
        </div>
        <div className="filter-item">
          <div> 
            <label htmlFor="diawt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Dia. Wt</label>
            <input type="text" placeholder="Dia.Wt" id='diawt'  onKeyDown={(e) => handleEnterKeyChange(e, 'diamond')} />
          </div>
        </div>
        <div className="filter-item">
          <div> 
            <label htmlFor="cswt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Cs. Wt</label>
            <input type="text" placeholder="Cs.Wt" id='cswt' ref={csWtFocus} onKeyDown={(e) => handleEnterKeyChange(e, 'colorstone')} />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="miscwt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Misc. Wt</label>
            <input type="text" placeholder="Misc Wt" id='miscwt' ref={miscWtFocus}  onKeyDown={(e) => handleEnterKeyChange(e, 'misc')} />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="finewt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Finding. Wt</label>
            <input type="text" placeholder="Finding Wt" id='finewt' ref={findingWtFocus} onKeyDown={(e) => handleEnterKeyChange(e, 'finding')} />
          </div>
        </div>
        <div className="filter-item">
            <div>
            <label htmlFor="labour" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Labour</label>
              <input type="text" placeholder="Labour" id='labour' />
            </div>
          </div>
          <div className="filter-item">
            <div>
              <label htmlFor="saleslabour" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>SalesLabour</label>
              <input type="text" placeholder="SalesLabour" id='saleslabour' />
            </div>
          </div>
        
      </div>

        
        { addSubTag &&
          <>
          <hr />
            <div className="filters-container_sn fs_fgp">
        <div className="filter-item">
          <div>
            <label htmlFor="HSN" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>HSN</label>
            <input type="text" id="HSN" placeholder="HSN" autoFocus />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="refno" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Ref No.</label>
            <input type="text" id="refno" placeholder="Ref No" />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="ctype" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Cert. Type</label>
            <input type="text" id="ctype" placeholder="Certificate Type" />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="certno" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Cert. No.</label>
            <input type="text" placeholder="Certificate No." id='certno' />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="huid" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>HUID. No.</label>
            <input type="text" placeholder="HUID No" id='huid' />
          </div>
        </div>
        <div className="filter-item d-flex justify-content-center align-items-center w-100">
          <Tooltip title="Change Criteria" style={{cursor:'pointer', marginTop:'20px'}} onClick={() => setChangeCriteria(true)}><SettingsIcon style={{color:theme?.palette?.customColors?.purple, cursor:'pointer'}}  /></Tooltip>
        </div>
      </div>
      <div className="filters-container2 fs_fgp">
        <div className="filter-item">
          <div>
            <label htmlFor="metaltype" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>MetalType</label>
            <input type="text" placeholder="Metal Type" id='metaltype' />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="grosswt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>GrossWt</label>
            <input type="text" placeholder="Gross Wt" id='grosswt' />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="netwt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>NetWt</label>
            <input type="text" placeholder="NetWt" id='netwt' />
          </div>
        </div>
        <div className="filter-item">
        <div>
            <label htmlFor="tunch" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Tunch</label>
            <input type="text" placeholder="Tunch" id='tunch' />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="wastage" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Wastage</label>
            <input type="text" placeholder="Wastage" id='wastage' />
          </div>
        </div>
        <div className="filter-item">
          <div> 
            <label htmlFor="diawt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Dia. Wt</label>
            <input type="text" placeholder="Dia.Wt" id='diawt'  onKeyDown={(e) => handleEnterKeyChange(e, 'diamond')} />
          </div>
        </div>
        <div className="filter-item">
          <div> 
            <label htmlFor="cswt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Cs. Wt</label>
            <input type="text" placeholder="Cs.Wt" id='cswt' ref={csWtFocus} onKeyDown={(e) => handleEnterKeyChange(e, 'colorstone')} />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="miscwt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Misc. Wt</label>
            <input type="text" placeholder="Misc Wt" id='miscwt' ref={miscWtFocus}  onKeyDown={(e) => handleEnterKeyChange(e, 'misc')} />
          </div>
        </div>
        <div className="filter-item">
          <div>
            <label htmlFor="finewt" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Finding. Wt</label>
            <input type="text" placeholder="Finding Wt" id='finewt' ref={findingWtFocus} onKeyDown={(e) => handleEnterKeyChange(e, 'finding')} />
          </div>
        </div>
        <div className="filter-item">
            <div>
            <label htmlFor="labour" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Labour</label>
              <input type="text" placeholder="Labour" id='labour' />
            </div>
          </div>
          <div className="filter-item">
            <div>
              <label htmlFor="saleslabour" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>SalesLabour</label>
              <input type="text" placeholder="SalesLabour" id='saleslabour' />
            </div>
          </div>
        
      </div>
          </>
        }


      {/* { !addMoreMaterial && <div className='mt-3' onClick={() => setAddMoreMaterial(true)}><Button size='small' color='warning' variant='contained'>Add Material Details</Button></div>} */}

      <div>
        {
        //  addMoreMaterial && <>
         1 && <>
          <div className='d-flex justify-content-between align-items-center mb-2 pt-3'>
          {/* {  <h5 className='ps-2 mb-0'>{ showTableEntry && "Material Details"}</h5>} */}
          {  <h5 className='ps-2 mb-0'>{ showTableEntry && ""}</h5>}
          <div className='d-flex justify-content-between align-items-center'>
            {/* <div><Tooltip title="Mount"><button className='p-1 py-0 btn btn-secondary mx-1' onClick={() => dispatch(handleMountModal(true))} >M</button></Tooltip></div> */}
            <div><Tooltip title="Receive From Vendor"><button className='p-1 py-0 px-2 btn btn-primary mx-1' onClick={() => dispatch(handleIssuedMaterialModal(true))} >i</button></Tooltip></div>
          </div>
          { mountModal && <MountGrid /> }
          { issuedMaterialModal && <IssuedMaterial /> }
          </div>
          {/* <Button color='warning' size='small' variant='contained' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} className='fs_fgp' onClick={() => setShowTableEntry(!showTableEntry)}>Material Details</Button> */}
          {/* <Button color='warning' size='small' variant='contained' onClick={() => handleTableToggle()}>Table Entries</Button> */}
          { (showTableEntry) && <div className='w-100 d-flex justify-content-start align-items-center'>
              <table className='table tableCus fs_fgp' style={{width:'90%',  overflow:'auto'}}>
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
                    {/* <th>Mark Up</th> */}
                    <th>On Pcs</th>
                    <th>AddIn GrossWt</th>
                    <th>Update</th>
                    <th>{ mode === 'alteration_receive' ? 'Detach' : 'Remove'}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                   showDiarows && addDiamondRows?.map((e, i) => {
                      return <tr key={i}>
                          <td>{i+1}</td>
                          <td>{e?.type}</td>
                          <td>{e?.shape}</td>
                          <td>{e?.clarity}</td>
                          <td>{e?.color}</td>
                          <td>{e?.size}</td>
                          <td>{e?.pcs} / {e?.wt}</td>
                          <td>{e?.tunch} / {e?.wastage}</td>
                          <td>{e?.supplier}</td>
                          <td>{e?.rate}</td>
                          <td>{e?.amount}</td>
                          <td><input type="checkbox" style={{width:'50px'}} checked={e?.onPcs} /></td>
                          <td><input type="checkbox" style={{width:'50px'}} checked={e?.addInGrossWt} disabled /></td>
                          <td><EditIcon /></td>
                          <td>
                            { mode === 'alteration_receive' ? 
                                <IconButton size='small'>
                                  <Trash color='red' />
                                </IconButton>
                               : 
                              <img
                                src={DeleteIcon}
                                alt="#delete"
                                title="Delete"
                                style={{ height: '20px', width: '20px', cursor: 'pointer' }}
                              />}
                          </td>
                      </tr>
                    })
                  }
                  {
                    showCSrows && addCsRows?.map((e, i) => {
                      return <tr key={i}>
                          <td>{i+1}</td>
                          <td>{e?.type}</td>
                          <td>{e?.shape}</td>
                          <td>{e?.clarity}</td>
                          <td>{e?.color}</td>
                          <td>{e?.size}</td>
                          <td>{e?.pcs} / {e?.wt}</td>
                          <td>{e?.tunch} / {e?.wastage}</td>
                          <td>{e?.supplier}</td>
                          <td>{e?.rate}</td>
                          <td>{e?.amount}</td>
                          <td><input type="checkbox" style={{width:'50px'}} checked={e?.onPcs} /></td>
                          <td><input type="checkbox" style={{width:'50px'}} checked={e?.addInGrossWt} /></td>
                          <td><EditIcon /></td>
                          <td><img
                                src={DeleteIcon}
                                alt="#delete"
                                title="Delete"
                                style={{ height: '20px', width: '20px', cursor: 'pointer' }}/>
                          </td>
                      </tr>
                    })
                  }
                  {
                    showMiscrows && addMiscRows?.map((e, i) => {
                      return <tr key={i}>
                          <td>{i+1}</td>
                          <td>{e?.type}</td>
                          <td>{e?.shape}</td>
                          <td>{e?.clarity}</td>
                          <td>{e?.color}</td>
                          <td>{e?.size}</td>
                          <td>{e?.pcs} / {e?.wt}</td>
                          <td>{e?.tunch} / {e?.wastage}</td>
                          <td>{e?.supplier}</td>
                          <td>{e?.rate}</td>
                          <td>{e?.amount}</td>
                          <td><input type="checkbox" style={{width:'50px'}} checked={e?.onPcs} /></td>
                          <td><input type="checkbox" style={{width:'50px'}} checked={e?.addInGrossWt} /></td>
                          <td><EditIcon /></td>
                          <td><img
                                src={DeleteIcon}
                                alt="#delete"
                                title="Delete"
                                style={{ height: '20px', width: '20px', cursor: 'pointer' }}/>
                          </td>
                      </tr>
                    })
                  }
                  {
                    showFindingrows && addFindingRows?.map((e, i) => {
                      return <tr key={i}>
                          <td>{i+1}</td>
                          <td>{e?.type}</td>
                          <td>{e?.shape}</td>
                          <td>{e?.clarity}</td>
                          <td>{e?.color}</td>
                          <td>{e?.size}</td>
                          <td>{e?.pcs} / {e?.wt}</td>
                          <td>{e?.tunch} / {e?.wastage}</td>
                          <td>{e?.supplier}</td>
                          <td>{e?.rate}</td>
                          <td>{e?.amount}</td>
                          <td><input type="checkbox" style={{width:'50px'}} checked={e?.onPcs} /></td>
                          <td><input type="checkbox" style={{width:'50px'}} checked={e?.addInGrossWt} /></td>
                          <td><EditIcon /></td>
                          <td><img
                                src={DeleteIcon}
                                alt="#delete"
                                title="Delete"
                                style={{ height: '20px', width: '20px', cursor: 'pointer' }}/>
                          </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
          </div>}

        {/* <div className="filters-container2">
        <div className="filter-item">
          <select name="material" placeholder="material" id="mateiral" value={materialSelectedValue} onChange={handleMaterialSelection}>
            <option value="" disabled selected>select</option>
            {
              materialArr?.map((e, i) => {
                return <option value={e?.id} key={i}>{e?.name}</option>
              })
            }
          </select>
        </div>
        { ((materialSelectedValue?.toString()) !== '' && Number(materialSelectedValue) !== 4)  && <> 
        <div className="filter-item">
          <input type="text" placeholder="Type" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Shape" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Clarity" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Color" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Size" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Supplier" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Pcs" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Wt" />
        </div>
        <div className="filter-item">
          <select name="applyon" id="applyon">
            <option value="" disabled selected>Mark Up Apply</option>
            <option value="percentage">Percentage</option>
            <option value="amount">Amount</option>
          </select>
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Mark Up" />
        </div>
        <div className="filter-item">
          <div className='d-flex justify-content-center align-items-center'>
            <input type="checkbox" id='onpcs' style={{width:'20px'}} /><label htmlFor="onpcs" className='ps-1 user-select-none'>On Pcs</label>
          </div>
        </div>
        <div className="filter-item">
          <div className='fs_sn_fgp w-100 d-flex justify-content-center'><AddIcon titleAccess='Add Material' style={{border:'1px solid #989898', cursor:'pointer', borderRadius:'16px'}} /></div>
        </div>
           </>
          }
        { ((materialSelectedValue?.toString()) !== '' && Number(materialSelectedValue) === 4) &&  <> <div className="filter-item">
          <input type="text" placeholder="F Type" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Accessories" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Metal" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Quality" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Color" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Purity" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Wastage" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Supplier" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Pcs" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Wt" />
        </div>
        <div className="filter-item">
          <div className='fs_sn_fgp w-100 d-flex justify-content-center'><AddIcon titleAccess='Add Material' style={{border:'1px solid #989898', cursor:'pointer', borderRadius:'16px'}} /></div>
        </div>
           </>
          }
        </div> */}
        <div style={{maxHeight:'245px'}}>
        { addMoreMaterial && <table className='table'>
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
                  style={{width:'100px', border: "1px solid #ccc"}}
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
                  style={{width:'100px', border: "1px solid #ccc"}}
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
                  style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                  className='onfocus_snv'
                />
                <input
                  type="text"
                  name="pcsWt"
                  value={rowData.wt}
                  onChange={handleInputChange}
                  style={{width:'60px', border: "1px solid #ccc"}}
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
                  style={{width:'100px', border: "1px solid #ccc"}}
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
                  style={{width:'100px', border: "1px solid #ccc"}}
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
                  style={{width:'100px', border: "1px solid #ccc"}}
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
        {
          markUpModal && <Modal
            open={markUpModal}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            onClose={() => setMarkUpModal(false)}
          >
            <Box
               sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
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
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between pb-2'>
                  <div>&nbsp;</div>
                  <h4 className='text-secondary  px-0 text-center w-100  fw-bold fs_fgp'>Apply Sale Mark Up</h4>
                  <div><Tooltip title="Close"><CancelIcon style={{cursor:'pointer'}} onClick={() => setMarkUpModal(false)} /></Tooltip></div>
                </div>
                <div className='pt-2'>
                  <label htmlFor="applyon" className='form-label fs_fgp mb-1 px-1' style={{color:theme?.palette?.customColors?.purple}}>Apply On</label>
                  <select name="applyon" id="applyon" className='form-control fs_fgp'>
                    <option value="" selected disabled>Select</option>
                    <option value="amount">Amount</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>
                <div className='pt-2'>
                  <label htmlFor="salerate" className='form-label  mb-1 px-1 fs_fgp' style={{color:theme?.palette?.customColors?.purple}}>Mark Rate</label>
                  <input type="text" id="salerate" className='form-control' placeholder='50000' />
                </div>
                <div className='pt-2 w-100 ps-2'>
                  <input type="checkbox" id="onpcsmarkup" placeholder='50000' />
                  <label htmlFor="onpcsmarkup"  className='form-label mb-1 px-1  user-select-none fs_fgp' style={{color:theme?.palette?.customColors?.purple}}>On Pcs</label>
                </div>
                <div className='text-center w-100'>
                  <Button variant='contained' className='fs_fgp' sx={{fontWeight:'bold', backgroundColor:theme?.palette?.customColors?.green, color:'white'}} size='small' onClick={() => setMarkUpModal(false)}>Apply</Button>
                </div>
              </div>
            </Box>
          </Modal>
        }

        {
          altReceiveTimeHide && <Modal
            open={altReceiveTimeHide}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            onClose={() => setAltReceiveTimeHide(false)}
          >
            <Box
               sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                maxHeight: 700,
                bgcolor: 'background.paper',
                borderRadius: '12px',
                boxShadow: 24,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '200px',
                border: 'none',
                outline: 'none',
              }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between pb-2'>
                  <div>&nbsp;</div>
                  <h4 className='px-0 text-center w-100  fw-normal fs_fgp' style={{color:theme?.palette?.customColors?.purple}}>Item Information</h4>
                  <div><Tooltip title="Close"><CancelIcon style={{cursor:'pointer'}} onClick={() => setAltReceiveTimeHide(false)} /></Tooltip></div>
                </div>
                {/* <div className="filter_grid2 mt-3">
                  <div className="filter-item">
                    <div>
                      <label htmlFor="metaltype" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>MetalType</label>
                      <input type="text" placeholder="Metal Type" id='metaltype' />
                    </div>
                  </div>
                  <div className="filter-item">
                    <div>
                      <label htmlFor="HSN" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>HSN</label>
                      <input type="text" id="HSN" placeholder="HSN" autoFocus />
                    </div>
                  </div>
                  <div className="filter-item">
                    <div>
                      <label htmlFor="HSN" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>HSN</label>
                      <input type="text" id="HSN" placeholder="HSN" autoFocus />
                    </div>
                  </div>
                  <div className="filter-item">
                    <div>
                      <label htmlFor="refno" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Ref No.</label>
                      <input type="text" id="refno" placeholder="Ref No" />
                    </div>
                  </div>
                  <div className="filter-item">
                    <div>
                      <label htmlFor="ctype" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Cert. Type</label>
                      <input type="text" id="ctype" placeholder="CertificateType" />
                    </div>
                  </div>
                  <div className="filter-item">
                    <div>
                      <label htmlFor="certno" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>Cert. No.</label>
                      <input type="text" placeholder="Certificate No." id='certno' />
                    </div>
                  </div>
                  <div className="filter-item">
                    <div>
                      <label htmlFor="huid" style={{fontSize:'0.7rem', paddingLeft:'4px', color:'#797979'}}>HUID. No.</label>
                      <input type="text" placeholder="HUID No" id='huid' />
                    </div>
                  </div>
                      
                </div> */}
                {/* <div className="filter_grid2 mt-3">
                    <div className="filter_item_i">
                      <label htmlFor="metaltype" className="filter_label_i">Metal Type:</label>
                      <input type="text" placeholder="Metal Type" id="metaltype" disabled className="filter_input_i" />
                    </div>

                    <div className="filter_item_i">
                      <label htmlFor="HSN" className="filter_label_i">HSN:</label>
                      <input type="text" id="HSN" placeholder="HSN" autoFocus disabled className="filter_input_i" />
                    </div>

                    <div className="filter_item_i">
                      <label htmlFor="refno" className="filter_label_i">Ref No.:</label>
                      <input type="text" id="refno" placeholder="Ref No" disabled className="filter_input_i" />
                    </div>

                    <div className="filter_item_i">
                      <label htmlFor="ctype" className="filter_label_i">Cert. Type:</label>
                      <input type="text" id="ctype" placeholder="Certificate Type" disabled className="filter_input_i" />
                    </div>

                    <div className="filter_item_i">
                      <label htmlFor="certno" className="filter_label_i">Cert. No.:</label>
                      <input type="text" placeholder="Certificate No." id="certno" disabled className="filter_input_i" />
                    </div>

                    <div className="filter_item_i">
                      <label htmlFor="huid" className="filter_label_i">HUID No.:</label>
                      <input type="text" placeholder="HUID No" id="huid" disabled className="filter_input_i" />
                    </div>
                  </div> */}
                  {/* <div className='mt-3'>
                    <Typography variant='body1' className='text-secondary text-break'>Metal Type was <strong>Gold</strong> and Its HSN no is <strong>7113</strong> with the referece no <strong>REF12345</strong>, certificate type is <strong>IGI</strong> with certificate no <strong>CERT56789</strong> and HUID no is <strong>HUID1234</strong>.</Typography>
                  </div> */}
                  <div className="mt-3 fs_fgp">
  <Typography variant="body1" className="text-secondary">
    <div className="d-flex justify-content-between">
      <div>MetalType</div>
      <div><strong>Gold 18K YW</strong></div>
    </div>
    <div className="d-flex justify-content-between mt-2">
      <div>HSN No.</div>
      <div><strong>7113</strong></div>
    </div>
    <div className="d-flex justify-content-between mt-2">
      <div>Reference No.</div>
      <div><strong>REF12345</strong></div>
    </div>
    <div className="d-flex justify-content-between mt-2">
      <div>Certificate Type</div>
      <div><strong>IGI</strong></div>
    </div>
    <div className="d-flex justify-content-between mt-2">
      <div>Certificate No.</div>
      <div><strong>CERT56789</strong></div>
    </div>
    <div className="d-flex justify-content-between mt-2">
      <div>HUID No.</div>
      <div><strong>HUID1234</strong></div>
    </div>
  </Typography>
</div>


                      {/* <div className='text-center  applyBtnRec'>
                        <Button variant='contained' color='success' sx={{fontWeight:'bold'}} size='small' onClick={() => setAltReceiveTimeHide(false)}>Apply</Button>
                      </div> */}
              </div>
            </Box>
          </Modal>
        }

        {
          changeCriteria && <Modal
            open={changeCriteria}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            onClose={() => setChangeCriteria(false)}
          >
            <Box
               sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                maxHeight: 700,
                bgcolor: 'background.paper',
                borderRadius: '12px',
                boxShadow: 24,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '200px',
                border: 'none',
                outline:'none'
              }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between pb-2'>
                  <div>&nbsp;</div>
                  <h4 className='  px-0 text-center w-100  fw-bold fs_fgp' style={{color:theme?.palette?.customColors?.purple}}>Change Criteria</h4>
                  <div><Tooltip title="Close"><CancelIcon style={{cursor:'pointer'}} onClick={() => setChangeCriteria(false)} /></Tooltip></div>
                </div>
                <div className="filter_grid mt-3">
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp'>
              <option value="" disabled selected>Brand</option>
              {
                brandMainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{e?.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp'>
              <option value="" disabled selected>Collection</option>
              {
                collectionMainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{e?.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp'>
              <option value="" disabled selected>Category</option>
              {
                categorymainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{e?.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp'>
              <option value="" disabled selected>Sub Category</option>
              {
                subCategoryMainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{e?.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp'>
              <option value="" disabled selected>Product Type</option>
              {
                productTypeMainData?.map((e, i) => {
                  return <option value={e?.typeCode} key={i}>{e?.typeName}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp  '>
              <option value="" disabled selected>Gender</option>
              {
                genderMainData?.map((e, i) => {
                  return <option value={e?.genderCode} key={i}>{e?.genderName}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp'>
              <option value="" disabled selected>Occasion</option>
              {
                occasionMainData?.map((e, i) => {
                  return <option value={e?.occasionCode} key={i}>{e?.occasionName}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp'>
              <option value="" disabled selected>Style</option>
              {
                styleMainData?.map((e, i) => {
                  return <option value={e?.styleCode} key={i}>{e?.styleName}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp'>
              <option value="" disabled selected>HSN</option>
            </select>
          </div>
          <div className='text-center  categoryNewOrder'>
                  <Button variant='contained'  className='fs_fgp' sx={{fontWeight:'bold', backgroundColor:theme?.palette?.customColors?.green}} size='small' onClick={() => setChangeCriteria(false)}>Save</Button>
                </div>
        </div>
                {/* <div className='text-center w-100 pt-2'>
                  <Button variant='contained' color='success' sx={{fontWeight:'bold'}} size='small' onClick={() => setChangeCriteria(false)}>Apply</Button>
                </div> */}
              </div>
            </Box>
          </Modal>
        }

        {/* diam, cs, misc, find pop up render part */}
        {
          addDiaInfoPopUp && <Modal
            open={addDiaInfoPopUp}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            onClose={handleCloseModal}
          >
            <Box 
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      // width: "95%",
                      bgcolor: 'background.paper',
                      borderRadius: '12px',
                      boxShadow: 24,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      maxHeight: '500px',
                      overflowY:'scroll',
                      border: 'none',
                       minWidth:'1550px'
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6' className='fs_fgp' sx={{color:theme?.palette?.customColors?.purple}}>Add Diamond Details</Typography></div>
                    <div className='d-flex align-items-center'>
                      <Tooltip title="Receive From Vendor"><button className='p-1 py-0 px-2 btn btn-primary mx-1' onClick={() => dispatch(handleIssuedMaterialModal(true))} >i</button></Tooltip>
                      <Tooltip title="Close" onClick={() => setAddDiaInfoPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip>
                    </div>
                </div>
                <div className='w-100'>
                <table className='table'>
            <thead>
              <tr>
                <th align='center' className='text_color fs_fgp'>Sr</th>
                <th align='center' className='text_color fs_fgp'>Material</th>
                <th align='center' className='text_color fs_fgp'>Type</th>
                <th align='center' className='text_color fs_fgp'>Criteria</th>
                <th align='center' className='text_color fs_fgp'>Pcs/Wt</th>
                <th align='center' className='text_color fs_fgp'>Supplier</th>
                <th align='center' className='text_color fs_fgp'>Rate</th>
                <th align='center' className='text_color fs_fgp'>Sale Rate</th>
                <th align='center' className='text_color fs_fgp'>Mark Up</th>
                <th align='center' className='text_color fs_fgp'>On Pcs</th>
                <th align='center' className='text_color fs_fgp'>Add</th>
              </tr>
            </thead>
            <tbody>
                    {
                      addDiamondRows?.map((rowData, i) => {
                        return <tr key={i} className='fs_fgp'>
                        <td align="center" width={"50px"}>{i + 1}</td>
                        <td align='center' width={"80px"}>
                        <input
                              type="text"
                              name="material"
                              ref={diamond_Focus}
                              value={rowData.material}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Material'
                              autoComplete='off'
                            />
                        </td>
                        <td align='center' width={"80px"}>
                        <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Type'
                              autoComplete='off'
                            />
                        </td>
                        <td align="left" width={"350px"}>
                            <div>
                            <input
                              type="text"
                              name="shape"
                              value={rowData.shape}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Shape'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="clarity"
                              value={rowData.clarity}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Clarity'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="color"
                              value={rowData.color}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Color'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="size"
                              value={rowData.size}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Size'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="center" width={"130px"}>
                            <div>
                            <input
                              type="text"
                              name="pcs"
                              value={rowData.pcs}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='pcs'
                            />
                            <input
                              type="text"
                              name="wt"
                              value={rowData.wt}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='wt'
                            />
                            </div>
                          
                        </td>
                        <td align="left" width={"100px"}>
                            <input
                              type="text"
                              name="supplier"
                              value={rowData.supplier}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='supplier'
                            />
                        </td>
                        <td align="right" width={"80px"}>
                            <input
                              type="text"
                              name="rate"
                              value={rowData.rate}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='rate'
                            />
                        </td>
                        <td align="right" width={"80px"}>
                            <input
                              type="text"
                              name="amount"
                              value={rowData.amount}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='amount'
                            />
                        </td>
                        <td align="center" width={"60px"}>
                          <Tooltip title="Mark Up Details"><Button onClick={() => markUpModalOpen()} sx={{width:'50px', color:'black'}}><VisibilityIcon  /></Button></Tooltip>
                        </td>
                        <td align="left" width={"80px"}>
                            <input
                              type="checkbox"
                              name="onPcs"
                              // value={rowData.onPcs}
                              checked={rowData.onPcs}
                              onChange={(e) => handleDiamondInputChange(e, i)}
                              className='onfocus_snv'
                              autoFocus
                              placeholder=''
                            />
                        </td>
                        <td align="center" width={"80px"}>
                            <Button sx={{width:'50px'}} onKeyDown={handleDIamondKeyDown}>
                              <AddCircleIcon
                                  titleAccess="Add Entry"
                                  onClick={handleAddRow}
                                  style={{ cursor: "pointer", color:theme?.palette?.customColors?.purple }}
                              />
                            </Button>
                        </td>
                      </tr>
                      })
                    }
            </tbody>
          </table>
      
                <div className='d-flex justify-content-center align-items-center w-100'>
                  <Button variant='contained' size='small' className='fs_fgp' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} onClick={() => handleSaveDiamondDetails()}>Save Diamond Details</Button></div>
                </div>
              </div>
            </Box>

          </Modal>
        }
        {
          addCSInfoPopUp && <Modal
            open={addCSInfoPopUp}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            onClose={handleCloseModal}
          >
            <Box 
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      // width: "70%",
                      bgcolor: 'background.paper',
                      borderRadius: '12px',
                      boxShadow: 24,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      maxHeight: '500px',
                      overflowY:'scroll',
                      border: 'none',
                       minWidth:'1550px'
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6' className='fs_fgp' sx={{color:theme?.palette?.customColors?.purple}}>Add ColorStone Details</Typography></div>
                    <div className='d-flex align-items-center'>
                      <Tooltip title="Receive From Vendor">
                          <button className='p-1 py-0 px-2 btn btn-primary mx-1' onClick={() => dispatch(handleIssuedMaterialModal(true))} >i</button>
                        </Tooltip>
                      <Tooltip title="Close" onClick={() => setAddCSInfoPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip>
                    </div>
                </div>
                <div className='w-100'>
                <table className='table'>
            <thead>
              <tr>
                <th align='center' className='text_color fs_fgp'>Sr</th>
                <th align='center' className='text_color fs_fgp'>Material</th>
                <th align='center' className='text_color fs_fgp'>Type</th>
                <th align='center' className='text_color fs_fgp'>Criteria</th>
                <th align='center' className='text_color fs_fgp'>Pcs/Wt</th>
                <th align='center' className='text_color fs_fgp'>Supplier</th>
                <th align='center' className='text_color fs_fgp'>Rate</th>
                <th align='center' className='text_color fs_fgp'>Sale Rate</th>
                <th align='center' className='text_color fs_fgp'>Mark Up</th>
                <th align='center' className='text_color fs_fgp'>On Pcs</th>
                <th align='center' className='text_color fs_fgp'>Add</th>
              </tr>
            </thead>
            <tbody>
                    {
                      addCsRows?.map((rowData, i) => {
                        return <tr key={i} className='fs_fgp'>
                        <td align="center" width={"80px"}>1</td>
                        <td align='left' width={"100px"}>
                              <input
                                type="text"
                                name="material"
                                value={rowData.material}
                                onChange={(e) => handleColorstoneInputChange(e, i)}
                                style={{width:'80px', border: "1px solid #ccc"}}
                                className='onfocus_snv m_x_inp_snv'
                                placeholder='Material'
                                autoComplete='off'
                                ref={colorstone_focus}
                              />
                        </td>
                        <td align='left' width={"100px"}>
                              <input
                                type="text"
                                name="type"
                                value={rowData.type}
                                onChange={(e) => handleColorstoneInputChange(e, i)}
                                style={{width:'80px', border: "1px solid #ccc"}}
                                className='onfocus_snv m_x_inp_snv'
                                placeholder='Type'
                                autoComplete='off'
                              />
                        </td>
                        <td align="left" width={"360px"}>
                            <div>
                            <input
                              type="text"
                              name="shape"
                              value={rowData.shape}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Shape'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="clarity"
                              value={rowData.clarity}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Clarity'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="color"
                              value={rowData.color}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Color'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="size"
                              value={rowData.size}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Size'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="center" width={"130px"}>
                            <div>
                            <input
                              type="text"
                              name="pcs"
                              value={rowData.pcs}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='pcs'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="wt"
                              value={rowData.wt}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='wt'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="left" width={"80px"}>
                            <input
                              type="text"
                              name="supplier"
                              value={rowData.supplier}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='supplier'
                              autoComplete='off'
                            />
                        </td>
                        <td align="right" width={"80px"}>
                            <input
                              type="text"
                              name="rate"
                              value={rowData.rate}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='rate'
                              autoComplete='off'
                            />
                        </td>
                        <td align="right" width={"80px"}>
                            <input
                              type="text"
                              name="amount"
                              value={rowData.amount}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='amount'
                              autoComplete='off'
                            />
                        </td>
                        <td align="center" width={"80px"}>
                          <Tooltip title="Mark Up Details"><Button onClick={() => markUpModalOpen()} sx={{width:'50px', color:'black'}}><VisibilityIcon  /></Button></Tooltip>
                        </td>
                        <td align="left" width={"80px"}>
                            <input
                              type="checkbox"
                              name="onPcs"
                              // value={rowData.onPcs}
                              checked={rowData.onPcs}
                              onChange={(e) => handleColorstoneInputChange(e, i)}
                              className='onfocus_snv'
                              autoComplete='off'
                            />
                        </td>
                        <td align="center" width={"80px"}>
                            <Button sx={{width:'50px'}} onKeyDown={handleColorstoneKeyDown}><AddCircleIcon
                            titleAccess="Add Entry"
                            onClick={handleCSAddRow}
                            style={{ cursor: "pointer", color:theme?.palette?.customColors?.purple }}
                          /></Button>
                        </td>
                      </tr>
                      })
                    }
            </tbody>
          </table>
      
              <div className='d-flex justify-content-center align-items-center w-100'>
                <Button variant='contained' size='small' className='fs_fgp' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} onClick={() => handleSaveColorstoneDetails()}>Save ColorStone Details</Button></div>

                </div>
              </div>
            </Box>

          </Modal>
        }
        {
          addMiscInfoPopUp && <Modal
            open={addMiscInfoPopUp}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            onClose={() => setAddMiscInfoPopUp(false)}
          >
            <Box 
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      // width: "95%",
                      bgcolor: 'background.paper',
                      borderRadius: '12px',
                      boxShadow: 24,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      maxHeight: '500px',
                      overflowY:'scroll',
                      border: 'none',
                       minWidth:'1550px'
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6' className='fs_fgp' sx={{color:theme?.palette?.customColors?.purple}}>Add Misc Details</Typography></div>
                    <div className='d-flex justify-content-center'>
                      <Tooltip title="Receive From Vendor">
                        <button className='p-1 py-0 px-2 btn btn-primary mx-1' onClick={() => dispatch(handleIssuedMaterialModal(true))} >i</button>
                      </Tooltip>
                      <Tooltip title="Close" onClick={() => setAddMiscInfoPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip>
                    </div>
                </div>
                <div className='w-100'>
                <table className='table'>
            <thead>
              <tr>
                <th align='center' className='text_color fs_fgp'>Sr</th>
                <th align='center' className='text_color fs_fgp'>Material</th>
                <th align='center' className='text_color fs_fgp'>Type</th>
                <th align='center' className='text_color fs_fgp'>Criteria</th>
                <th align='center' className='text_color fs_fgp'>Pcs/Wt</th>
                <th align='center' className='text_color fs_fgp'>Supplier</th>
                <th align='center' className='text_color fs_fgp'>Rate</th>
                <th align='center' className='text_color fs_fgp'>Sale Rate</th>
                <th align='center' className='text_color fs_fgp'>Mark Up</th>
                <th align='center' className='text_color fs_fgp'>On Pcs</th>
                <th align='center' className='text_color fs_fgp'>AddIn GrossWt</th>
                <th align='center' className='text_color fs_fgp'>Add</th>
              </tr>
            </thead>
            <tbody>
                    {
                      addMiscRows?.map((rowData, i) => {
                        return <tr key={i} className='fs_fgp'>
                        <td align="center" width={"50px"}>1</td>
                        <td align='left' width={"100px"}>
                              <input
                                type="text"
                                name="material"
                                value={rowData.material}
                                onChange={(e) => handleMiscInputChange(e, i)}
                                style={{width:'80px', border: "1px solid #ccc"}}
                                className='onfocus_snv m_x_inp_snv'
                                placeholder='Material'
                                autoComplete='off'
                                ref={misc_focus}
                              />
                        </td>
                        <td align='left' width={"100px"}>
                              <input
                                type="text"
                                name="type"
                                value={rowData.type}
                                onChange={(e) => handleMiscInputChange(e, i)}
                                style={{width:'80px', border: "1px solid #ccc"}}
                                className='onfocus_snv m_x_inp_snv'
                                placeholder='Type'
                                autoComplete='off'
                              />
                        </td>

                        <td align="left" width={"360px"}>
                            <div>
                            <input
                              type="text"
                              name="shape"
                              value={rowData.shape}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Shape'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="clarity"
                              value={rowData.clarity}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Clarity'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="color"
                              value={rowData.color}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Color'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="size"
                              value={rowData.size}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Size'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>

                        <td align="center" width={"130px"}>
                            <div>
                            <input
                              type="text"
                              name="pcs"
                              value={rowData.pcs}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='pcs'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="wt"
                              value={rowData.wt}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='wt'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="left" width={"80px"}>
                            <input
                              type="text"
                              name="supplier"
                              value={rowData.supplier}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='supplier'
                              autoComplete='off'
                            />
                        </td>
                        <td align="right" width={"80px"}>
                            <input
                              type="text"
                              name="rate"
                              value={rowData.rate}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='rate'
                              autoComplete='off'
                            />
                        </td>
                        <td align="right" width={"80px"}>
                            <input
                              type="text"
                              name="amount"
                              value={rowData.amount}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='amount'
                              autoComplete='off'
                            />
                        </td>
                        <td align="center" width={"50px"}>
                          <Tooltip title="Mark Up Details"><Button onClick={() => markUpModalOpen()} sx={{width:'50px', color:'black'}}><VisibilityIcon  /></Button></Tooltip>
                        </td>
                        <td align="right" width={"50px"}>
                            <input
                              type="checkbox"
                              name="onPcs"
                              // value={rowData.amount}
                              checked={rowData?.onPcs}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="right" width={"50px"}>
                            <input
                              type="checkbox"
                              name="addInGrossWt"
                              // value={rowData.addInGrossWt}
                              checked={rowData?.addInGrossWt}
                              onChange={(e) => handleMiscInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="center" width={"50px"}>
                            <Button sx={{width:'50px'}} onKeyDown={handleMiscKeyDown}><AddCircleIcon
                                  titleAccess="Add Entry"
                                  onClick={handleMiscAddRow}
                                  style={{ cursor: "pointer", color:theme?.palette?.customColors?.purple }}
                          /></Button>
                        </td>
                      </tr>
                      })
                    }
                  </tbody>
                </table>
      
                  <div className='d-flex justify-content-center align-items-center w-100'>
                    <Button variant='contained' size='small' className='fs_fgp' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} onClick={() => handleSaveMiscDetails()}>Save Misc Details</Button></div>

                </div>
              </div>
            </Box>

          </Modal>
        }
        {
          addFindingInfoPopUp && <Modal
            open={addFindingInfoPopUp}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            onClose={() => setAddFindingInfoPopUp(false)}
          >
            <Box 
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      // width: "95%",
                      bgcolor: 'background.paper',
                      borderRadius: '12px',
                      boxShadow: 24,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      maxHeight: '500px',
                      overflowY:'scroll',
                      border: 'none',
                      minWidth:'1550px'
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6' className='fs_fgp' sx={{color:theme?.palette?.customColors?.purple}}>Add Finding Details</Typography></div>
                    <div className='d-flex align-items-center'>
                      <Tooltip title="Receive From Vendor">
                        <button className='p-1 py-0 px-2 btn btn-primary mx-1' onClick={() => dispatch(handleIssuedMaterialModal(true))} >i</button>
                      </Tooltip>
                      <Tooltip title="Close" onClick={() => setAddFindingInfoPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip>
                    </div>
                </div>
                <div className='w-100'>
                <table className='table'>
            <thead>
              <tr>
                <th align='center' className='text_color fs_fgp'>Sr</th>
                <th align='center' className='text_color fs_fgp'>Material</th>
                <th align='center' className='text_color fs_fgp'>Type</th>
                <th align='center' className='text_color fs_fgp'>Criteria</th>
                <th align='center' className='text_color fs_fgp'>Pcs/Wt</th>
                <th align='center' className='text_color fs_fgp'>Tunch/Wastage</th>
                <th align='center' className='text_color fs_fgp'>Supplier</th>
                <th align='center' className='text_color fs_fgp'>Rate</th>
                <th align='center' className='text_color fs_fgp'>Sale Rate</th>
                <th align='center' className='text_color fs_fgp'>Mark Up</th>
                <th align='center' className='text_color fs_fgp'>On Pcs</th>
                <th align='center' className='text_color fs_fgp'>Add</th>
              </tr>
            </thead>
            <tbody>
                    {
                      addFindingRows?.map((rowData, i) => {
                        return <tr key={i} className='fs_fgp'>
                        <td align="center" width={"60px"}>1</td>
                        <td align='left' width={"100px"}>
                              <input
                                type="text"
                                name="material"
                                value={rowData.material}
                                onChange={(e) => handleFindingInputChange(e, i)}
                                style={{width:'80px', border: "1px solid #ccc"}}
                                className='onfocus_snv m_x_inp_snv'
                                placeholder='Material'
                                autoComplete='off'
                                ref={finding_focus}
                              />
                        </td>
                        <td align='left' width={"100px"}>
                              <input
                                type="text"
                                name="type"
                                value={rowData.type}
                                onChange={(e) => handleFindingInputChange(e, i)}
                                style={{width:'80px', border: "1px solid #ccc"}}
                                className='onfocus_snv m_x_inp_snv'
                                placeholder='Type'
                                autoComplete='off'
                              />
                        </td>
                        <td align="left" width={"360px"}>
                            <div>
                            <input
                              type="text"
                              name="shape"
                              value={rowData.shape}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Shape'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="clarity"
                              value={rowData.clarity}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Accessories'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="size"
                              value={rowData.size}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Purity'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="color"
                              value={rowData.color}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv m_x_inp_snv'
                              placeholder='Color'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="center" width={"130px"}>
                            <div>
                            <input
                              type="text"
                              name="pcs"
                              value={rowData.pcs}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='pcs'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="wt"
                              value={rowData.wt}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='wt'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="center" width={"130px"}>
                            <div>
                            <input
                              type="text"
                              name="tunch"
                              value={rowData.tunch}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='tunch'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="wastage"
                              value={rowData.wastage}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='wasatge'
                              autoComplete='off'
                            />
                            </div>
                        </td>
                        <td align="left" width={"80px"}>
                            <input
                              type="text"
                              name="supplier"
                              value={rowData.supplier}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='supplier'
                              autoComplete='off'
                            />
                        </td>
                        <td align="right" width={"80px"}>
                            <input
                              type="text"
                              name="rate"
                              value={rowData.rate}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='rate'
                              autoComplete='off'
                            />
                        </td>
                        <td align="right" width={"80px"}>
                            <input
                              type="text"
                              name="amount"
                              value={rowData.amount}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='amount'
                              autoComplete='off'
                            />
                        </td>
                        <td align="center " width={"80px"}>
                          <Tooltip title="Mark Up Details"><Button onClick={() => markUpModalOpen()} sx={{width:'50px', color:'black'}}><VisibilityIcon  /></Button></Tooltip>
                        </td>
                        <td align="right" width={"60px"}>
                            <input
                              type="checkbox"
                              name="onPcs"
                              checked={rowData.onPcs}
                              onChange={(e) => handleFindingInputChange(e, i)}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='onPcs'
                              autoComplete='off'
                            />
                        </td>
                        <td align="center" width={"80px"}>
                            <Button sx={{width:'50px'}} onKeyDown={handleFindingKeyDown}><AddCircleIcon
                                  titleAccess="Add Entry"
                                  onClick={handleFindingAddRow}
                                  style={{ cursor: "pointer", color:theme?.palette?.customColors?.purple }}
                          /></Button>
                        </td>
                      </tr>
                      })
                    }
                  </tbody>
                </table>
      
                  <div className='d-flex justify-content-center align-items-center w-100'>
                    <Button variant='contained' size='small' className='fs_fgp' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} onClick={() => handleSaveFindingDetails()}>Save Finding Details</Button></div>

                </div>
              </div>
            </Box>

          </Modal>
        }
        </div>
        </>
        }


        <div className='d-flex align-items-center justify-content-center pb-2'>
            {/* <button className='btn btn-success fs_sn_fgp' style={{minWidth:'100px'}}>Save</button> */}
          {/* <div className="m-1">
            <Button variant='contained' className='fs_fgp' size='small' sx={{backgroundColor:theme?.palette?.customColors?.green, color:'white'}} style={{minWidth:'100px'}}>Save</Button>
          </div> */}
          <div className="m-1">
            {/* <button className='btn btn-success fs_sn_fgp' onClick={() => dispatch(handleSaveAndNextFlag(false))} style={{minWidth:'100px'}}>Save & New</button> */}
            {/* <button className='btn btn-success fs_sn_fgp' onClick={() => handleSaveAndNew()} style={{minWidth:'100px'}}>Save & New</button> */}
            <Button variant='contained' className='fs_fgp' size='small' sx={{backgroundColor:theme?.palette?.customColors?.green, color:'white'}} style={{minWidth:'100px'}} onClick={() => handleSaveAndNew()}>Save & New</Button>
          </div>
          <div className="m-1">
            {/* <button className='btn btn-success fs_sn_fgp' style={{minWidth:'100px'}}>Save & Print</button> */}
            <Button variant='contained' className='fs_fgp' size='small' sx={{backgroundColor:theme?.palette?.customColors?.green, color:'white'}} style={{minWidth:'100px'}}>Save & Print</Button>
          </div>
        </div>

      </div>

    </div>
    </>
  )
}

export default SaveNNext;