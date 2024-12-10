// import React from 'react'
// import "./jobbased.css";
// const JobBased = () => {
//   return (
//     <>
//     <div className='jobbased_container'>
//       <div className='mt-3 mb-3 d-flex justify-content-start align-items-end'>
//         <select name="" id="" className='mx-2'>
//           <option value="">Search By</option>
//         </select>
//         <div className='d-flex flex-column'>
//           <label htmlFor="searchBy" className='text-secondary'>Jobno/ PO no/ customer code/ designno/ all</label>
//           <input type="text" style={{height:'23px'}} id='searchBy' autoFocus />
//         </div>
//       </div>
//       <div className='tableContainerMaxWidth mt-5 mb-3 '>
//         <table className='table table-warning'>
//           <thead>
//             <tr>
//               <th>Sr#</th>
//               <th>Jobno#</th>
//               <th>Design#</th>
//               <th>Custome code</th>
//               <th>Metal</th>
//               <th>Category</th>
//               <th>Procced</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>1</td>
//               <td>1/53543(25)</td>
//               <td>T321</td>
//               <td>bunty</td>
//               <td>GOLD 18K Y</td>
//               <td>women ring</td>
//               <td style={{color:'blue', textDecoration:'underline'}}>Procced</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//     </>
//   )
// }

// export default JobBased
import React from 'react';
import './jobbased.css';
import { useDispatch } from 'react-redux';
import { handleSaveAndNextFlag } from '../../../../redux/slices/HomeSlice';

const JobBased = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className='jobbased_container'>
        <div className='mt-3 mb-3 d-flex justify-content-start align-items-end'>
          {/* <select name="" id="" className='search-select mx-2'>
            <option value="">Search By</option>
          </select> */}
          <div className='mb-2 fw-semibold mx-1'>Search By</div>
          <div className='d-flex flex-column'>
            <label htmlFor="searchBy" className='text-secondary search-label'>Jobno/ PO no/ customer code/ designno/ all</label>
            <input type="text" style={{ height: '35px' }} id='searchBy' autoFocus className='search-input' />
          </div>
        </div>
        <div className='tableContainerMaxWidth mt-5 mb-3'>
          <table className='table table-bordered table-hover'>
            <thead className='thead-light'>
              <tr>
                <th>Sr#</th>
                <th>Jobno#</th>
                <th>Design#</th>
                <th>Customer Code</th>
                <th>PO</th>
                <th>Metal</th>
                <th>Category</th>
                <th>Proceed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1/53543(25)</td>
                <td>T321</td>
                <td>bunty</td>
                <td>PO NUMBER</td>
                <td>GOLD 18K Y</td>
                <td>women ring</td>
                <td className='proceed-btn' onClick={() => dispatch(handleSaveAndNextFlag(true))}>Proceed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default JobBased;
