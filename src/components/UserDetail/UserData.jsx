// import React, { useState } from 'react';
// import "./userdata.css"

// const UserData = () => {
//   const [showTaxDropDown, setShowTaxDropDown] = useState(false);
//   const [showAddLess, setShowAddLess] = useState(false);
//   const handleTaxSelectionChange = (e) => {

//   }
//   return (
//     <div className='userDataContainer w-100'>
//       {/* filters */}
//       <div className='d-flex justify-content-start align-items-center my-3'>
//         <div className='mx-1'>
//           <select name="" id="">
//             <option value="bookname">Book Name</option>
//           </select>
//         </div>
//         <div className='mx-1'>
//           <select name="" id="">
//             <option value="bookname">User</option>
//           </select>
//         </div>
//         <div className='mx-1'>
//           <select name="" id="">
//             <option value="bookname">Refno</option>
//           </select>
//         </div>
//       </div>
//       {/* fields */}
//       {/* <div className='d-flex flex-wrap justify-content-between'>
//         <div className='m-1'>
//           <input type="text" className='form-control ' placeholder='sale bill' />
//         </div>
//         <div className='m-1'>
//           <input type="text" className='form-control ' placeholder='Niraj Patel' />
//         </div>
//         <div className='m-1'>
//           <input type="text"  className='form-control ' placeholder='admin12' />
//         </div>
//       </div> */}
//       {/* bill no */}
//       <div className=' border  d-flex align-items-center justify-content-between'>
//         <div className='w-25 border-end p-1 fw-bold'>BILL NO</div>
//         <div className='w-70 p-1 d-flex justify-content-center align-items-center'><div className='w-100'>SK15012024</div></div>
//       </div>
//       {/* summary */}
//       <div className='d-flex w-100 p-1 mb-2 border-bottom'>
//         <div className='w-25'>
//           <div className='center_fgp'>Amount</div><div className='center_fgp fw-bold'>7908149.86 Dr</div>
//         </div>
//         <div className='w_30_fgp'>
//           <div className='center_fgp'>Metal</div><div className='center_fgp fw-bold'>242.922 Cr Gm</div>
//         </div>
//         <div className='w-25'>
//           <div className='center_fgp'>Diamond</div><div className='center_fgp fw-bold'>	116.923 Cr Ctw</div>
//         </div>
//         <div className='w_10_fgp'>
//           <div className='center_fgp'>Reward</div><div className='center_fgp fw-bold'>0</div>
//         </div>
//       	<div className='w_10_fgp'>
//           <div className='center_fgp'>Visit</div><div className='center_fgp fw-bold'>0</div>
//         </div>
//       </div>
//       {/* table */}
//       <div>
//           <table className='table'>
//             <thead>
//               <tr>
//                 <th style={{padding:'2px'}}>Details</th>
//                 <th style={{padding:'2px'}}>GWT</th>
//                 <th style={{padding:'2px'}}>NetWt</th>
//                 <th style={{padding:'2px'}}>Amount</th>
//                 <th style={{padding:'2px'}}>Del</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td style={{display:'flex', fontSize:'12px', padding:'2px'}}><div style={{minWidth:'12px'}}>1</div><div>1/271928 <br /> <div style={{fontSize:'10px'}}>D#:CDN PD 11-10_24 _PD</div></div></td>
//                 <td style={{fontSize:'12px', padding:'2px'}}><div>3.000</div> <div style={{fontSize:'10px'}}>760.00 avg.</div></td>
//                 <td style={{fontSize:'12px', padding:'2px'}}>2.600</td>
//                 <td style={{fontSize:'12px', padding:'2px'}}>3,081.50 <div style={{fontSize:'10px'}}>1.976 pure</div></td>
//                 <td style={{fontSize:'12px', padding:'2px'}}> Del & Setting</td>
//               </tr>
//               <tr>
//                 <td style={{display:'flex', fontSize:'12px', padding:'2px'}}><div style={{minWidth:'12px'}}>1</div><div>1/271928 <br /> <div style={{fontSize:'10px'}}>D#:CDN PD 11-10_24 _PD</div></div></td>
//                 <td style={{fontSize:'12px', padding:'2px'}}><div>3.000</div> <div style={{fontSize:'10px'}}>760.00 avg.</div></td>
//                 <td style={{fontSize:'12px', padding:'2px'}}>2.600</td>
//                 <td style={{fontSize:'12px', padding:'2px'}}>3,081.50 <div style={{fontSize:'10px'}}>1.976 pure</div></td>
//                 <td style={{fontSize:'12px', padding:'2px'}}> Del & Setting</td>
//               </tr>
//               <tr>
//                   <td style={{fontSize:'12px', padding:'2px'}}>Total</td>
//                   <td style={{fontSize:'12px', padding:'2px'}}>13.230</td>
//                   <td style={{fontSize:'12px', padding:'2px'}}>11.230</td>
//                   <td style={{fontSize:'12px', padding:'2px'}}>11,000.23</td>
//                   <td></td>
//               </tr>
//             </tbody>
//           </table>
//       </div>
//       {/* table total summary, taxes and add/less */}
//       <div>
//         <div className='d-flex justify-content-between align-items-center border border-bottom-0 '>
//           <div className='w-75 p-1 border-end border-end'>Total</div>
//           <div>11,391 /-</div>
//         </div>
//         <div className='d-flex justify-content-between align-items-center border  border-bottom-0'>
//           <div className='w-75 p-1 border-end'>Privilege Discount <span className='text-primary text-decoration-underline'>(Reset)</span></div>
//           <div>0.00 /-</div>
//         </div>
//         <div className='d-flex justify-content-between align-items-center border  border-bottom-0'>
//           <div className='w-75 p-1 border-end'>Amount After Discount</div>
//           <div>11,391 /-</div>
//         </div>
//         <div className='d-flex justify-content-between align-items-center border  border-bottom-0'>
//           { !showTaxDropDown && <div className='w-75 p-1 border-end text-primary text-decoration-underline' style={{cursor:'pointer'}} onClick={() => setShowTaxDropDown(true)}>Tax (CGST + SGST)</div>}
//           { showTaxDropDown && <div className='w-75 p-1 border-end text-primary text-decoration-underline'>
//               <div>
//                 <select name="" id="" onChange={handleTaxSelectionChange}>
//                   <option value="cgst+sgst">CGST + SGST</option>
//                   <option value="igst">IGST</option>
//                   <option value="gst">GST</option>
//                 </select>
//                 <button className='btn btn-success p-1 pt-0 mx-1' style={{fontSize:'12px'}}>Apply</button>
//                 <button className='btn btn-danger p-1 pt-0 mx-1 ms-0' style={{fontSize:'12px'}}  onClick={() => setShowTaxDropDown(false)}>Close</button>
//               </div>
//             </div>}
//           <div>340.00 /-</div>
//         </div>
//         <div className='d-flex justify-content-between align-items-center border  border-bottom-0'>
//           { !showAddLess && <div className='w-75 p-1 border-end text-primary text-decoration-underline' style={{cursor:'pointer'}} onClick={() => setShowAddLess(true)}>Add/Less</div>}
//           { showAddLess && <div className='w-75 p-1 border-end '>
//               <div className='d-flex align-items-center'>
//                 <button className='btn btn-success p-1 pt-0 me-2' style={{fontSize:'12px'}}>ROUNDUP .00</button>
//                 <input type="checkbox" value='add' name='addless' id='add' /><label className='mx-1' htmlFor="add">ADD</label>
//                 <input type="checkbox" value='less' name='addless' id='less' /><label className='mx-1' htmlFor="less">LESS</label>
//                 <input type="text" style={{width:'10%', padding:'1px', height:'20px'}} />
//                 <button className='btn btn-danger pt-0 p-1 mx-1' style={{fontSize:'12px'}} onClick={() => setShowAddLess(false)}>Close</button>
//               </div>
//             </div>}
//           <div>1.00 /-</div>
//         </div>
//         <div className='d-flex justify-content-between align-items-center border '>
//           <div className='w-75 p-1 border-end fw-bold'>Final Amount</div>
//           <div className='fw-bold'>11,391.46 /-</div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default UserData

