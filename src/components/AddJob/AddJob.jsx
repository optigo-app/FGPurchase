import React, { useEffect, useRef, useState } from 'react'
import "./addjob.css"
import NewOrder from '../HomePage/orderComponent/neworder/NewOrder';
import ReOrder from '../HomePage/orderComponent/reorder/ReOrder';
import JobBased from '../HomePage/orderComponent/jobbased/JobBased';
import SaveAndNext from '../../components/HomePage/orderComponent/savennext/SaveNNext';
import { useDispatch, useSelector } from 'react-redux';
import CustomizeJob from '../CustomizeJob/CustomizeJob';
const AddJob = () => {
    const [selectOrder, setSelectorder] = useState('neworder');
    const isSaveAndNext = useSelector(state => state?.home?.isSaveAndNext); 
    const customizeJob = useSelector(state => state?.home?.isJobCustomize); 
    const mode = useSelector(state => state?.fgp?.isJobCustomize); 
    const dispatch = useDispatch();

    const dropdownRef = useRef(null);

    // Focus the dropdown when the component mounts
    useEffect(() => {
        if (dropdownRef.current) {
            dropdownRef.current.focus();
        }
    }, []);
    
  const handleOrderSelection = (e) => {
    setSelectorder(e.target.value);
  };

  

  return (
        <>    
        { !customizeJob && <>
         {  !isSaveAndNext && <div className="order-dropdown">
 {   mode !== "alteration_issue"  && <> <label htmlFor="inwardas" className="order-label">Inward As:</label>
           <select name="inwardas" id="inwardas" value={selectOrder} onChange={handleOrderSelection} ref={dropdownRef}  >
             <option value="" disabled selected>Select Order</option>
             <option value="neworder">New Order</option>
             <option value="reorder">Re-Order</option>
             <option value="jobbased">Job Based</option>
           </select></>}
         </div>}
          
               { !isSaveAndNext && <div className="order-components">
              {selectOrder === 'neworder' && <NewOrder />}
              {selectOrder === 'reorder' && <ReOrder />}
              {selectOrder === 'jobbased' && <JobBased />}
            </div>}
            
            { isSaveAndNext && <div className="order-components">
              <SaveAndNext />
            </div>}   

            </>}


            {
                customizeJob && <CustomizeJob />
            }         

        </>
  )
}

export default AddJob