
import React, { useEffect, useState } from 'react';
import './neworder.css';
import { handleaddSubtagFlag, handleSaveAndNextFlag } from '../../../../redux/slices/HomeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Tooltip, useTheme } from '@mui/material';
import { brandMainData, categorymainData, collectionMainData, genderMainData, occasionMainData, productTypeMainData, styleMainData, subCategoryMainData } from '../../../../master/MasterData';
import { capitalizeWords } from '../../../../master/global';
import { TbSend } from 'react-icons/tb';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const NewOrder = () => {

  const theme = useTheme();

  const [tagGenerate, setTagGenerate] = useState(false);
  const addSubTag = useSelector((state) => state?.home?.addSubtag);
  const mode = useSelector((state) => state?.fgp?.mode);
  
  // const [addSubTag, setAddSubTag] = useState(false);

  const dispatch = useDispatch();

  const handleSaveNNext = () => {
    // Dispatch the action to show SaveAndNext component in HomePage
    dispatch(handleSaveAndNextFlag(true));
  };

  const handleChangeTagGenerate = () => {
      setTagGenerate((prev) => !prev);
  }

  const handleChangeAddSubTag = () => {
      // setAddSubTag((prev) => !prev);
      dispatch(handleaddSubtagFlag(!addSubTag));
  }

  
  
  
  


  return (
   <>
    <>
      <div className="neworder_component">
        <div className='d-flex align-items-center'>
          <div style={{height:'32px'}}>{ tagGenerate ? <h4 className='text-secondary fs_fgp'>Tag Entry</h4> : <h4 className='text-secondary fs_fgp' style={{ display: addSubTag ? 'none' : 'block' }}>Bulk Job Entry</h4>}</div>
          <div style={{height:'32px'}}>{ addSubTag ? <h4 className='text-secondary fs_fgp'>Make Your Sub Entry</h4> : <h4 className='text-secondary fs_fgp' style={{ display: tagGenerate ? 'none' : 'block' }}></h4>}</div>
        </div>
        <div className="filter_grid mt-3">
        <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Product Type</option>
              {
                productTypeMainData?.map((e, i) => {
                  return <option value={e?.typeCode} key={i}>{capitalizeWords(e?.typeName)}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Brand</option>
              {
                brandMainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Collection</option>
              {
                collectionMainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Category</option>
              {
                categorymainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Sub Category</option>
              {
                subCategoryMainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                })
              }
            </select>
          </div>
          
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Gender</option>
              {
                genderMainData?.map((e, i) => {
                  return <option value={e?.genderCode} key={i}>{capitalizeWords(e?.genderName)}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Occasion</option>
              {
                occasionMainData?.map((e, i) => {
                  return <option value={e?.occasionCode} key={i}>{capitalizeWords(e?.occasionName)}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Style</option>
              {
                styleMainData?.map((e, i) => {
                  return <option value={e?.styleCode} key={i}>{capitalizeWords(e?.styleName)}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>HSN</option>
            </select>
          </div>
        </div>
        <div className="action_section mt-4">
          <div className="radio_group">
            <input type="checkbox" value={tagGenerate} checked={tagGenerate}  id="tag" onChange={() => handleChangeTagGenerate()}  />
            <label htmlFor="tag" className='user-select-none pb-0 pt-1 fs_fgp' >Tag Generate</label>
          </div>
          <div className="radio_group">
            <input type="checkbox" value={addSubTag} checked={addSubTag} id="subtag" onChange={() => handleChangeAddSubTag()} />
            {/* <label htmlFor="subtag" className='user-select-none pb-0 pt-1'><Tooltip title="Make Your Sub Entry" style={{cursor:'pointer'}}>Add Sub Tag</Tooltip></label> */}
            <label htmlFor="subtag" className='user-select-none pb-0 pt-1 fs_fgp'>Add Sub Tag</label>
          </div>
          {/* <button className="btn btn-warning save_button" onClick={() => handleSaveNNext()}>SAVE AND NEXT</button> */}
          {/* <Button variant='contained' size='small' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} className='fs_fgp' onClick={() => handleSaveNNext()}>SAVE AND NEXT</Button> */}
          <Button variant='contained' size='small' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} endIcon={<ArrowForwardIcon style={{ color: 'white',  }} />} className='fs_fgp' onClick={() => handleSaveNNext()}>Next </Button>
        </div>
      </div>
      {
        addSubTag &&
        <div className="neworder_component mt-1">
        <div className='d-flex align-items-center'>
          <div style={{height:'32px'}}>{ tagGenerate ? <h4 className='text-secondary fs_fgp'>Tag Entry</h4> : <h4 className='text-secondary fs_fgp' style={{ display: addSubTag ? 'none' : 'block' }}>Bulk Job Entry</h4>}</div>
          <div style={{height:'32px'}}>{ addSubTag ? <h4 className='text-secondary fs_fgp'>Make Your Sub Entry</h4> : <h4 className='text-secondary fs_fgp' style={{ display: tagGenerate ? 'none' : 'block' }}></h4>}</div>
        </div>
        <div className="filter_grid mt-3">
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Brand</option>
              {
                brandMainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{e?.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Collection</option>
            {
              collectionMainData?.map((e, i) => {
                return <option value={e?.code} key={i}>{e?.name}</option>
              })
            }
              
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Category</option>
              {
                categorymainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{e?.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Sub Category</option>
              {
                subCategoryMainData?.map((e, i) => {
                  return <option value={e?.code} key={i}>{e?.name}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Product Type</option>
              {
                productTypeMainData?.map((e, i) => {
                  return <option value={e?.typeCode} key={i}>{e?.typeName}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Gender</option>
              {
                genderMainData?.map((e, i) => {
                  return <option value={e?.genderCode} key={i}>{e?.genderName}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Occasion</option>
              {
                occasionMainData?.map((e, i) => {
                  return <option value={e?.occasionCode} key={i}>{e?.occasionName}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>Style</option>
              {
                styleMainData?.map((e, i) => {
                  return <option value={e?.styleCode} key={i}>{e?.styleName}</option>
                })
              }
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder fs_fgp fs_fgp_select'>
              <option value="" disabled selected>HSN</option>
            </select>
          </div>
        </div>
        <div className="action_section mt-4">
          <div className="radio_group">
            <input type="checkbox" value={tagGenerate} checked={tagGenerate}  id="tag" onChange={() => handleChangeTagGenerate()}  />
            <label htmlFor="tag" className='user-select-none pb-0 pt-1 fs_fgp' >Tag Generate</label>
          </div>
          <div className="radio_group">
            <input type="checkbox" value={addSubTag} checked={addSubTag} id="subtag" onChange={() => handleChangeAddSubTag()} />
            {/* <label htmlFor="subtag" className='user-select-none pb-0 pt-1'><Tooltip title="Make Your Sub Entry" style={{cursor:'pointer'}}>Add Sub Tag</Tooltip></label> */}
            <label htmlFor="subtag" className='user-select-none pb-0 pt-1'>Add Sub Tag</label>
          </div>
          {/* <button className="btn btn-warning save_button" onClick={() => handleSaveNNext()}>SAVE AND NEXT</button> */}
          {/* <Button variant='contained' size='small' sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} className='fs_fgp' onClick={() => handleSaveNNext()}>SAVE AND NEXT</Button> */}
          <Button variant='contained' size='small' endIcon={<ArrowForwardIcon style={{ color: 'white', }} />}
          sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} 
          className='fs_fgp' onClick={() => handleSaveNNext()}>NEXT </Button>
        </div>
      </div>
      }
    </>
   </>
  );
};

export default NewOrder;
