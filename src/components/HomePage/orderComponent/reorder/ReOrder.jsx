// import React from 'react'
// import "./reorder.css"
// const ReOrder = () => {
//   return (
//     <div className='reorder_component'>
//       <div className='mt-4 mb-2'>
//           <label htmlFor="design" className='me-2 form-label'>Design : </label>
//           <input type="text" placeholder='design#'  autoFocus />
//       </div>
//       <div className='mb-4 mt-4 d-flex justify-content-start align-items-center'>
//         <div className='mx-2'>
//           <input type="radio" value="tag" name='addtag' id='tag' /><label htmlFor="tag" className='mx-1'>Apply As Tag</label>
//         </div>
//         <div className='mx-2'>
//           <input type="radio" value="subtag" name='addtag' id='subtag' /><label htmlFor="subtag" className='mx-1'>Add Sub Tag</label>
//         </div>
//         <button className='btn btn-warning p-1 pt-0 pb-0 px-2'>SAVE AND NEXT</button>
//       </div>
//       <div className='tableContainerMaxWidth border p-1 pt-2'>
//         <div className='d-flex justify-content-between align-items-center border-bottom pb-2' >
//             <div>DESIGN NO : L-1245455</div>
//             <div className='d-flex align-items-center'>
//               <div className='me-2'>
//                 <select name="" id="">
//                   <option value="issueby">Issue By</option>
//                 </select>
//               </div>
//               <button className='btn btn-secondary p-1 pt-0 pb-0 px-2 me-2'>Receive Now</button>
//               <button className='btn btn-secondary p-1 pt-0 pb-0 px-2'>Receive & Close</button>
//             </div>
//         </div>
//         <div className='mt-3'>
//           <table className='table table-primary'>
//             <thead>
//               <tr>
//                 <th>MATERIAL</th>
//                 <th>DESCRIPTION</th>
//                 <th>TUNCH</th>
//                 <th>WASTAGE</th>
//                 <th>ISSUE WT</th>
//                 <th>MARKUP</th>
//                 <th>MARKUPON</th>
//                 <th>REMAINING WT</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>METAL</td>
//                 <td>GOLD 14K YW PRL GREEN MIX DEFAULT</td>
//                 <td align='center'><input type="text" style={{width:'50px', border:'1px solid #989898'}} /></td>
//                 <td align='center'><input type="text" style={{width:'50px', border:'1px solid #989898'}} /></td>
//                 <td align='center'><input type="text" style={{width:'50px', border:'1px solid #989898'}} /></td>
//                 <td align='center'><input type="text" style={{width:'50px', border:'1px solid #989898'}} /></td>
//                 <td align='center'>
//                   <select name="" id="">
//                     <option value="">Select</option>
//                   </select>
//                 </td>
//                 <td>12/14.356</td>
//               </tr>
//               <tr>
//                 <td>METAL</td>
//                 <td>GOLD 14K YW</td>
//                 <td align='center'><input type="text" style={{width:'50px', border:'1px solid #989898'}} /></td>
//                 <td align='center'><input type="text" style={{width:'50px', border:'1px solid #989898'}} /></td>
//                 <td align='center'><input type="text" style={{width:'50px', border:'1px solid #989898'}} /></td>
//                 <td align='center'><input type="text" style={{width:'50px', border:'1px solid #989898'}} /></td>
//                 <td align='center'>
//                   <select name="" id="">
//                     <option value="">Select</option>
//                   </select>
//                 </td>
//                 <td>12/14.356</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ReOrder;

