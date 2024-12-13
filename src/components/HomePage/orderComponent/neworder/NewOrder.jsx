
import React, { useEffect, useState } from 'react';
import './neworder.css';
import { handleSaveAndNextFlag } from '../../../../redux/slices/HomeSlice';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';

const NewOrder = () => {

  const [tagGenerate, setTagGenerate] = useState(false);
  const [addSubTag, setAddSubTag] = useState(false);

  const dispatch = useDispatch();

  const handleSaveNNext = () => {
    // Dispatch the action to show SaveAndNext component in HomePage
    dispatch(handleSaveAndNextFlag(true));
  };

  const handleChangeTagGenerate = () => {
      setTagGenerate((prev) => !prev);
  }

  const handleChangeAddSubTag = () => {
      setAddSubTag((prev) => !prev);
  }


  return (
    <>
      <div className="neworder_component">
        <div className='d-flex align-items-center'>
          <div style={{height:'32px'}}>{ tagGenerate ? <h4 className='text-secondary'>Tag Entry</h4> : <h4 className='text-secondary' style={{ display: addSubTag ? 'none' : 'block' }}>Bulk Job Entry</h4>}</div>
          <div style={{height:'32px'}}>{ addSubTag ? <h4 className='text-secondary'>Make Your Sub Entry</h4> : <h4 className='text-secondary' style={{ display: tagGenerate ? 'none' : 'block' }}></h4>}</div>
        </div>
        <div className="filter_grid mt-3">
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>Brand</option>
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>Collection</option>
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>Category</option>
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>Sub Category</option>
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>Product Type</option>
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>Gender</option>
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>Occasion</option>
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>Style</option>
            </select>
          </div>
          <div>
            <select name="" id="" className='categoryNewOrder'>
              <option value="" disabled selected>HSN</option>
            </select>
          </div>
        </div>
        <div className="action_section mt-4">
          <div className="radio_group">
            <input type="checkbox" value={tagGenerate} checked={tagGenerate}  id="tag" onChange={() => handleChangeTagGenerate()}  />
            <label htmlFor="tag" className='user-select-none pb-0 pt-1' >Tag Generate</label>
          </div>
          <div className="radio_group">
            <input type="checkbox" value={addSubTag} checked={addSubTag} id="subtag" onChange={() => handleChangeAddSubTag()} />
            {/* <label htmlFor="subtag" className='user-select-none pb-0 pt-1'><Tooltip title="Make Your Sub Entry" style={{cursor:'pointer'}}>Add Sub Tag</Tooltip></label> */}
            <label htmlFor="subtag" className='user-select-none pb-0 pt-1'>Add Sub Tag</label>
          </div>
          <button className="btn btn-warning save_button" onClick={() => handleSaveNNext()}>SAVE AND NEXT</button>
        </div>
      </div>
    </>
  );
};

export default NewOrder;
