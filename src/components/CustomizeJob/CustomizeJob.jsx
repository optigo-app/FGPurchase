import React from 'react';
import "./customizejob.css";
import { useDispatch } from 'react-redux';
import { handleCustomizeJobFlag } from '../../redux/slices/HomeSlice';
import { Settings } from '@mui/icons-material';
import DeleteIcon from "../../assets/images/delete.png";
import  EditIcon  from '@mui/icons-material/Edit';
const CustomizeJob = () => {
    const dispatch = useDispatch();
  return (
    <>
    <div className='customizejob_container'>
        <div className='py-2 ps-2 text-secondary fw-bold headline_cmj'>Customize Job No <span className='text-dark'>1/12345</span></div>
        {/* Job Line */}
        <div className="job-info">
            <div>Tag No: <b className="text-primary">1/12566</b></div>
            <div>Net Wt: <b className="text-primary">2.256 gm</b></div>
            <div>Pure Wt: <b className="text-primary">1.256</b></div>
            <div>Dia: <b className="text-primary">2.256 cts</b></div>
            <div>Amount: <b className="text-primary">120000</b></div>
        </div>
        <div className="filters-container_cjob">
            <div className="filter-item">
                <label htmlFor="metallosson">Metal Loss On</label>
                <select name="metallosson" id="metallosson">
                    <option value="" disabled selected>Net Weight</option>
                </select>
            </div>
            <div className="filter-item">
                <label htmlFor="MetLoss">Metal Loss By</label>
                {/* <input type="text" placeholder="" id='MetLoss' /> */}
                <select name="MetLoss" id="MetLoss">
                    <option value=""  selected disabled></option>
                    <option value="" >Wt</option>
                    <option value="" >Percentage</option>
                </select>
            </div>
            <div className="filter-item">
                <label htmlFor="making">Metal Loss</label>
                <input type="text" placeholder="" id='making' />
            </div>
            <div className="filter-item">
                <label htmlFor="makingrate">Making Rate</label>
                <input type="text" placeholder="" id='makingrate' />
            </div>
            
            <div className="filter-item">
                <label htmlFor="makingon">Making On</label>
                <select name="makingon" id="makingon">
                    <option value="" disabled selected>Net Weight</option>
                </select>
            </div>

            <div className="filter-item">
                <label htmlFor="handling">Handling</label>
                <input type="text" placeholder="" id='handling' />
            </div>

        </div>

        <div >
            <table className='table'>
                <thead>
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
                        <th>Edit</th>
                        <th>Del</th>
                        <th>Apply</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align='left' style={{cursor:'pointer'}}><span>1/271928</span> <br /><span className="smallText">D#: LR23453</span></td>
                        <td></td>
                        <td>PD 18K</td>
                        <td>10.400</td>
                        <td>10.000</td>
                        <td>2.700</td>
                        <td>2.900</td>
                        <td>20000</td>
                        <td><Settings /></td>
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
                        <td><EditIcon titleAccess='Edit' /></td>
                        <td><img src={DeleteIcon} alt="#delete" title='Delete' style={{height:'20px', width:'20px', cursor:'pointer'}} /></td>
                        <td>
                            <button className='btn btn-warning p-1' onClick={() => dispatch(handleCustomizeJobFlag(false))}>Save</button></td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
    </>
  )
}

export default CustomizeJob