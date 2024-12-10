import React, { useState } from 'react'
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
import { Tooltip, Modal, Box, Button } from '@mui/material';
import FileUploaderMultiple from './FileUploaderMultiple';
import CancelIcon from '@mui/icons-material/Cancel';
import MountGrid from './MountGrid';
import IssuedMaterial from './IssuedMaterial';
const SaveNNext = () => {
  const dispatch = useDispatch();
  const mountModal = useSelector(state => state?.home?.mountModal);
  console.log(mountModal);
  const issuedMaterialModal = useSelector(state => state?.home?.issuedMaterialModal);
  
  const [materialSelectedValue, setMaterialSelectedValue] = useState('diamond');
  const [showUpdateFields, setShowUpdateFields] = useState(false);
  const [markUpModal, setMarkUpModal] = useState(false);

  const [addMoreMaterial, setAddMoreMaterial] = useState(false);

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
    // Add logic to save updated data to backend or state
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
      </div>

      <div className="filters-container_sn">
        <div className="filter-item">
          <input type="text" placeholder="HSN" />
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
        {/* <div className="filter-item">
          <input type="text" placeholder="Sales Lab" />
        </div> */}
        <div className="filter-item">
          <input type="text" placeholder="HUID No" />
        </div>
        <div className="filter-item d-flex justify-content-center align-items-center w-100">
          <Tooltip title="Change Criteria" style={{cursor:'pointer'}}><SettingsIcon /></Tooltip>
        </div>
        {/* <div className="filter-item">
          <div className='d-flex align-items-center'>
            <input type="text" placeholder="Dia. Wt" style={{maxWidth:'75px'}} />
            <span className='addIcon_svn'><Tooltip title="Add Diamond"><AddIcon /></Tooltip></span>
          </div>
        </div>
        <div className="filter-item">
          <div className='d-flex align-items-center'>
            <input type="text" placeholder="Cs. Wt" style={{maxWidth:'75px'}} />
            <span className='addIcon_svn'><Tooltip title="Add Colorstone"><AddIcon /></Tooltip></span>
          </div>
        </div> */}
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
          <input type="text" placeholder="Dia.Wt" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Cs.Wt" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Misc Wt" />
        </div>
        {/* <div className="filter-item">
          <input type="text" placeholder="Loss On" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Loss" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Metal Rate" />
        </div> */}
        {/* <div className="filter-item">
          <input type="text" placeholder="Labour" />
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Sales Labour" />
        </div> */}
        {/* <div className="filter-item">
          <button className='btn btn-success fs_sn_fgp' style={{minWidth:'100px'}}>Save</button>
        </div>
        <div className="filter-item">
          <button className='btn btn-success fs_sn_fgp' onClick={() => dispatch(handleSaveAndNextFlag(false))} style={{minWidth:'100px'}}>Save & New</button>
        </div>
        <div className="filter-item">
          <button className='btn btn-success fs_sn_fgp' style={{minWidth:'100px'}}>Save & Print</button>
        </div> */}
      </div>
      <div className="filters-container3_sn">
        <div className="filter-item">
            <input type="text" placeholder="Labour" />
          </div>
          <div className="filter-item">
            <input type="text" placeholder="Sales Labour" />
          </div>
      </div>
      <div className='d-flex align-items-center'>
        <label htmlFor="remark" className='form-label pe-2 mb-0'>Remark</label>
        <textarea name="remark" id="remark" cols="60" rows="3" className='remark_area_Snv'>
        </textarea>
      </div>
      { !addMoreMaterial && <div className='mt-3' onClick={() => setAddMoreMaterial(true)}><Button size='small' color='warning' variant='contained'>Add Material Details</Button></div>}

      <div>
        {
         addMoreMaterial && <>
          <div className='d-flex justify-content-between align-items-center mb-2 pt-3'>
          <h5 className='ps-2'>Add Material Details</h5>
          <div className='d-flex justify-content-between align-items-center'>
            <div><Tooltip title="Mount"><button className='p-1 py-0 btn btn-secondary mx-1' onClick={() => dispatch(handleMountModal(true))} >M</button></Tooltip></div>
            <div><Tooltip title="Issued Material"><button className='p-1 py-0 px-2 btn btn-primary mx-1' onClick={() => dispatch(handleIssuedMaterialModal(true))} >i</button></Tooltip></div>
            {/* <div><button className='p-1 py-0 px-2 btn btn-warning mx-1' title=''>D</button></div> */}
          </div>
          { mountModal && <MountGrid /> }
          { issuedMaterialModal && <IssuedMaterial /> }
          </div>

        <div className="filters-container2">
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
        {/* { materialSelectedValue == 3 && <div className="filter-item">
          <div className='d-flex justify-content-center align-items-center'>
            <input type="checkbox" id='addgrosswt' style={{width:'20px'}} /><label htmlFor="addgrosswt" className='ps-1 user-select-none minWGwt'>Add In GrossWt</label>
          </div>
        </div>} */}
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
        {/* <div className="filter-item">
        <select name="salerateon" id="salerateon">
            <option value="salerateon">Sale Rate On</option>
          </select>
        </div>
        <div className="filter-item">
          <input type="text" placeholder="Sale Rate" />
        </div> */}
        
        
        </div>



        {/* <div style={{overflowX:'scroll', maxHeight:'245px'}}> */}
        <div style={{maxHeight:'245px'}}>
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
        </table>
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
        </div>
        </>
        }

        <div className='d-flex flex-wrap justify-content-center align-items-center p-1 py-3'>
          {/* <div className=' '>
                <FileUploaderMultiple />
          </div> */}
          {/* <div className='d-flex align-items-center ps-3'>
            <label htmlFor="Remark" className='pe-2'>Remark : </label>
            <textarea name="Remark" id="Remark" cols="60" rows="3"></textarea>
          </div> */}
        </div>

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