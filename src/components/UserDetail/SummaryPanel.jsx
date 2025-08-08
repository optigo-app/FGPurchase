import React from 'react';
import { Button, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const SummaryPanel = ({
  mode,
  theme,
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
  if (mode === "alteration_issue") return null;

  return (
    <div className="d-flex justify-content-end">
      <div className={`totalSummary pt-0 mt-0`}>
        <div className="totalItem fs_fgp">
          <span className="text_color fs_custome_size fs_weight labelColor">Total</span>
          <span className="fs_custome_size fs_weight">11,391</span>
        </div>
        <div className="totalItem fs_fgp">
          <span className="text_color fs_custome_size fs_weight labelColor">Discount</span>
          <span className="fs_custome_size fs_weight">0.00</span>
        </div>
        <div className="totalItem fs_fgp">
          <span className="text_color fs_custome_size fs_weight labelColor">Amount After Discount</span>
          <span className="fs_custome_size fs_weight">11,391</span>
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
            <span className="fs_custome_size fs_weight">340</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div>
              <select onChange={handleTaxSelectionChange} className="tax_select_us">
                <option value="cgst+sgst">CGST + SGST</option>
                <option value="igst">IGST</option>
                <option value="gst">GST</option>
              </select>
              <button className="btnApply ms-1">Apply</button>
              <button className="btnClose" onClick={() => setShowTaxDropDown(false)}>Close</button>
            </div>
            <span className="fs_custome_size fs_weight">340</span>
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
            <span className="fs_custome_size fs_weight">340</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div>
              <select onChange={handleTaxSelectionChange} className="tax_select_us">
                <option value="cgst+sgst">By Train</option>
                <option value="igst">By DTDC</option>
                <option value="gst">By Courier</option>
              </select>
              <button className="btnApply ms-1">Apply</button>
              <button className="btnClose" onClick={() => setShowModeOfDelDropDown(false)}>Close</button>
            </div>
            <span className="fs_custome_size fs_weight">340</span>
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
            <span className="fs_custome_size fs_weight">1234</span>
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center fs_fgp" style={{ minHeight: '45px' }}>
            <div className="addLessOptionDropdown mt-1">
              <input type="radio" id="add" name="addless" className="me-1" />
              <label htmlFor="add" className="me-1 fw-normal">Add</label>
              <input type="radio" id="less" name="addless" className="me-1" />
              <label htmlFor="less" className="me-1 fw-normal">Less</label>
              <input type="text" className="addLessInput" />
              <button className="btnRoundUp fs_btn_us" onClick={() => setShowAddLess(false)}>ROUNDUP</button>
            </div>
            <div className="fs_custome_size fs_weight">1234</div>
          </div>
        )}

        <hr />
        <div className="finalAmount fs_fgp">
          <span className="fs_custome_size fs_weight labelColor">Final Amount</span>
          <span className="fs_custome_size fs_weight">11,391.46</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryPanel;
