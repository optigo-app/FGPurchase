import { useTheme } from "@mui/material";
import React from "react";

const PaymentSummary = ({
  totalRemaining = 0,
  totalAmount = 623,
  payments = {
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
  },
}) => {
  const theme = useTheme();
  const totalPay = Object.values(payments).reduce((sum, val) => sum + Number(val), 0);

  return (
    <div className="payment-summary border">
      <div className="summary-header px-2 pb-2 border-bottom-0">
        <div className="total-remaining-title">Total Remaining:</div>
        <div className="total-remaining-value">{totalRemaining.toFixed(2)}/-</div>
      </div>

      <table className="payment-table">
        <thead>
          <tr className="payment-table-header">
            <th className="payment-table-header-title">Type</th>
            <th className="payment-table-header-title text-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="payment-table-row">
            <td><b>Total Amount :</b></td>
            <td className="payment-table-amount"><b>{totalAmount.toFixed(2)}/-</b></td>
          </tr>

          {Object.entries(payments).map(([method, amount]) => (
            <tr key={method} className="payment-table-row">
              <td className="payment-table-subtitle">{method}</td>
              <td className="payment-table-amount">{Number(amount).toFixed(2)}/-</td>
            </tr>
          ))}

          <tr className="payment-table-summary" style={{ background: theme?.palette?.customColors?.purple }}>
            <td>Total Pay</td>
            <td className="payment-table-amount text-white">{totalPay.toFixed(2)}/-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentSummary;
