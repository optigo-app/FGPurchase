import React, { useEffect, useRef, useState } from 'react'
import "./addjob.css"
import NewOrder from '../HomePage/orderComponent/neworder/NewOrder';
import ReOrder from '../HomePage/orderComponent/reorder/ReOrder';
import JobBased from '../HomePage/orderComponent/jobbased/JobBased';
import SaveAndNext from '../../components/HomePage/orderComponent/savennext/SaveNNext';
import { useDispatch, useSelector } from 'react-redux';
import CustomizeJob from '../CustomizeJob/CustomizeJob';
import ScanAddJob from '../AlterationIssue/ScanAddJob/ScanJobAdd';
import { handleSelectedPurchaseTabValue, handleSelectedTabValue } from '../../redux/slices/HomeSlice';
const AddJob = () => {
  const [selectOrder, setSelectorder] = useState('neworder');
  const [selectPurchase, setSelectPurchase] = useState('tagging');
  const isSaveAndNext = useSelector(state => state?.home?.isSaveAndNext);
  const customizeJob = useSelector(state => state?.home?.isJobCustomize);
  const mode = useSelector(state => state?.fgp?.mode);
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
    dispatch(handleSelectedTabValue(e.target.value));
  };

  const handlePurchaseSelection = (e) => {
    const value = e.target.value;
    setSelectPurchase(value);
    dispatch(handleSelectedPurchaseTabValue(value));

    if (value === 'bulk_purchase') {
      // Force Inward As to New Purchase when Bulk Purchase is selected
      setSelectorder('neworder');
      dispatch(handleSelectedTabValue('neworder'));
    }
  };


  return (
    <>
      {!customizeJob && <>
        {!isSaveAndNext && <div className="order-dropdown">
          <div>
            <label htmlFor="inwardas" className="order-label fs_fgp">Purchase:</label>
            <select name="inwardas" id="inwardas" value={selectPurchase} className='fs_fgp fs_fgp_select' onChange={handlePurchaseSelection} ref={dropdownRef}  >
              <option value="" disabled selected>Select Purchase</option>
              <option value="tagging">Tagging</option>
              <option value="bulk_purchase">Bulk Purchase</option>
            </select>
          </div>
          <div>
            {mode !== "alteration_issue" && <> <label htmlFor="inwardas" className="order-label fs_fgp">Inward As:</label>
              <select
                name="inwardas"
                id="inwardas"
                value={selectOrder}
                className='fs_fgp fs_fgp_select'
                onChange={handleOrderSelection}
                ref={dropdownRef}
                disabled={selectPurchase === 'bulk_purchase'}
              >
                <option value="" disabled selected>Select Order</option>
                <option value="neworder">New Purchase</option>
                <option value="reorder">Re Purchase</option>
                <option value="jobbased">PO Based</option>
              </select></>}
          </div>
        </div>}

        {!isSaveAndNext && <div className="order-components">
          {mode !== "alteration_issue" && <>
            {selectOrder === 'neworder' && <NewOrder purchase={selectPurchase} />}
            {selectOrder === 'reorder' && <ReOrder />}
            {selectOrder === 'jobbased' && <JobBased />}
          </>}
          {
            mode === "alteration_issue" && <ScanAddJob />
          }
        </div>}

        {isSaveAndNext && <div className="order-components">
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