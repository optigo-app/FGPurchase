import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./ratecut.css";
import { Button, ToggleButton, ToggleButtonGroup, useTheme, Alert, IconButton } from "@mui/material";
import { Trash, Edit } from 'tabler-icons-react';
import { calculateMetalFrom24K, calculateAmountFromMetal } from "../../Utils/globalFunc";

const RateCut = () => {
  const theme = useTheme();

  const [selectedMode, setSelectedMode] = useState("amount");
  const [amountData, setAmountData] = useState({
    metalType: "",
    amount: "",
    rate: "",
    metalIn24K: ""
  });
  const [metalData, setMetalData] = useState({
    metalType: "",
    metalIn24K: "",
    rate: "",
    amount: ""
  });
  const [error, setError] = useState("");
  const [calculatedValue, setCalculatedValue] = useState("");
  const [savedData, setSavedData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const metalTypeArr = useMemo(() => [
    { id: 1, name: "GOLD" },
    { id: 2, name: "SILVER" },
    { id: 3, name: "PLATINUM" },
  ], []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setError("");

    if (selectedMode === "amount") {
      setAmountData(prev => ({ ...prev, [name]: value }));
    } else {
      setMetalData(prev => ({ ...prev, [name]: value }));
    }
  }, [selectedMode]);

  const calculationResult = useMemo(() => {
    if (selectedMode === "amount") {
      if (amountData.amount && amountData.rate) {
        try {
          const metalIn24K = calculateMetalFrom24K(amountData.amount, amountData.rate);
          return {
            value: metalIn24K.toFixed(3),
            error: null
          };
        } catch (err) {
          return {
            value: "",
            error: err.message
          };
        }
      }
      return { value: "", error: null };
    } else {
      if (metalData.metalIn24K && metalData.rate) {
        try {
          const amount = calculateAmountFromMetal(metalData.metalIn24K, metalData.rate);
          return {
            value: amount.toFixed(2),
            error: null
          };
        } catch (err) {
          return {
            value: "",
            error: err.message
          };
        }
      }
      return { value: "", error: null };
    }
  }, [selectedMode, amountData.amount, amountData.rate, metalData.metalIn24K, metalData.rate]);

  useEffect(() => {
    if (selectedMode === "amount") {
      setAmountData(prev => ({ ...prev, metalIn24K: calculationResult.value }));
    } else {
      setMetalData(prev => ({ ...prev, amount: calculationResult.value }));
    }
    setCalculatedValue(calculationResult.value);
    setError(calculationResult.error || "");
  }, [calculationResult, selectedMode]);

  const handleSave = useCallback(() => {
    const dataToSave = selectedMode === "amount" ? amountData : metalData;

    // Validate required fields
    if (!dataToSave.metalType) {
      setError("Please select a metal type");
      return;
    }

    if (!calculatedValue) {
      setError("Please enter valid values to calculate");
      return;
    }

    // Create new entry with ID
    const newEntry = {
      id: Date.now(),
      mode: selectedMode,
      metalType: dataToSave.metalType,
      amount: dataToSave.amount,
      rate: dataToSave.rate,
      metalIn24K: dataToSave.metalIn24K
    };

    if (isEditing && editingId) {
      setSavedData(prev => prev.map(item =>
        item.id === editingId ? { ...newEntry, id: editingId } : item
      ));
      setEditingId(null);
      setIsEditing(false);
      console.log(`${selectedMode.toUpperCase()} Mode Data Updated:`, newEntry);
    } else {
      setSavedData(prev => [newEntry, ...prev]);
      console.log(`${selectedMode.toUpperCase()} Mode Data Saved:`, newEntry);
    }

    if (selectedMode === "amount") {
      setAmountData({ metalType: "", amount: "", rate: "", metalIn24K: "" });
    } else {
      setMetalData({ metalType: "", metalIn24K: "", rate: "", amount: "" });
    }
    setCalculatedValue("");
    setError("");
  }, [selectedMode, amountData, metalData, calculatedValue, isEditing, editingId]);

  const handleToggleChange = useCallback((event, newValue) => {
    if (newValue !== null) {
      setSelectedMode(newValue);
      if (isEditing) {
        setEditingId(null);
        setIsEditing(false);
        setAmountData({ metalType: "", amount: "", rate: "", metalIn24K: "" });
        setMetalData({ metalType: "", metalIn24K: "", rate: "", amount: "" });
      }
      setError("");
      setCalculatedValue("");
    }
  }, [isEditing]);

  // Edit saved entry
  const handleEdit = useCallback((item) => {
    setEditingId(item.id);
    setIsEditing(true);
    const editMode = item.mode || (item.amount && item.rate ? "amount" : "metal");
    setSelectedMode(editMode);

    if (editMode === "amount") {
      setAmountData({
        metalType: item.metalType,
        amount: item.amount,
        rate: item.rate,
        metalIn24K: item.metalIn24K
      });
    } else {
      setMetalData({
        metalType: item.metalType,
        metalIn24K: item.metalIn24K,
        rate: item.rate,
        amount: item.amount
      });
    }

    setCalculatedValue(editMode === "amount" ? item.metalIn24K : item.amount);
    setError("");
  }, []);

  // Cancel edit
  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setIsEditing(false);
    setAmountData({ metalType: "", amount: "", rate: "", metalIn24K: "" });
    setMetalData({ metalType: "", metalIn24K: "", rate: "", amount: "" });
    setCalculatedValue("");
    setError("");
  }, []);

  // Delete saved entry
  const handleDelete = useCallback((id) => {
    setSavedData(prev => prev.filter(item => item.id !== id));
  }, []);

  return (
    <div className="ratecut-container">
      <div className="toglleButtonBox">
        <ToggleButtonGroup
          value={selectedMode}
          exclusive
          onChange={handleToggleChange}
          className="toggle-group"
          size="small"
        >
          <ToggleButton className="toggle-button" value="amount" sx={{ textTransform: 'none' }}>
            Amount
          </ToggleButton>
          <ToggleButton className="toggle-button" value="metal" sx={{ textTransform: 'none' }}>
            Metal
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      <div className="input-section">
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <div className="input-block">
          <label>Metal Type</label>
          <select
            name="metalType"
            value={selectedMode === "metal" ? metalData.metalType : amountData.metalType}
            onChange={handleChange}
            className="rc_input"
          >
            <option value="" disabled>Select Metal Type</option>
            {metalTypeArr.map((metal) => (
              <option key={metal.id} value={metal.name}>
                {metal.name}
              </option>
            ))}
          </select>
        </div>

        {useMemo(() =>
          selectedMode === "amount" ? (
            <>
              <div className="input-block">
                <label>Amount</label>
                <input
                  name="amount"
                  value={amountData.amount}
                  onChange={handleChange}
                  className="rc_input"
                  type="number"
                  step="0.01"
                  placeholder="Enter Amount"
                />
              </div>

              <div className="input-block">
                <label>Rate In 24K</label>
                <input
                  name="rate"
                  value={amountData.rate}
                  onChange={handleChange}
                  className="rc_input"
                  type="number"
                  step="0.01"
                  placeholder="Enter Rate"
                />
              </div>

              <div className="input-block">
                <label>Metal In 24K (Calculated)</label>
                <input
                  name="metalIn24K"
                  value={amountData.metalIn24K}
                  className="rc_input"
                  type="text"
                  placeholder="Auto-calculated"
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
              </div>
            </>
          ) : (
            <>
              <div className="input-block">
                <label>Metal In 24K</label>
                <input
                  name="metalIn24K"
                  value={metalData.metalIn24K}
                  onChange={handleChange}
                  className="rc_input"
                  type="number"
                  step="0.001"
                  placeholder="Enter Metal in 24K"
                />
              </div>

              <div className="input-block">
                <label>Rate In 24K</label>
                <input
                  name="rate"
                  value={metalData.rate}
                  onChange={handleChange}
                  className="rc_input"
                  type="number"
                  step="0.01"
                  placeholder="Enter Rate"
                />
              </div>

              <div className="input-block">
                <label>Amount (Calculated)</label>
                <input
                  name="amount"
                  value={metalData.amount}
                  className="rc_input"
                  type="text"
                  placeholder="Auto-calculated"
                  readOnly
                  style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                />
              </div>
            </>
          )
          , [selectedMode, amountData, metalData, handleChange])}

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <Button
            className="rc_saveBtn"
            sx={{
              background: theme?.palette?.customColors?.primary,
              color: 'white'
            }}
            onClick={handleSave}
            disabled={!calculatedValue}
          >
            {isEditing ? 'Update' : 'Save'}
          </Button>

          {isEditing && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      {/* Saved Data Table */}
      {savedData?.length > 0 && (
        <div className="saved-data-section" style={{ marginTop: '30px' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '50%',
              borderCollapse: 'collapse',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '8px'
            }}>
              <thead>
                <tr style={{ backgroundColor: theme?.palette?.customColors?.purple + '20' }}>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Mode</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Metal Type</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>Rate</th>
                  <th style={{ padding: '12px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>Metal in 24K</th>
                  <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid #ddd' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedData.map((item, index) => (
                  <tr key={item.id} style={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                    '&:hover': { backgroundColor: '#f0f0f0' }
                  }}>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                      Convert to  {item.mode}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee', fontWeight: 'bold' }}>
                      {item.metalType} 24K
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'right' }}>
                      ₹{parseFloat(item.amount).toFixed(2)}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'right' }}>
                      ₹{parseFloat(item.rate).toFixed(2)}
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'right' }}>
                      {parseFloat(item.metalIn24K).toFixed(3)}g
                    </td>
                    <td style={{ padding: '10px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(item)}
                          sx={{ padding: '4px' }}
                        >
                          <Edit size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(item.id)}
                          sx={{ padding: '4px' }}
                        >
                          <Trash size={18} />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateCut;
