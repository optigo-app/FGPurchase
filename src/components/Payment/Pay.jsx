import React, { useRef, useState } from "react";
import "./pay.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Dialog,
  Drawer,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Box,
  Select,
  Typography,
} from "@mui/material";
import CustomTextField from "../TextField/index";
import MultipartPay from "./MultiPartPay";
import {  useDispatch, useSelector } from "react-redux";
import { handleMultiPartPayFlag } from "../../redux/slices/HomeSlice";

const Pay = () => {
  const [selectedButton, setSelectedButton] = useState("Cash");
  const [formTouched, setFormTouched] = useState(false);
  const inputRefs = useRef([]); 
  const [rows, setRows] = useState([{ metal: "", dueDays: "" }]);
  const [validationErrors, setValidationErrors] = useState([]);

  // const [multiPartFlag, setMultiPartFlag] = useState(false);

  const multiPartPayFlag = useSelector(state => state?.home?.multiPartPayFlag);
  const dispatch = useDispatch();


  


  const [formData, setFormData] = useState({
    cash: "",
    bank: "",
    advance: "",
    payAccount: "",
    paymentBy: "",
    transactionId: "",
    amount: "",
    payOrReceive: "PAY",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      payOrReceive: prev.payOrReceive === "PAY" ? "RECEIVE" : "PAY",
    }));
  };

  const handleApply = () => {
    setFormTouched(true);
    let isValid = true;
    if (selectedButton === "Cash" && !formData.amount) {
      isValid = false;
    } else if (
      selectedButton === "Bank" &&
      (!formData.paymentBy ||
        !formData.bank ||
        !formData.transactionId ||
        !formData.amount)
    ) {
      isValid = false;
    }

    if (!isValid) {
      // alert("Please fill out the required fields!");
      return;
    }

    console.log("Form Data:", formData);

    setFormData({
      cash: "",
      bank: "",
      advance: "",
      payAccount: "",
      paymentBy: "",
      transactionId: "",
      amount: "",
      payOrReceive: "PAY",
    });
    setSelectedButton("Advance");
    setFormTouched(false);
  };


  const handleAddRow = () => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows, { metal: "", dueDays: "" }];
      setTimeout(() => {
        inputRefs.current[updatedRows.length - 1]?.focus();
      }, 0);
  
      return updatedRows;
    });
  
    setValidationErrors((prevErrors) => [
      ...prevErrors,
      { metal: false, dueDays: false },
    ]);
  };
  
  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, idx) => idx !== index);
    const updatedErrors = validationErrors.filter((_, idx) => idx !== index);
    setRows(updatedRows);
    setValidationErrors(updatedErrors);
  };

  const handleInputChange = (index, field, value) => {
    if (index < 0 || index >= rows.length) {
      console.error(`Invalid index: ${index}`);
      return;
    }
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row 
    );
    setRows(updatedRows);
    const updatedErrors = validationErrors.map((error, i) =>
      i === index ? { ...error, [field]: value.trim() === "" } : error
    );
    setValidationErrors(updatedErrors);
  };
  

  const handleApplyAndClose = () => {
    const updatedErrors = rows.map((row) => ({
      metal: row.metal.trim() === "",
      dueDays: row.dueDays.trim() === "",
    }));
    setValidationErrors(updatedErrors);
    const hasErrors = updatedErrors.some(
      (error) => error.metal || error.dueDays
    );

    if (!hasErrors) {
      console.log("Collected Data:", rows);
    }
  };

  const handleMultiPartFlag = () => {
    // setMultiPartFlag(true);
    dispatch(handleMultiPartPayFlag(true));
  }

  return (
    <div className="pay_container">
      <div className="payDiv_part1">
        <div className="button_group">
          {["Cash", "Bank", "Advance", "Pay A/C"].map((type) => (
            <button
              key={type}
              className={`btn ${
                selectedButton === type ? "btn-primary" : "btn-warning"
              }`}
              onClick={() => setSelectedButton(type)}
            >
              {type}
            </button>
          ))}
        </div>
    

        {selectedButton === "Cash" && (
          <div className="form-section">
            {/* <div className="toggle-section">
              <span
                className={`toggle-option ${
                  formData.payOrReceive === "PAY" ? "active" : ""
                }`}
                onClick={handleToggle}
              >
                PAY
              </span>
              <span
                className={`toggle-option ${
                  formData.payOrReceive === "RECEIVE" ? "active" : ""
                }`}
                onClick={handleToggle}
              >
                RECEIVE
              </span>
            </div> */}
            <div className="pb-4"></div>
            <div className="form-group">
              <CustomTextField
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter Amount"
              />
              {formTouched && !formData.amount && (
                <p className="error">Amount is required!</p>
              )}
            </div>
            <button onClick={handleApply} className="ApllyBtnPay">
              Apply
            </button>
          </div>
        )}

        {selectedButton === "Bank" && (
          <div
            className="form-section"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginTop: "20px",
              width: "350px",
            }}
          >
            <div className="pay_form_group">
              <label className="pay_form_group_label">Payment By :</label>

              <CustomTextField
                select
                fullWidth
                value={formData.paymentBy}
                onChange={handleChange}
                customBorderColor="rgba(47, 43, 61, 0.2)"
                borderoutlinedColor="#00CFE8"
                customTextColor="#2F2B3DC7"
                customFontSize="0.8125rem"
                size="small"
                className="selectDropDownMain"
                variant="filled"
                style={{ width: "200px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Net Banking">Net Banking</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
              </CustomTextField>

              {formTouched && !formData.paymentBy && (
                <p className="error">Payment By is required!</p>
              )}
            </div>
            <div className="pay_form_group">
              <label className="pay_form_group_label">Bank :</label>
              <CustomTextField
                select
                fullWidth
                value={formData.bank}
                onChange={handleChange}
                customBorderColor="rgba(47, 43, 61, 0.2)"
                borderoutlinedColor="#00CFE8"
                customTextColor="#2F2B3DC7"
                customFontSize="0.8125rem"
                size="small"
                className="selectDropDownMain"
                variant="filled"
                style={{ width: "200px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Bank A">Bank A</MenuItem>
                <MenuItem value="Bank B">Bank B</MenuItem>
                <MenuItem value="Bank C">Bank C</MenuItem>
              </CustomTextField>

              {formTouched && !formData.bank && (
                <p className="error">Bank is required!</p>
              )}
            </div>
            <div className="pay_form_group">
              <label className="pay_form_group_label">Transaction ID:</label>
              <CustomTextField
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                style={{ width: "200px" }}
                placeholder="Enter Transaction ID"
              />
              {formTouched && !formData.transactionId && (
                <p className="error">Transaction ID is required!</p>
              )}
            </div>
            <div className="pay_form_group">
              <label className="pay_form_group_label">Amount:</label>
              <CustomTextField
                type="text"
                name="amount"
                value={formData.amount}
                style={{ width: "200px" }}
                onChange={handleChange}
                placeholder="Enter Amount"
              />
              {formTouched && !formData.amount && (
                <p className="error">Amount is required!</p>
              )}
            </div>
            <button onClick={handleApply} className="ApllyBtnPay">
              Apply
            </button>
          </div>
        )}

        {selectedButton === "Advance" && (
          <div className="form-section" style={{ marginTop: "30px" }}>
            <div className="form-group">
              <CustomTextField
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter Amount"
              />
              {formTouched && !formData.amount && (
                <p className="error">Amount is required!</p>
              )}
            </div>
            <button onClick={handleApply} className="ApllyBtnPay">
              Apply
            </button>
          </div>
        )}

        {selectedButton === "Pay A/C" && (
          <>
              <div>
                  <button onClick={handleMultiPartFlag} className="ApllyBtnPay2">
                  Multipart Payment
                  </button>
              </div>
          <div className="form-section" style={{ marginTop: "30px" }}>
            
            <div className="pay_form_group">
              
              <label className="pay_form_group_label"> Due Days :</label>
              <CustomTextField
                type="text"
                value={formData.amount}
                style={{ width: "200px" }}
                onChange={handleChange}
              />
              {formTouched && !formData.amount && (
                <p className="error">Amount is required!</p>
              )}
            </div>

            <div className="pay_form_group" style={{ marginTop: "15px" }}>
              <label className="pay_form_group_label">Remarks :</label>
              <CustomTextField
                type="textarea"
                value={formData.amount}
                style={{ width: "200px" }}
                onChange={handleChange}
              />
              {formTouched && !formData.amount && (
                <p className="error">Amount is required!</p>
              )}
            </div>
            <button onClick={handleApply} className="ApllyBtnPay">
              Apply
            </button>

            {/* {rows.map((row, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "10px",
                  marginTop: "15px",
                }}
              >
                <div>
                  <CustomTextField
                    type="text"
                    name={`metal-${index}`}
                    placeholder="Enter Metal"
                    value={row.metal}
                    onChange={(e) => handleInputChange(index, "metal", e.target.value)}
                    ref={(el) => (inputRefs.current[index] = el)} 
                  />
                  {validationErrors[index]?.metal && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      Metal is required.
                    </p>
                  )}
                </div>
                <div>
                  <CustomTextField
                    type="text"
                    name={`dueDays-${index}`}
                    placeholder="Enter Due Days"
                    value={row.dueDays}
                    onChange={(e) =>
                      handleInputChange(index, "dueDays", e.target.value)
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddRow();
                      }
                    }}
                  />
                  {validationErrors[index]?.dueDays && (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      Due Days is required.
                    </p>
                  )}
                </div>
                {rows.length > 1 && (
                  <button
                    type="button"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      border: "none",
                      background: "transparent",
                    }}
                    onClick={() => handleRemoveRow(index)}
                  >
                    ❌
                  </button>
                )}
              </div>
            ))} */}

            
          </div>
          </>
        )}
      </div>
      <div className="payDiv_part2">
        <div>
          <p className="payTotalValueTitle">Total Remaining :</p>
          <p className="payTotalValue">0.00/- </p>
        </div>
        <table className="clspaydet">
          <tr className="payTableTr">
            <td className="payTableTdTitleMain">Type</td>
            <td className="payTableTdTitleMain">Amount</td>
          </tr>
          <tr className="payTableTr">
            <td>
              <b>Total Amount :</b>
            </td>
            <td className="payTableTr">
              <b>623.00/-</b>
            </td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">Cash :</td>
            <td className="clsral">0.00/-</td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">Cheque :</td>
            <td className="clsral cls_payment">623.00/-</td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">Debit Card :</td>
            <td
              className="clsral cls_payment"
              id="tdpaydebit_cardAmt"
              amt="0.00"
            >
              0.00/-
            </td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">Credit Card :</td>
            <td
              className="clsral cls_payment"
              id="tdpaycredit_cardAmt"
              amt="0.00"
            >
              0.00/-
            </td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">RTGS :</td>
            <td className="clsral cls_payment">0.00/-</td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">NEFT :</td>
            <td className="clsral cls_payment">0.00/-</td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">IMPS :</td>
            <td className="clsral cls_payment">0.00/-</td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">UPI :</td>
            <td className="clsral cls_payment">0.00/-</td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">Etransfer :</td>
            <td
              className="clsral cls_payment"
              id="tdpayetransferAmt"
              amt="0.00"
            >
              0.00/-
            </td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">Wire :</td>
            <td className="clsral cls_payment">0.00/-</td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">Advance :</td>
            <td className="clsral">0.00/-</td>
          </tr>
          <tr className="payTableTr">
            <td className="payTableTdTitle">Due Payment :</td>
            <td className="clsral">0.00/-</td>
          </tr>
          <tr className="clstrdue">
            <td>
              <b>Total Pay :</b>
            </td>
            <td className="clsral">
              <b>623.00/-</b>
            </td>
          </tr>
        </table>
      </div>

      {/* { multiPartFlag && <Modal
                                  open={multiPartFlag}
                                  aria-labelledby="parent-modal-title"
                                  aria-describedby="parent-modal-description"
                                >
                                  <Box 
                                  sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 800,
                                    bgcolor: 'background.paper',
                                    border:'none',
                                    pt: 2,
                                    px: 4,
                                    pb: 3,
                                    borderRadius:'8px'
                                  }}
                                  className="boxShadow_hp"
                                  >
                                    <h4 className='text-center'>Multipart Payment</h4>
                                    <div>
                                      <div className="d-flex align-items-center py-1">
                                        <div className="pe-1">Total Metal : 4.089</div><div className="ps-1">Total Amount : 2,588.91</div>
                                      </div>
                                      <div>
                                        <div className="d-flex align-items-center">
                                          <div style={{width:'45%'}} className="d-flex align-items-center">
                                            <div className="pe-4">Metal</div>
                                            <div><input type="text" value="4.089" /></div>
                                          </div>
                                          <div style={{width:'45%'}} className="d-flex align-items-center">
                                            <div className="pe-2">Due Days : </div>
                                            <div><input type="text" value="0" /></div>
                                          </div>
                                          <div style={{width:'20%'}}>27 Nov 2024</div>
                                        </div>
                                        <div className="d-flex align-items-center py-1">
                                          <div style={{width:'45%'}} className="d-flex align-items-center">
                                            <div className="pe-2">Amount</div>
                                            <div><input type="text" value="2588.91" /></div>
                                          </div>
                                          <div style={{width:'45%'}} className="d-flex align-items-center">
                                            <div className="pe-2">Due Days : </div>
                                            <div><input type="text" value="0" /></div>
                                          </div>
                                          <div style={{width:'20%'}}>27 Nov 2024</div>
                                        </div>
                                      </div>
                                      <div>
                                        Remaining Metal : 0.0000 and Remaining Amount : 0.00
                                      </div>
                                      <div className="d-flex justify-content-between align-items-center py-2">
                                        <div><button className="btn btn-success p-1">Apply & Close</button></div>
                                        <div className="d-flex">
                                          <div><button className="btn btn-primary p-1">Add Metal Row</button></div>
                                          <div><button className="btn btn-primary p-1 mx-1">Add Amount Row</button></div>
                                        </div>
                                      </div>
                                    </div>
                                  </Box>
                                </Modal> } */}
                                {/* {multiPartFlag && (
  <Modal
    open={multiPartFlag}
    aria-labelledby="parent-modal-title"
    aria-describedby="parent-modal-description"
  >
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 900,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 24,
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '300px',
        border: 'none',
      }}
      className="boxShadow_hp"
    >
      <h4 className="text-center mb-3 text-primary font-bold">Multipart Payment</h4>
      <div className="w-full">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="text-secondary">Total Metal: <strong>4.089</strong></div>
          <div className="text-secondary">Total Amount: <strong>2,588.91</strong></div>
        </div>
        
        
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div className="d-flex align-items-center w-45">
            <div className="pe-4 text-muted">Metal</div>
            <input
              type="text"
              value="4.089"
              className="focus_pay"
              readOnly
              style={{ maxWidth: '120px',  fontWeight: '500' }}
            />
          </div>
          <div className="d-flex align-items-center w-45">
            <div className="pe-2 text-muted">Due Days:</div>
            <input
              type="text"
              value="0"
              className="focus_pay"
              style={{ maxWidth: '120px',  }}
            />
          </div>
          <div className="d-flex justify-content-center w-20 text-muted">27 Nov 2024</div>
        </div>

        
        <div className="d-flex flex-wrap justify-content-between gap-3 my-3 align-items-center">
          <div className="d-flex align-items-center w-45">
            <div className="pe-2 text-muted">Amount</div>
            <input
              type="text"
              value="2,588.91"
              className="focus_pay"
              readOnly
              style={{ maxWidth: '120px',  fontWeight: '500' }}
            />
          </div>
          <div className="d-flex align-items-center w-45">
            <div className="pe-2 text-muted">Due Days:</div>
            <input
              type="text"
              value="0"
              className="focus_pay"
              style={{ maxWidth: '120px',  }}
            />
          </div>
          <div className="d-flex justify-content-center w-20 text-muted">27 Nov 2024</div>
        </div>

        <div className="text-secondary d-flex  text-start mt-3">
          Remaining Metal:<strong className="mx-2"> 0.0000 </strong>
          Remaining Amount: <strong className="mx-2"> 0.00 </strong>
        </div>
        
    

        <div className="d-flex justify-content-between align-items-center mt-3 gap-2">
        <button
            className="btn btn-success p-1 px-2"
            style={{ borderRadius: '8px', fontWeight: 'bold' }}
          >
            Apply & Close
          </button>
          <button
            className="btn btn-primary p-1 px-2"
            style={{ borderRadius: '8px', fontWeight: 'bold' }}
          >
            Add Metal Row
          </button>
          <button
            className="btn btn-primary p-1  px-2 "
            style={{ borderRadius: '8px', fontWeight: 'bold' }}
          >
            Add Amount Row
          </button>
          
        </div>
        
      </div>
    </Box>
  </Modal>
)} */}

    {
      multiPartPayFlag && <MultipartPay multiPartPayFlag={multiPartPayFlag} />
    }

    </div>
  );
};

export default Pay;
