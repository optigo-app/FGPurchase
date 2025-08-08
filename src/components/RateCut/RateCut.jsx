import React, { useState } from "react";
import "./ratecut.css";
import { Button, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";

const RateCut = () => {
  const theme = useTheme();

  const [selectedMode, setSelectedMode] = useState("amount");
  const [amountData, setAmountData] = useState({ value1: "", value2: "", value3: "" });
  const [metalData, setMetalData] = useState({ value1: "", value2: "", value3: "" });

  const metalTypeArr = [
    { id: 1, name: "GOLD" },
    { id: 2, name: "SILVER" },
    { id: 3, name: "PLATINUM" },
  ];

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "amount") {
      setAmountData(prev => ({ ...prev, [name]: value }));
    } else {
      setMetalData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    console.log(selectedMode === "amount" ? amountData : metalData);
  };

  const handleToggleChange = (event, newValue) => {
    if (newValue !== null) {
      setSelectedMode(newValue)
    }
  }

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
        <div className="input-block">
          <label>Metal Type</label>
          <select className="rc_input">
            <option value="" disabled selected></option>
            {metalTypeArr.map((metal) => (
              <option key={metal.id} value={metal.id}>
                {metal.name}
              </option>
            ))}
          </select>
        </div>

        <div className="input-block">
          <label>{selectedMode === "metal" ? "Metal In 24K" : "Amount"}</label>
          <input
            name="value1"
            value={selectedMode === "metal" ? metalData.value1 : amountData.value1}
            onChange={(e) => handleChange(e, selectedMode)}
            className="rc_input"
            type="text"
            placeholder={selectedMode === "metal" ? "Metal In 24K" : "Amount"}
          />
        </div>

        <div className="input-block">
          <label>Rate In 24K</label>
          <input
            name="value2"
            value={selectedMode === "metal" ? metalData.value2 : amountData.value2}
            onChange={(e) => handleChange(e, selectedMode)}
            className="rc_input"
            type="text"
            placeholder="Rate In 24K"
          />
        </div>

        <div className="input-block">
          <label>{selectedMode === "metal" ? "Amount" : "Metal In 24K"}</label>
          <input
            name="value3"
            value={selectedMode === "metal" ? metalData.value3 : amountData.value3}
            onChange={(e) => handleChange(e, selectedMode)}
            className="rc_input"
            type="text"
            placeholder={selectedMode === "metal" ? "Amount" : "Metal In 24K"}
          />
        </div>

        <Button className="rc_saveBtn" sx={{ background: theme?.palette?.customColors?.primary, color: 'white' }} onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default RateCut;
