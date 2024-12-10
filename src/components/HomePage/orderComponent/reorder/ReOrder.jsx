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

import React from 'react'
import "./reorder.css"
import { handleSaveAndNextFlag } from '../../../../redux/slices/HomeSlice';
import { useDispatch } from 'react-redux';

const ReOrder = () => {
  const dispatch = useDispatch();
  return (
    <div className="reorder_component">
      <div className="form-group mt-4 mb-2">
        <label htmlFor="design" className="form-label pe-2">Design:</label>
        <input type="text" placeholder="design#" autoFocus className="form-input"/>
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
        <button className="btn btn-warning save-btn" onClick={() => dispatch(handleSaveAndNextFlag(true))}>SAVE AND NEXT</button>
      </div>

      {/* Table Section */}
      <div className="table-container border p-2">
        <div className="table-header d-flex justify-content-between align-items-center flexCol_re">
          <div>DESIGN NO: L-1245455</div>
          <div className="d-flex align-items-center flexCol_re">
            <select name="" id="" className="select-box me-2">
              <option value="" selected disabled>Issue By</option>
              <option value="powise">PO wise</option>
              <option value="jobwise">Job wise</option>
              <option value="batchwise">Batch wise</option>
              <option value="designwise">Design wise</option>
            </select>
            <button className="btn btn-secondary action-btn">Receive Now</button>
            <button className="btn btn-secondary action-btn">Receive & Close</button>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper mt-3 overflow-x-scroll">
          <table className="table ">
            <thead>
              <tr>
                <th>Material</th>
                <th>Description</th>
                <th>Tunch</th>
                <th>Wastage</th>
                <th>Issue Wt</th>
                <th>Mark Up</th>
                <th>Mark Up On</th>
                <th>Remaining Wt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>METAL</td>
                <td>GOLD 14K YW PRL GREEN MIX DEFAULT</td>
                <td><input type="text" className="table-input" /></td>
                <td><input type="text" className="table-input" /></td>
                <td><input type="text" className="table-input" /></td>
                <td><input type="text" className="table-input" /></td>
                <td>
                  <select name="" id="" className="select-box">
                    <option value="">Select</option>
                  </select>
                </td>
                <td>12/14.356</td>
              </tr>
              <tr>
                <td>METAL</td>
                <td>GOLD 14K YW</td>
                <td><input type="text" className="table-input" /></td>
                <td><input type="text" className="table-input" /></td>
                <td><input type="text" className="table-input" /></td>
                <td><input type="text" className="table-input" /></td>
                <td>
                  <select name="" id="" className="select-box">
                    <option value="">Select</option>
                  </select>
                </td>
                <td>12/14.356</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReOrder;
