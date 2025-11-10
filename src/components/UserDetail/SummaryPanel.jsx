import React, { useMemo, useState } from 'react';

const SummaryPanel = ({
  mode,
  theme,
  jobData = [],
  showTaxDropDown,
  setShowTaxDropDown,
  showModeOfDelDropDown,
  setShowModeOfDelDropDown,
  showAddLess,
  setShowAddLess,
  hoveredTax,
  setHoveredTax,
  hoveredModeOfDel,
  setHoveredModeOfDel,
  hoveredAddLess,
  setHoveredAddLess,
  handleTaxSelectionChange
}) => {
  const [selectedTaxType, setSelectedTaxType] = useState('cgst+sgst');
  const [taxRate, setTaxRate] = useState(3);
  const [discount, setDiscount] = useState(0);
  const [addLessAmount, setAddLessAmount] = useState(0);
  const [isAddLessAdd, setIsAddLessAdd] = useState(true);
  const [selectedDeliveryMode, setSelectedDeliveryMode] = useState('dtdc');
  const [deliveryCharges, setDeliveryCharges] = useState(50);

  // Calculate totals from job data
  const calculations = useMemo(() => {
    const total = jobData?.reduce((sum, job) => sum + (parseFloat(job.amount) || 0), 0);
    const discountAmount = (total * discount) / 100;
    const amountAfterDiscount = total - discountAmount;
    const taxAmount = (amountAfterDiscount * taxRate) / 100;
    const adjustedAmount = isAddLessAdd ? addLessAmount : -addLessAmount;
    const finalAmount = amountAfterDiscount + taxAmount + deliveryCharges + adjustedAmount;

    return {
      total: total.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      amountAfterDiscount: amountAfterDiscount.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      deliveryCharges: deliveryCharges.toFixed(2),
      finalAmount: finalAmount.toFixed(2)
    };
  }, [jobData, discount, taxRate, addLessAmount, isAddLessAdd, deliveryCharges]);

  const handleTaxChange = (e) => {
    const value = e.target.value;
    setSelectedTaxType(value);
    switch(value) {
      case 'cgst+sgst':
        setTaxRate(3); // 1.5% CGST + 1.5% SGST
        break;
      case 'igst':
        setTaxRate(3); // 3% IGST
        break;
      case 'gst':
        setTaxRate(18); // 18% GST
        break;
      default:
        setTaxRate(3);
    }
  };

  const handleDeliveryModeChange = (e) => {
    const value = e.target.value;
    setSelectedDeliveryMode(value);
    switch(value) {
      case 'train':
        setDeliveryCharges(30);
        break;
      case 'dtdc':
        setDeliveryCharges(50);
        break;
      case 'courier':
        setDeliveryCharges(80);
        break;
      default:
        setDeliveryCharges(50);
    }
  };

  const handleAddLessCancel = () => {
    setAddLessAmount(0);
    setIsAddLessAdd(true);
    setShowAddLess(false);
  };
  
  if (mode === "alteration_issue") return null;

  return (
    <div className="d-flex justify-content-end">
      <div className={`totalSummary pt-0 mt-0`}>
        <div className="totalItem fs_fgp">
          <span className="text_color fs_custome_size fs_weight labelColor">Total ({jobData.length} jobs)</span>
          <span className="fs_custome_size fs_weight">₹{calculations.total}</span>
        </div>
        <div className="totalItem fs_fgp">
          <span className="text_color fs_custome_size fs_weight labelColor">Discount ({discount}%)</span>
          <span className="fs_custome_size fs_weight">₹{calculations.discountAmount}</span>
        </div>
        <div className="totalItem fs_fgp">
          <span className="text_color fs_custome_size fs_weight labelColor">Amount After Discount</span>
          <span className="fs_custome_size fs_weight">₹{calculations.amountAfterDiscount}</span>
        </div>

        {/* Taxes */}
        {!showTaxDropDown ? (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div
              className="taxOption"
              style={{ cursor: "pointer", color: hoveredTax ? theme?.palette?.customColors?.purple : "" }}
              onMouseEnter={() => setHoveredTax(true)}
              onMouseLeave={() => setHoveredTax(false)}
              onClick={() => setShowTaxDropDown(true)}
            >
              <span className="fs_custome_size fs_weight labelColor">Taxes</span>
            </div>
            <span className="fs_custome_size fs_weight">₹{calculations.taxAmount}</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div>
              <select onChange={handleTaxChange} className="tax_select_us" value={selectedTaxType}>
                <option value="cgst+sgst">CGST + SGST (3%)</option>
                <option value="igst">IGST (3%)</option>
                <option value="gst">GST (18%)</option>
              </select>
              <button className="btnApply ms-1" onClick={() => setShowTaxDropDown(false)}>Apply</button>
              <button className="btnClose" onClick={() => setShowTaxDropDown(false)}>Close</button>
            </div>
            <span className="fs_custome_size fs_weight">₹{calculations.taxAmount}</span>
          </div>
        )}

        {/* Mode of Delivery */}
        {!showModeOfDelDropDown ? (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div
              className="taxOption"
              style={{ cursor: "pointer", color: hoveredModeOfDel ? theme?.palette?.customColors?.purple : "" }}
              onMouseEnter={() => setHoveredModeOfDel(true)}
              onMouseLeave={() => setHoveredModeOfDel(false)}
              onClick={() => setShowModeOfDelDropDown(true)}
            >
              <span className="fs_custome_size fs_weight labelColor">Mode of Delivery</span>
            </div>
            <span className="fs_custome_size fs_weight">₹{calculations.deliveryCharges}</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div>
              <select className="tax_select_us" value={selectedDeliveryMode} onChange={handleDeliveryModeChange}>
                <option value="train">By Train (₹30)</option>
                <option value="dtdc">By DTDC (₹50)</option>
                <option value="courier">By Courier (₹80)</option>
              </select>
              <button className="btnApply ms-1" onClick={() => setShowModeOfDelDropDown(false)}>Apply</button>
              <button className="btnClose" onClick={() => setShowModeOfDelDropDown(false)}>Close</button>
            </div>
            <span className="fs_custome_size fs_weight">₹{calculations.deliveryCharges}</span>
          </div>
        )}

        {/* Add/Less */}
        {!showAddLess ? (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div
              className="addLessOption"
              style={{ cursor: "pointer", color: hoveredAddLess ? theme?.palette?.customColors?.purple : "" }}
              onMouseEnter={() => setHoveredAddLess(true)}
              onMouseLeave={() => setHoveredAddLess(false)}
              onClick={() => setShowAddLess(true)}
            >
              <span className="fs_custome_size fs_weight labelColor">Add/Less</span>
            </div>
            <span className="fs_custome_size fs_weight">₹{addLessAmount.toFixed(2)}</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div className="addLessOptionDropdown mt-1">
              <input 
                type="radio" 
                id="add" 
                name="addless" 
                className="me-1" 
                checked={isAddLessAdd}
                onChange={() => setIsAddLessAdd(true)}
              />
              <label htmlFor="add" className="me-1 fw-normal">Add</label>
              <input 
                type="radio" 
                id="less" 
                name="addless" 
                className="me-1" 
                checked={!isAddLessAdd}
                onChange={() => setIsAddLessAdd(false)}
              />
              <label htmlFor="less" className="me-1 fw-normal">Less</label>
              <input 
                type="number" 
                className="addLessInput" 
                value={addLessAmount}
                onChange={(e) => setAddLessAmount(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
              <button className="btnRoundUp fs_btn_us" onClick={() => setShowAddLess(false)}>Apply</button>
              <button className="btnClose ms-1" onClick={handleAddLessCancel}>Close</button>
            </div>
            <div className="fs_custome_size fs_weight">₹{addLessAmount.toFixed(2)}</div>
          </div>
        )}

        <hr />
        <div className="finalAmount fs_fgp">
          <span className="fs_custome_size fs_weight labelColor">Final Amount</span>
          <span className="fs_custome_size fs_weight">₹{calculations.finalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
