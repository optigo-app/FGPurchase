// Optimized Pay Component with MUI Toggle Buttons and Multipart Option
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleMultiPartPayFlag } from "../../redux/slices/HomeSlice";
import PaymentSummary from "./PaymentSummary";
import "./pay.css";
import MultipartPayment from "./MultipartPayment";

const paymentTypes = ["Cash", "Bank", "Advance", "Pay A/C", "Multipart"];

const Pay = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const multiPartPayFlag = useSelector((state) => state?.home?.multiPartPayFlag);

  const [selectedType, setSelectedType] = useState("Cash");
  const [formTouched, setFormTouched] = useState(false);
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

  const handleToggleChange = (_, newValue) => {
    if (newValue === "Multipart") {
      dispatch(handleMultiPartPayFlag(true));
      setSelectedType(newValue);
    } else {
      setSelectedType(newValue);
    }
  };

  const handleApply = () => {
    setFormTouched(true);
    let isValid = true;

    if (selectedType === "Cash" && !formData.amount) isValid = false;
    if (
      selectedType === "Bank" &&
      (!formData.paymentBy || !formData.bank || !formData.transactionId || !formData.amount)
    )
      isValid = false;

    if (!isValid) return;

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
    setFormTouched(false);
    setSelectedType("Advance");
  };

  const payments = {
    Cash: 0,
    Cheque: 623,
    "Debit Card": 0,
    "Credit Card": 0,
    RTGS: 0,
    NEFT: 0,
    IMPS: 0,
    UPI: 0,
    Etransfer: 0,
    Wire: 0,
    Advance: 0,
    "Due Payment": 0,
  };

  const renderForm = () => {
    switch (selectedType) {
      case "Cash":
        return (
          <Box className="form-section" display="flex" flexDirection="column" gap={2}>
            <input
              type="text"
              placeholder="Amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="categoryNewOrder filter_item_call fs_fgp"
            />
            {formTouched && !formData.amount && (
              <p style={{ color: theme.palette.customColors.red }}>Amount is required!</p>
            )}
            <Button
              onClick={handleApply}
              variant="contained"
              sx={{ width: '220px', background: theme.palette.customColors.primary }}
            >
              SAVE
            </Button>
          </Box>
        );

      case "Bank":
        return (
          <Box className="form-section" display="flex" flexDirection="column" gap={2}>
            <select
              name="paymentBy"
              value={formData.paymentBy}
              onChange={handleChange}
              className="categoryNewOrder filter_item_call fs_fgp"
            >
              <option value="">Select Payment By</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Cheque">Cheque</option>
            </select>
            {formTouched && !formData.paymentBy && (
              <p style={{ color: theme.palette.customColors.red }}>Payment By is required!</p>
            )}

            <select
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="categoryNewOrder filter_item_call fs_fgp"
            >
              <option value="">Select Bank</option>
              <option value="Bank A">Bank A</option>
              <option value="Bank B">Bank B</option>
            </select>
            {formTouched && !formData.bank && (
              <p style={{ color: theme.palette.customColors.red }}>Bank is required!</p>
            )}

            <input
              type="text"
              name="transactionId"
              placeholder="Transaction ID"
              value={formData.transactionId}
              onChange={handleChange}
              className="categoryNewOrder filter_item_call fs_fgp"
            />
            {formTouched && !formData.transactionId && (
              <p style={{ color: theme.palette.customColors.red }}>Transaction ID is required!</p>
            )}

            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="categoryNewOrder filter_item_call fs_fgp"
            />
            {formTouched && !formData.amount && (
              <p style={{ color: theme.palette.customColors.red }}>Amount is required!</p>
            )}

            <Button
              onClick={handleApply}
              variant="contained"
              sx={{ width: '220px', background: theme.palette.customColors.primary }}
            >
              SAVE
            </Button>
          </Box>
        );

      case "Advance":
        return (
          <Box className="form-section" display="flex" flexDirection="column" gap={2}>
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              onChange={handleChange}
              className="categoryNewOrder filter_item_call fs_fgp"
            />
            {formTouched && !formData.amount && (
              <p style={{ color: theme.palette.customColors.red }}>Amount is required!</p>
            )}
            <Button
              onClick={handleApply}
              variant="contained"
              sx={{ width: '220px', background: theme.palette.customColors.primary }}
            >
              SAVE
            </Button>
          </Box>
        );

      case "Pay A/C":
        return (
          <Box className="form-section" display="flex" flexDirection="column" gap={2}>
            <input
              type="text"
              placeholder="Due Days"
              className="categoryNewOrder filter_item_call fs_fgp"
            />
            <input
              type="text"
              placeholder="Remarks"
              className="categoryNewOrder filter_item_call fs_fgp"
            />
            <Button
              onClick={handleApply}
              variant="contained"
              sx={{ width: '220px', background: theme.palette.customColors.primary }}
            >
              SAVE
            </Button>
          </Box>
        );
      case "Multipart":
        return ( 
          <Box>
            <MultipartPayment multiPartPayFlag={multiPartPayFlag} />
          </Box>
        );


      default:
        return null;
    }
  };

  return (
    <div className="pay_container">
      <div className="payDiv_part1">
        <Box sx={{ mb: 4 }} className="toglleButtonBox">
          <ToggleButtonGroup
            value={selectedType}
            exclusive
            onChange={handleToggleChange}
            aria-label="payment type"
            size="small"
            className="toggle-group"
          >
            {paymentTypes.map((type) => (
              <ToggleButton className="toggle-button" key={type} value={type} sx={{ borderRadius: '8px', fontSize: "12px" }}>
                {type}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {renderForm()}
      </div>

      <PaymentSummary totalRemaining={0} totalAmount={623} payments={payments} />
    </div>
  );
};

export default Pay;