import React, { useState } from "react";
import "./userdata.css";
// import DeleteIcon from '@mui/icons-material/Delete';
import {
  handleCustomizeJobFlag,
  handleSaveAndNextFlag,
  handleSelectedButton,
} from "../../redux/slices/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../assets/images/delete.png";
import {  handlePopUpJobDetails } from "../../redux/slices/FgpSlice";
import { Settings } from "@mui/icons-material";
import JobGrid from "./JobGrid";
import "./jobgrid.css";
import  EditIcon  from '@mui/icons-material/Edit';
const UserData = () => {
  const [showTaxDropDown, setShowTaxDropDown] = useState(false);
  const [showModeOfDelDropDown, setShowModeOfDelDropDown] = useState(false);
  const [showAddLess, setShowAddLess] = useState(false);

  const dispatch = useDispatch();
  const MoreJobDetailsFlag = useSelector((state) => state?.fgp?.MoreJobDetails);
  const PopUpJobDetails = useSelector((state) => state?.fgp?.PopUpJobDetails);

  const handleTaxSelectionChange = (e) => {};

  const moveToSaveNNextPage = () => {
      dispatch(handleSaveAndNextFlag(true));
      dispatch(handleCustomizeJobFlag(false));
      dispatch(handleSelectedButton("add"));
  }

  return (
    <div className="userDataContainer">
      {/* Filters */}
      {/* <div className="filterContainer">
        <div className="filterItem">
          <select>
            <option value="bookname">Book Name</option>
          </select>
        </div>
        <div className="filterItem">
          <select>
            <option value="bookname">User</option>
          </select>
        </div>
        <div className="filterItem">
          <select>
            <option value="bookname">Refno</option>
          </select>
        </div>
      </div> */}

      {/* Filters */}
      {/* Bill Info */}
      <div className={`billInfo px-0 ${MoreJobDetailsFlag ? "w-25" : "w-100"}`}>
        <div className="billItem p-1   fw-bold">
          <span>BILL NO</span>
          <span>SK15012024</span>
        </div>
      </div>
      <div
        className={`mb-3 d-flex flex-wrap justify-content-between align-items-center ${
          MoreJobDetailsFlag ? "w-25" : "w-100"
        } bg_info px-1 py-2`}
      >
        {/* <div className="summaryItem"> */}
        <div
          className="d-flex flex-column justify-content-center align-items-start"
          style={{ width: "33.33%" }}
        >
          <div>Amount</div>
          <div className="boldText">7908149.86 Dr</div>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ width: "33.33%" }}
        >
          <div>Metal</div>
          <div className="boldText">242.922</div>
        </div>
        <div
          className="d-flex flex-column justify-content-center align-items-end"
          style={{ width: "33.33%" }}
        >
          <div>Diamond</div>
          <div className="boldText">116.923</div>
        </div>
        {/* <div className="filterItem">
          <select>
            <option value="bookname">Book Name</option>
          </select>
        </div>
        <div className="filterItem">
          <input type="text" placeholder="User" className="form-control" />
        </div>
        <div className="filterItem">
          <input type="text" placeholder="Refno" className="form-control" />
        </div> */}
      </div>

      {/* Table */}
      <div className="tableContainer">
        <table className="table">
          <thead>
            {!MoreJobDetailsFlag && (
              <tr>
                <th>Details</th>
                <th>GWT</th>
                <th>NetWt</th>
                <th>Amount</th>
                <th>Edit</th>
              </tr>
            )}
            {MoreJobDetailsFlag && (
              <tr>
                <th>Details</th>
                <th>Group#</th>
                <th>Quality</th>
                <th>Wt(G+D)</th>
                <th>GrossWt</th>
                <th>NetWt</th>
                <th>Net(24K)</th>
                <th>Amount</th>
                <th>Metal</th>
                <th>Dia CTW</th>
                <th>Dia Rate</th>
                <th>Dia Amt.</th>
                <th>CS CTW</th>
                <th>CS Rate</th>
                <th>CS Amt.</th>
                <th>MISC CTW</th>
                <th>MISC Rate</th>
                <th>MISC Amt.</th>
                <th>Make Rate</th>
                <th>Total Amt</th>
                {/* <th>Del</th> */}
              </tr>
            )}
          </thead>
          <tbody>
            {!MoreJobDetailsFlag && (
              <tr>
                <td align="left" style={{ cursor: "pointer" }}    onClick={() => {
                  dispatch(handleCustomizeJobFlag(true));
                  dispatch(handleSelectedButton("add"));
                }}>
                  <span>1/271928</span> <br />
                  <span className="smallText">D#: LR23453</span>
                </td>
                <td>
                  3.000 <br />
                </td>
                <td>2.600</td>
                <td>
                  3,081.50 <br />
                </td>
                <td align="center" valign="center">{<EditIcon style={{cursor:'pointer'}} onClick={() => moveToSaveNNextPage()} />}</td>
                {/* <td><img src={DeleteIcon} alt="#delete" title='Delete' style={{height:'20px', width:'20px', cursor:'pointer'}} /></td> */}
              </tr>
            )}
            {MoreJobDetailsFlag && (
              <tr>
                <td align="left" style={{ cursor: "pointer" }}>
                  <span>1/271928</span> <br />
                  <span className="smallText">D#: LR23453</span>
                </td>
                <td></td>
                <td>PD 18K</td>
                <td>10.400</td>
                <td>10.000</td>
                <td>2.700</td>
                <td>2.900</td>
                <td>20000</td>
                <td>
                  <Settings />
                </td>
                <td>1.040</td>
                <td>670</td>
                <td>3400</td>
                <td>2.809</td>
                <td>120</td>
                <td>680</td>
                <td>1.234</td>
                <td>230</td>
                <td>4500</td>
                <td>10000</td>
                <td>20000</td>
                {/* <td><img src={DeleteIcon} alt="#delete" title='Delete' style={{height:'20px', width:'20px', cursor:'pointer'}} /></td> */}
              </tr>
            )}
            {/* <tr onClick={() => {
              dispatch(handleCustomizeJobFlag(true))
              dispatch(handleSelectedButton('add'));
            }}>
              <td align='left' style={{cursor:'pointer'}}> <span >1/271928 </span><br /><span className="smallText">D#: LR23453</span></td>
              <td>3.000 <br /></td>
              <td>2.600</td>
              <td>3,081.50 <br /></td>
              <td><img src={DeleteIcon} alt="#delete" title='Delete' style={{height:'20px', width:'20px', cursor:'pointer'}} /></td>
            </tr> */}
            {!MoreJobDetailsFlag && (
              <tr>
                <td>Total</td>
                <td>13.230</td>
                <td>11.230</td>
                <td>11,000.23</td>
                <td></td>
                {/* <td>{<EditIcon />}</td> */}
              </tr>
            )}

            {MoreJobDetailsFlag && (
              <tr>
                <td>Total</td>
                <td></td>
                <td>PD 18K</td>
                <td>10.400</td>
                <td>10.000</td>
                <td>2.700</td>
                <td>2.900</td>
                <td>20000</td>
                {/* <td><Settings /></td> */}
                <td></td>
                <td>1.040</td>
                <td>670</td>
                <td>3400</td>
                <td>2.809</td>
                <td>120</td>
                <td>680</td>
                <td>1.234</td>
                <td>230</td>
                <td>4500</td>
                <td>10000</td>
                <td>21,000</td>
                {/* <td><img src={DeleteIcon} alt="#delete" title='Delete' style={{height:'20px', width:'20px', cursor:'pointer'}} /></td> */}
                {/* <td></td> */}
              </tr>
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-2">
          {/* { !MoreJobDetailsFlag && <span className='text-decoration-underline text-primary' style={{cursor:'pointer'}} onClick={() => dispatch(handleMoreJobDetails(true))}>Show More Job Details</span>}
          { MoreJobDetailsFlag && <span className='text-decoration-underline text-primary' style={{cursor:'pointer'}} onClick={() => dispatch(handleMoreJobDetails(false))}>Show Less Job Details</span>} */}
          <span
            className="text-decoration-underline text-primary user-select-none"
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(handlePopUpJobDetails(true))}
          >
            Show Job Details
          </span>
        </div>
      </div>

      {
        PopUpJobDetails && <JobGrid />
        
      }

      {/* Total Summary and Taxes */}
      <div className={`totalSummary ${MoreJobDetailsFlag ? "w-25" : "w-100"}`}>
        <div className="totalItem">
          <span>Total</span>
          <span>11,391 /-</span>
        </div>
        <div className="totalItem">
          <span> Discount </span>
          <span>0.00 /-</span>
        </div>
        <div className="totalItem">
          <span>Amount After Discount</span>
          <span>11,391 /-</span>
        </div>

        {/* Tax and Add/Less Dropdowns */}
        {!showTaxDropDown ? (
          <div className="d-flex justify-content-between align-items-center">
            <div className="taxOption" onClick={() => setShowTaxDropDown(true)}>
              <span>Taxes</span>
            </div>
            <span>340/-</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div className="taxOptionDropdown">
              <select
                onChange={handleTaxSelectionChange}
                className="tax_select_us"
              >
                <option value="cgst+sgst">CGST + SGST</option>
                <option value="igst">IGST</option>
                <option value="gst">GST</option>
              </select>
              <button className="btnApply">Apply</button>
              <button
                className="btnClose"
                onClick={() => setShowTaxDropDown(false)}
              >
                Close
              </button>
            </div>
            <span>340/-</span>
          </div>
        )}

        {/* Tax and Add/Less Dropdowns */}
        {!showModeOfDelDropDown ? (
          <div className="d-flex justify-content-between align-items-center">
            <div
              className="taxOption"
              onClick={() => setShowModeOfDelDropDown(true)}
            >
              <span>Mode of Delivery</span>
            </div>
            <span>340/-</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center mt-1">
            <div className="taxOptionDropdown">
              <select
                onChange={handleTaxSelectionChange}
                className="tax_select_us"
              >
                <option value="cgst+sgst">By Train</option>
                <option value="igst">By DTDC</option>
                <option value="gst">By Courier</option>
              </select>
              <button className="btnApply">Apply</button>
              <button
                className="btnClose"
                onClick={() => setShowModeOfDelDropDown(false)}
              >
                Close
              </button>
            </div>
            <span>340/-</span>
          </div>
        )}

        {!showAddLess ? (
          <div className="d-flex justify-content-between align-items-center">
            <div className="addLessOption" onClick={() => setShowAddLess(true)}>
              <span>Add/Less</span>
            </div>
            <span>1234/-</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center">
            <div className="addLessOptionDropdown mt-1">
              <input type="radio" id="add" name="addless" className="me-1" />
              <label htmlFor="add" className="me-1 fw-normal">
                Add
              </label>
              <input type="radio" id="less" name="addless" className="me-1" />
              <label htmlFor="less" className="me-1 fw-normal">
                Less
              </label>
              <input type="text" className="addLessInput" />
              {/* <button className="btnClose" onClick={() => setShowAddLess(false)}>Close</button> */}
              <button
                className="btnRoundUp fs_btn_us"
                onClick={() => setShowAddLess(false)}
              >
                ROUNDUP
              </button>
            </div>
            <div>1234 /-</div>
          </div>
        )}

        <div className="finalAmount">
          <span>Final Amount</span>
          <span className="boldText">11,391.46 /-</span>
        </div>
      </div>
    </div>
  );
};

export default UserData;
