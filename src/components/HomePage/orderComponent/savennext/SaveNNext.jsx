import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./savennext.css";
// import  DeleteIcon  from '@mui/icons-material/Delete';
import DeleteIcon from "../../../../assets/images/delete.png";
import  SettingsIcon  from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import { handleIssuedMaterialModal, handleMountModal, handleSaveAndNextFlag } from '../../../../redux/slices/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import  EditIcon  from '@mui/icons-material/Edit';
import SaveIcon from "@mui/icons-material/Save";
import { Tooltip, Modal, Box, Button, Typography } from '@mui/material';
import FileUploaderMultiple from './FileUploaderMultiple';
import CancelIcon from '@mui/icons-material/Cancel';
import MountGrid from './MountGrid';
import IssuedMaterial from './IssuedMaterial';
import Snackbar from '@mui/material/Snackbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const SaveNNext = () => {
  const dispatch = useDispatch();
  const mountModal = useSelector(state => state?.home?.mountModal);

  const issuedMaterialModal = useSelector(state => state?.home?.issuedMaterialModal);
  
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
      type: '',
      criteria: '',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
    },
  ]);
  const diamond_Focus = useRef();

  //add colorstone details pop up
  const [addCSInfoPopUp, setAddCSInfoPopUp] = useState(false);
  const [addCsRows, setAddCSRows] = useState([
    {
      type: '',
      criteria: '',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
    },
  ]);
  const [isColorStoneAdding, setIsColorStoneAdding] = useState(false);
  const csWtFocus = useRef();

  //add misc details pop up
  const [addMiscInfoPopUp, setAddMiscInfoPopUp] = useState(false);
  const [addMiscRows, setAddMiscRows] = useState([
    {
      type: '',
      criteria: '',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
    },
  ]);
  const [isMiscAdding, setMiscAdding] = useState(false);
  const miscWtFocus = useRef();


  //add finding details pop up
  const [addFindingInfoPopUp, setAddFindingInfoPopUp] = useState(false);
  const [addFindingRows, setAddFindingRows] = useState([
    {
      type: '',
      criteria: '',
      pcs: '',
      wt: '',
      supplier: '',
      rate: '',
      amount: '',
    },
  ]);
  const [isFindingAdding, setFindingAdding] = useState(false);
  const findingWtFocus = useRef();






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


  const materialArr = [
    {id:1, name:'Diamond'},
    {id:2, name:'Colorstone'},
    {id:3, name:'Misc'},
    {id:4, name:'Finding'},
  ]

  const filterArrForDia_Clr = [
    {
      id:1,
      type:"text",
      label:"Type",
      remark:"Auto Search Suggestion",
    },
    {
      id:2,
      type:"text",
      label:"Shape",
      remark:"Auto Search Suggestion",
    },
    {
      id:3,
      type:"text",
      label:"Quality",
      remark:"Auto Search Suggestion",
    },
    {
      id:4,
      type:"text",
      label:"Color",
      remark:"Auto Search Suggestion",
    },
    {
      id:5,
      type:"text",
      label:"Size",
      remark:"Auto Search Suggestion",
    },
    {
      id:5,
      type:"text",
      label:"Supplier",
      remark:"Auto Search Suggestion",
    },
    {
      id:6,
      type:"text",
      label:"Pcs",
      remark:"Auto Search Suggestion",
    },
    {
      id:7,
      type:"text",
      label:"Ctw",
      remark:"Auto Search Suggestion",
    },
    {
      id:8,
      type:"select",
      label:"Apply On",
      remark:"Dropdown using select and option",
    },
    {
      id:9,
      type:"select",
      label:"Apply On",
      remark:"Dropdown using select and option",
    },
    {
      id:10,
      type:"text",
      label:"Sale Rate",
      remark:"input field type text",
    },
    {
      id:11,
      type:"checkbox",
      label:"On Pcs",
      remark:"on pcs checkbox default true",
    },
  ]

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
        setIsAdding(true);
      }
      if(args === 'colorstone'){
        setAddCSInfoPopUp(true);
        setIsColorStoneAdding(true);
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
    
  };

  //add diamond pop up logic
  const handleDiamondInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...addDiamondRows];
    updatedRows[rowIndex][name] = value;
    setAddDiamondRows(updatedRows);
  };
    // Add a new row
    const handleAddRow = () => {
      setAddDiamondRows([
        ...addDiamondRows,
        {
          type: '',
          criteria: '',
          pcs: '',
          wt: '',
          supplier: '',
          rate: '',
          amount: '',
        },
      ]);
    };
    const handleDIamondKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleAddRow();
      }
    };
     // Focus on the input field when the modal is open
  // useEffect(() => {
  //   setTimeout(() => {
  //       if (addDiaInfoPopUp && diamond_Focus.current) {
  //         diamond_Focus.current.focus();
  //       }
  //   },10);
  // }, [addDiaInfoPopUp]);
  const handleSaveDiamondDetails = () => {
    console.log(addDiamondRows);
    setAddDiaInfoPopUp(false);
  }