import React, { useState } from 'react'
import "./reorder.css"
import { handleSaveAndNextFlag } from '../../../../redux/slices/HomeSlice';
import { useDispatch } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Modal, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const ReOrder = () => {
  
  const dispatch = useDispatch();
  const [markUpModal, setMarkUpModal] = useState(false);
  const [addWtModal, setAddWtModal] = useState(false);
  const remainingWt = 15;
  const [wt, setWt] = useState('');
  
  const markUpModalOpen = () => {
    setMarkUpModal(true);
  }
  const handleWtChange = (e) => {
      setWt(e.target.value);
      if(e.target.value > remainingWt){
        setAddWtModal(true);
      }
  }

  return (
    <div className="reorder_component">
      <div className='d-flex align-items-end '>
        <div className='mx-1'>
          <select name="jdwise" id="jdwise" className='reorder_dropdwon'>
            <option value="" selected disabled>Select</option>
            <option value="designno">Design No</option>
            <option value="jobno">Job No</option>
          </select>
        </div>
        <div className="  mx-1">
          <label htmlFor="design" className="form-label pe-2">Design:</label>
          <input type="text" placeholder="design#" autoFocus className="form-input"/>
        </div>
      </div>

      {/* Radio Buttons and Button */}
      <div className="radio-buttons mt-4 mb-4">
        <div className="radio-option">
          <input type="radio" value="tag" name="addtag" id="tag" />
          <label htmlFor="tag" className="mx-1">Apply As Tag</label>
        </div>
        <div className="radio-option">
          <input type="radio" value="subtag" name="addtag" id="subtag" />
          <label htmlFor="subtag" className="mx-1">Add Sub Tag</label>
        </div>
        {/* <button className="btn btn-warning save-btn" onClick={() => dispatch(handleSaveAndNextFlag(true))}>SAVE AND NEXT</button> */}
      </div>

      {/* Table Section */}
      <div className="table-container border p-2">
        <div className="table-header d-flex justify-content-between align-items-center flexCol_re">
          <div>DESIGN NO: L-1245455</div>
          <div className="d-flex align-items-center flexCol_re">
            {/* <select name="" id="" className="select-box me-2">
              <option value="" selected disabled>Issue By</option>
              <option value="powise">PO wise</option>
              <option value="jobwise">Job wise</option>
              <option value="batchwise">Batch wise</option>
              <option value="designwise">Design wise</option>
            </select> */}
            {/* <button className="btn btn-secondary action-btn">Receive Now</button>
            <button className="btn btn-secondary action-btn">Receive & Close</button> */}
            <button className="btn btn-warning save-btn" onClick={() => dispatch(handleSaveAndNextFlag(true))}>SAVE AND NEXT</button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper mt-3 d-flex justify-content-center align-items-center">
          <table className="table " style={{maxWidth:'1200px'}}>
            <thead>
              <tr>
                <th>Material</th>
                <th>Description</th>
                <th>Issue Pcs</th>
                <th>Issue Wt</th>
                <th>Mark Up</th>
                <th>Remaining Wt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>METAL</td>
                <td>GOLD 14K YW PRL GREEN MIX DEFAULT / 76 / 10.567</td>
                <td><input type="text" className="table-input" /></td>
                <td><input type="text" className="table-input" value={wt} onChange={(e) => handleWtChange(e)} /></td>
                <td><VisibilityIcon onClick={() => markUpModalOpen()} /></td>
                <td>{remainingWt}</td>
              </tr>
              <tr>
                <td>DIAMOND</td>
                <td>RND VVS PD PD / 76 / 10.567 </td>
                <td><input type="text" className="table-input" /></td>
                <td><input type="text" className="table-input" /></td>
                <td><VisibilityIcon onClick={() => markUpModalOpen()} /></td>
                <td>{remainingWt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
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
      {
          addWtModal && <Modal
            open={addWtModal}
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
                maxHeight: 300,
                bgcolor: 'background.paper',
                borderRadius: '12px',
                boxShadow: 24,
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight:190,
                border: 'none',
              }}
            >
              <div className='w-100'>
                <div className='d-flex align-items-center justify-content-between pb-2'>
                  <div>&nbsp;</div>
                  <h4 className='text-secondary  px-0 text-center w-100  fw-bold'></h4>
                  <div><CancelIcon style={{cursor:'pointer'}} onClick={() => setAddWtModal(false)} /></div>
                </div>
                <div className='pt-2 d-flex flex-column justify-content-center align-items-center'>
                  <div><Typography>Material Exceeds Issue Wt?</Typography></div>
                  <div><Typography>Do You Want to Add?</Typography></div>
                  <div className='mt-2'>
                    <Button variant='contained' color='primary' sx={{fontWeight:'bold', mx:1}} size='small' onClick={() => setAddWtModal(false)} >Manufacturer</Button>or
                    <Button variant='contained' color='primary' sx={{fontWeight:'bold', mx:1}} size='small' onClick={() => setAddWtModal(false)} >Company</Button>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        }
    </div>
  )
}

export default ReOrder;