//add colorstone pop up logic
  const handleSaveColorstoneDetails = () => {
    console.log(addCsRows);
    setAddCSInfoPopUp(false);
  }
  const handleColorstoneInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...addCsRows];
    updatedRows[rowIndex][name] = value;
    setAddCSRows(updatedRows);
  };
      // Add a new row
      const handleCSAddRow = () => {
        setAddCSRows([
          ...addCsRows,
          {
            type: '',
            criteria: '',
            pcs: '',
            wt: '',
            supplier: '',
            rate: '',
            amount: '',
          },
        ]);
      };
      const handleColorstoneKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleCSAddRow();
        }
      };
      


  //add misc pop up logic
  const handleSaveMiscDetails = () => {
    console.log(addCsRows);
    setAddMiscInfoPopUp(false);
  }
  const handleMiscInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...addMiscRows];
    updatedRows[rowIndex][name] = value;
    setAddMiscRows(updatedRows);
  };
      // Add a new row
      const handleMiscAddRow = () => {
        setAddMiscRows([
          ...addMiscRows,
          {
            type: '',
            criteria: '',
            pcs: '',
            wt: '',
            supplier: '',
            rate: '',
            amount: '',
          },
        ]);
      };
      const handleMiscKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleMiscAddRow();
        }
      };



  //add finding pop up logic
  const handleSaveFindingDetails = () => {
    console.log(addFindingRows);
    setAddFindingInfoPopUp(false);
  }
  const handleFindingInputChange = (e, rowIndex) => {
    const { name, value } = e.target;
    const updatedRows = [...addFindingRows];
    updatedRows[rowIndex][name] = value;
    setAddFindingRows(updatedRows);
  };
      // Add a new row
      const handleFindingAddRow = () => {
        setAddFindingRows([
          ...addFindingRows,
          {
            type: '',
            criteria: '',
            pcs: '',
            wt: '',
            supplier: '',
            rate: '',
            amount: '',
          },
        ]);
      };
      const handleFindingKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleFindingAddRow();
        }
      };

  


  return (
    <>
    <div className='savennext_container'>
        <div>
          <h5 className='header_title_fgp'>Add Product Details</h5>
        </div>
        
      {/* Job Line */}
      <div className="job-info">
        <div>Tag No: <b className="text-primary">1/12566</b></div>
        <div>Net Wt: <b className="text-primary">2.256 gm</b></div>
        <div>Pure Wt: <b className="text-primary">1.256</b></div>
        <div>Dia: <b className="text-primary">2.256 cts 12000 Amount</b></div>
        <div className=' '>
                <FileUploaderMultiple />
        </div>
        <div>
          <Button size='small' color='warning' variant='outlined' onClick={() => handleAddRemark()}>Add Remark</Button>
          <>
          {
            remarkModal && 
            <Modal
              open={remarkModal}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description">
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
                    <textarea placeholder='Enter Your Remark' rows={5} className='mb-2 textareadRemark_snv' onChange={(e) => handleRemarkChange(e)} ></textarea>
                    <Tooltip title="Save & Close"><Button color='success' variant='outlined' size='small' onClick={() => handleSaveRemark()} >Save Remark</Button></Tooltip>
                  </div>
                </Box>

            </Modal>

          }
          </>
        </div>
      </div>

      <div className="filters-container_sn">
        <div className="filter-item">
          <input type="text" placeholder="HSN" autoFocus />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Ref No" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Certificate Type" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Certificate No." />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="HUID No" />
        </div>
        <div className="filter-item d-flex justify-content-center align-items-center w-100">
          <Tooltip title="Change Criteria" style={{cursor:'pointer'}}><SettingsIcon /></Tooltip>
        </div>
      </div>
      <div className="filters-container2">
        <div className="filter-item">
          <input type="text" placeholder="Metal Type" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Gross Wt" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="NetWt" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Tunch" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Wastage" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Dia.Wt"  onKeyDown={(e) => handleEnterKeyChange(e, 'diamond')} />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Cs.Wt" inputRef={csWtFocus} onKeyDown={(e) => handleEnterKeyChange(e, 'colorstone')} />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Misc Wt" onKeyDown={(e) => handleEnterKeyChange(e, 'misc')} />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Finding Wt" onKeyDown={(e) => handleEnterKeyChange(e, 'finding')} />
        </div>
        <div className="filter-item">
            <input type="text" placeholder="Labour" />
          </div>
          <div className="filter-item">
            <input type="text" placeholder="SalesLabour" />
          </div>
        
      </div>
      
      {/* { !addMoreMaterial && <div className='mt-3' onClick={() => setAddMoreMaterial(true)}><Button size='small' color='warning' variant='contained'>Add Material Details</Button></div>} */}

      <div>
        {
        //  addMoreMaterial && <>
         1 && <>
          <div className='d-flex justify-content-between align-items-center mb-2 pt-3'>
          <h5 className='ps-2'>Add Material Details</h5>
          <div className='d-flex justify-content-between align-items-center'>
            <div><Tooltip title="Mount"><button className='p-1 py-0 btn btn-secondary mx-1' onClick={() => dispatch(handleMountModal(true))} >M</button></Tooltip></div>
            <div><Tooltip title="Issued Material"><button className='p-1 py-0 px-2 btn btn-primary mx-1' onClick={() => dispatch(handleIssuedMaterialModal(true))} >i</button></Tooltip></div>
          </div>
          { mountModal && <MountGrid /> }
          { issuedMaterialModal && <IssuedMaterial /> }
          </div>

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
                  <h4 className='text-secondary  px-0 text-center w-100  fw-bold'>Apply Sale Mark Up</h4>
                  <div><CancelIcon style={{cursor:'pointer'}} onClick={() => setMarkUpModal(false)} /></div>
                </div>
                <div className='pt-2'>
                  <label htmlFor="applyon" className='form-label text-primary mb-1 px-1'>Apply On</label>
                  <select name="applyon" id="applyon" className='form-control'>
                    <option value="" selected disabled>Select</option>
                    <option value="amount">Amount</option>
                    <option value="percentage">Percentage</option>
                  </select>
                </div>
                <div className='pt-2'>
                  <label htmlFor="salerate" className='form-label text-primary mb-1 px-1'>Mark Rate</label>
                  <input type="text" id="salerate" className='form-control' placeholder='50000' />
                </div>
                <div className='pt-2 w-100 ps-2'>
                  <input type="checkbox" id="onpcsmarkup" placeholder='50000' />
                  <label htmlFor="onpcsmarkup"  className='form-label mb-1 px-1 text-primary user-select-none'>On Pcs</label>
                </div>
                <div className='text-center w-100'>
                  <Button variant='contained' color='success' sx={{fontWeight:'bold'}} size='small' onClick={() => setMarkUpModal(false)}>Apply</Button>
                </div>
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
                      width: "95%",
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
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6'>Add Diamond Details</Typography></div>
                    <div><Tooltip title="Close" onClick={() => setAddDiaInfoPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip></div>
                </div>
                <div className='w-100'>
                <table className='table'>
            <thead>
              <tr>
                <th align='center'>Sr</th>
                
                <th align='center'>Criteria</th>
                <th align='center'>Pcs/Wt</th>
                <th align='center'>Supplier</th>
                <th align='center'>Rate</th>
                <th align='center'>Amount</th>
                <th align='center'>Mark Up</th>
                <th align='center'>On Pcs</th>
                <th align='center'>Add</th>
              </tr>
            </thead>
            <tbody>
                    {
                      addDiamondRows?.map((rowData, i) => {
                        return <tr key={i}>
                        <td align="center">1</td>
                        
                        <td align="left">
                            <div>
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleDiamondInputChange}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='Shape'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleDiamondInputChange}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='Clarity'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleDiamondInputChange}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='Color'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleDiamondInputChange}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='Size'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="center">
                            <div>
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.pcs}
                              onChange={handleDiamondInputChange}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='pcs'
                            />
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.wt}
                              onChange={handleDiamondInputChange}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='wt'
                            />
                            </div>
                          
                        </td>
                        <td align="left">
                            <input
                              type="text"
                              name="supplier"
                              value={rowData.supplier}
                              onChange={handleDiamondInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='supplier'
                            />
                        </td>
                        <td align="right">
                            <input
                              type="text"
                              name="rate"
                              value={rowData.rate}
                              onChange={handleDiamondInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='rate'
                            />
                        </td>
                        <td align="right">
                            <input
                              type="text"
                              name="amount"
                              value={rowData.amount}
                              onChange={handleDiamondInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='amount'
                            />
                        </td>
                        <td align="center">
                          <Tooltip title="Mark Up Details"><Button onClick={() => markUpModalOpen()} sx={{width:'50px', color:'black'}}><VisibilityIcon  /></Button></Tooltip>
                        </td>
                        <td align="left">
                            <input
                              type="checkbox"
                              name="onpcs"
                              value={rowData.criteria}
                              onChange={handleDiamondInputChange}
                              className='onfocus_snv'
                              autoFocus
                              placeholder=''
                            />
                        </td>
                        <td align="center">
                            <Button sx={{width:'50px'}} onKeyDown={handleDIamondKeyDown}><AddCircleIcon
                            titleAccess="Add Entry"
                            onClick={handleAddRow}
                            style={{ cursor: "pointer" }}
                          /></Button>
                        </td>
                      </tr>
                      })
                    }
            </tbody>
          </table>
      
              <div className='d-flex justify-content-center align-items-center w-100'><Button variant='contained' onClick={() => handleSaveDiamondDetails()}>Save Diamond Details</Button></div>

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
                      width: "95%",
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
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6'>Add ColorStone Details</Typography></div>
                    <div><Tooltip title="Close" onClick={() => setAddCSInfoPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip></div>
                </div>
                <div className='w-100'>
                <table className='table'>
            <thead>
              <tr>
                <th align='center'>Sr</th>
                
                <th align='center'>Criteria</th>
                <th align='center'>Pcs/Wt</th>
                <th align='center'>Supplier</th>
                <th align='center'>Rate</th>
                <th align='center'>Amount</th>
                <th align='center'>Mark Up</th>
                <th align='center'>On Pcs</th>
                <th align='center'>Add</th>
              </tr>
            </thead>
            <tbody>
                    {
                      addCsRows?.map((rowData, i) => {
                        return <tr key={i}>
                        <td align="center">1</td>
                       
                        <td align="left">
                            <div>
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleColorstoneInputChange}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='Shape'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleColorstoneInputChange}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='Clarity'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleColorstoneInputChange}
                              style={{width:'70px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='Color'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleColorstoneInputChange}
                              style={{width:'80px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='Size'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="center">
                            <div>
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.pcs}
                              onChange={handleColorstoneInputChange}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='pcs'
                              autoComplete='off'
                            />
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.wt}
                              onChange={handleColorstoneInputChange}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='wt'
                              autoComplete='off'
                            />
                            </div>
                          
                        </td>
                        <td align="left">
                            <input
                              type="text"
                              name="supplier"
                              value={rowData.supplier}
                              onChange={handleColorstoneInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='supplier'
                              autoComplete='off'
                            />
                        </td>
                        <td align="right">
                            <input
                              type="text"
                              name="rate"
                              value={rowData.rate}
                              onChange={handleColorstoneInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='rate'
                              autoComplete='off'
                            />
                        </td>
                        <td align="right">
                            <input
                              type="text"
                              name="amount"
                              value={rowData.amount}
                              onChange={handleColorstoneInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              placeholder='amount'
                              autoComplete='off'
                            />
                        </td>
                        <td align="center">
                          <Tooltip title="Mark Up Details"><Button onClick={() => markUpModalOpen()} sx={{width:'50px', color:'black'}}><VisibilityIcon  /></Button></Tooltip>
                        </td>
                        <td align="left">
                            <input
                              type="checkbox"
                              name="onpcs"
                              value={rowData.type}
                              onChange={handleColorstoneInputChange}
                              className='onfocus_snv'
                              autoComplete='off'
                            />
                          
                        </td>
                        <td align="center">
                            <Button sx={{width:'50px'}} onKeyDown={handleColorstoneKeyDown}><AddCircleIcon
                            titleAccess="Add Entry"
                            onClick={handleCSAddRow}
                            style={{ cursor: "pointer" }}
                          /></Button>
                        </td>
                      </tr>
                      })
                    }
            </tbody>
          </table>
      
              <div className='d-flex justify-content-center align-items-center w-100'><Button variant='contained' onClick={() => handleSaveColorstoneDetails()}>Save ColorStone Details</Button></div>

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
                      width: "95%",
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
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6'>Add Misc Details</Typography></div>
                    <div><Tooltip title="Close" onClick={() => setAddMiscInfoPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip></div>
                </div>
                <div className='w-100'>
                <table className='table'>
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
                <th align='center'>Add</th>
              </tr>
            </thead>
            <tbody>
                    {
                      addMiscRows?.map((rowData, i) => {
                        return <tr key={i}>
                        <td align="center">1</td>
                        <td align="left">
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleMiscInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              autoComplete='off'
                              autoFocus
                            />
                          
                        </td>
                        <td align="left">
                            <input
                              type="text"
                              name="criteria"
                              value={rowData.criteria}
                              onChange={handleMiscInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="center">
                            <div>
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.pcs}
                              onChange={handleMiscInputChange}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.wt}
                              onChange={handleMiscInputChange}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                            </div>
                          
                        </td>
                        <td align="left">
                            <input
                              type="text"
                              name="supplier"
                              value={rowData.supplier}
                              onChange={handleMiscInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="right">
                            <input
                              type="text"
                              name="rate"
                              value={rowData.rate}
                              onChange={handleMiscInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="right">
                            <input
                              type="text"
                              name="amount"
                              value={rowData.amount}
                              onChange={handleMiscInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="center">
                          <Tooltip title="Mark Up Details"><Button onClick={() => markUpModalOpen()} sx={{width:'50px', color:'black'}}><VisibilityIcon  /></Button></Tooltip>
                        </td>
                        <td align="center">
                            <Button sx={{width:'50px'}} onKeyDown={handleMiscKeyDown}><AddCircleIcon
                                  titleAccess="Add Entry"
                                  onClick={handleMiscAddRow}
                                  style={{ cursor: "pointer" }}
                          /></Button>
                        </td>
                      </tr>
                      })
                    }
                  </tbody>
                </table>
      
                  <div className='d-flex justify-content-center align-items-center w-100'><Button variant='contained' onClick={() => handleSaveMiscDetails()}>Save Misc Details</Button></div>

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
                      width: "95%",
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
                    }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between p-1'>
                    <div></div>
                    <div><Typography variant='h6'>Add Finding Details</Typography></div>
                    <div><Tooltip title="Close" onClick={() => setAddFindingInfoPopUp(false)} style={{cursor:'pointer'}}><CancelIcon /></Tooltip></div>
                </div>
                <div className='w-100'>
                <table className='table'>
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
                <th align='center'>Add</th>
              </tr>
            </thead>
            <tbody>
                    {
                      addFindingRows?.map((rowData, i) => {
                        return <tr key={i}>
                        <td align="center">1</td>
                        <td align="left">
                            <input
                              type="text"
                              name="type"
                              value={rowData.type}
                              onChange={handleFindingInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                              autoComplete='off'
                              autoFocus
                            />
                          
                        </td>
                        <td align="left">
                            <input
                              type="text"
                              name="criteria"
                              value={rowData.criteria}
                              onChange={handleFindingInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="center">
                            <div>
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.pcs}
                              onChange={handleFindingInputChange}
                              style={{width:'40px', marginRight:'2px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                            <input
                              type="text"
                              name="pcsWt"
                              value={rowData.wt}
                              onChange={handleFindingInputChange}
                              style={{width:'60px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                            </div>
                          
                        </td>
                        <td align="left">
                            <input
                              type="text"
                              name="supplier"
                              value={rowData.supplier}
                              onChange={handleFindingInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="right">
                            <input
                              type="text"
                              name="rate"
                              value={rowData.rate}
                              onChange={handleFindingInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="right">
                            <input
                              type="text"
                              name="amount"
                              value={rowData.amount}
                              onChange={handleFindingInputChange}
                              style={{width:'100px', border: "1px solid #ccc"}}
                              className='onfocus_snv'
                            />
                        </td>
                        <td align="center">
                          <Tooltip title="Mark Up Details"><Button onClick={() => markUpModalOpen()} sx={{width:'50px', color:'black'}}><VisibilityIcon  /></Button></Tooltip>
                        </td>
                        <td align="center">
                            <Button sx={{width:'50px'}} onKeyDown={handleFindingKeyDown}><AddCircleIcon
                                  titleAccess="Add Entry"
                                  onClick={handleFindingAddRow}
                                  style={{ cursor: "pointer" }}
                          /></Button>
                        </td>
                      </tr>
                      })
                    }
                  </tbody>
                </table>
      
                  <div className='d-flex justify-content-center align-items-center w-100'><Button variant='contained' onClick={() => handleSaveFindingDetails()}>Save Finding Details</Button></div>

                </div>
              </div>
            </Box>

          </Modal>
        }
        </div>
        </>
        }


        <div className='d-flex align-items-center justify-content-center pb-2'>
          <div className="m-1">
            <button className='btn btn-success fs_sn_fgp' style={{minWidth:'100px'}}>Save</button>
          </div>
          <div className="m-1">
            <button className='btn btn-success fs_sn_fgp' onClick={() => dispatch(handleSaveAndNextFlag(false))} style={{minWidth:'100px'}}>Save & New</button>
          </div>
          <div className="m-1">
            <button className='btn btn-success fs_sn_fgp' style={{minWidth:'100px'}}>Save & Print</button>
          </div>
        </div>

      </div>

    </div>
    </>
  )
}

export default SaveNNext;