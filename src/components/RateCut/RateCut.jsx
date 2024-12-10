import React, { useState } from "react";
import "./ratecut.css";
import CustomTextField from "../TextField";
import { MenuItem, Grid } from "@mui/material";

const RateCut = () => {
  const [selectedButton, setSelectedButton] = useState("amount");
  const [amountData, setAmountData] = useState({
    value1: "",
    value2: "",
    value3: "",
  });
  const [metalData, setMetalData] = useState({
    value1: "",
    value2: "",
    value3: "",
  });

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    setAmountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMetalChange = (e) => {
    const { name, value } = e.target;
    setMetalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (type) => {
    if (type === "amount") {
      console.log("Amount data saved: ", amountData);
    } else if (type === "metal") {
      console.log("Metal data saved: ", metalData);
    }
  };

  const metalTypeArr = [
    {
      id:1,
      name:'GOLD 10K'
    },
    {
      id:2,
      name:'GOLD 18K'
    },
    {
      id:3,
      name:'GOLD 24K'
    },

  ]

  return (
    <div>
      {/* Toggle Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          className={`btn ${
            selectedButton === "amount" ? "btn-primary" : "btn-warning"
          }`}
          onClick={() => setSelectedButton("amount")}
        >
          Convert To Amount
        </button>
        <button
          className={`btn ${
            selectedButton === "metal" ? "btn-primary" : "btn-warning"
          }`}
          onClick={() => setSelectedButton("metal")}
        >
          Convert To Metal
        </button>
      </div>
      
      <Grid container className="valueMainDiv " style={{ paddingTop:'20px', paddingLeft:'15px'}}>
        <Grid item xs={12} sm={6} md={3} >
                <div className="valueMainDivP pb-1" >Metal Type</div>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="allCustomize_textinput"
                  variant="filled"
                >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                  {
                    metalTypeArr?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
                      )
                    })
                  }
                </CustomTextField>
                </Grid>
              </Grid>

      {/* {selectedButton === "amount" && (
        <div className="amaountmain">
          <div>
            <div className="valueMainDiv">
              <p className="valueMainDivP">Amount</p>
              <input
                type="text"
                name="value1"
                value={amountData.value1}
                onChange={handleAmountChange}
              />
            </div>
            <div className="valueMainDiv">
              <p className="valueMainDivP">Rate In 24K</p>
              <input
                type="text"
                name="value2"
                value={amountData.value2}
                onChange={handleAmountChange}
              />
            </div>

            <div className="valueMainDiv">
              <p className="valueMainDivP">Metal In 24K</p>
              <input
                type="text"
                name="value3"
                value={amountData.value3}
                onChange={handleAmountChange}
              />
            </div>
          </div>
          <button
            className="SaveBtnAmaount"
            onClick={() => handleSave("amount")}
          >
            Save
          </button>
        </div>
      )} */}
      {selectedButton === "amount" && (
  <div className="amountMain_rc">
    <div className="amountGrid_rc">
      <div className="valueMainDiv_rc">
        <div className="valueMainDivP">Amount</div>
        <input
          type="text"
          name="value1"
          value={amountData.value1}
          onChange={handleAmountChange}
          className="inputF_rc"
        />
      </div>
      <div className="valueMainDiv_rc">
        <div className="valueMainDivP">Rate In 24K</div>
        <input
          type="text"
          name="value2"
          value={amountData.value2}
          onChange={handleAmountChange}
          className="inputF_rc"
        />
      </div>
      <div className="valueMainDiv_rc">
        <div className="valueMainDivP">Metal In 24K</div>
        <input
          type="text"
          name="value3"
          value={amountData.value3}
          onChange={handleAmountChange}
          className="inputF_rc"
        />
      </div>
    </div>
    <button
      className="saveBtnAmount_rc"
      onClick={() => handleSave("amount")}
    >
      Save
    </button>
  </div>
)}

{selectedButton === "metal" && (
  <div className="amountMain_rc">
    <div className="amountGrid_rc">
      <div className="valueMainDiv_rc">
        <div className="valueMainDivP">Metal In 24K</div>
        <input
          type="text"
          name="value1"
          value={metalData.value1}
          onChange={handleMetalChange}
          className="inputF_rc"
        />
      </div>
      <div className="valueMainDiv_rc">
        <div className="valueMainDivP">Rate In 24K</div>
        <input
          type="text"
          name="value2"
          value={metalData.value2}
          onChange={handleMetalChange}
          className="inputF_rc"
        />
      </div>
      <div className="valueMainDiv_rc">
        <div className="valueMainDivP">Amount</div>
        <input
             type="text"
             name="value3"
             value={metalData.value3}
             onChange={handleMetalChange}
          className="inputF_rc"
        />
      </div>
    </div>
    <button
      className="saveBtnAmount_rc"
      onClick={() => handleSave("metal")}
    >
      Save
    </button>
  </div>
)}


      {/* {selectedButton === "metal" && (
        <div className="amaountmain">
          <div>
            <div className="valueMainDiv">
              <p className="valueMainDivP">Metal In 24K</p>
              <input
                type="text"
                name="value1"
                value={metalData.value1}
                onChange={handleMetalChange}
              />
            </div>

            <div className="valueMainDiv">
              <p className="valueMainDivP">Rate In 24K</p>
              <input
                type="text"
                name="value2"
                value={metalData.value2}
                onChange={handleMetalChange}
              />
            </div>

            <div className="valueMainDiv">
              <p className="valueMainDivP">Amount</p>
              <input
                type="text"
                name="value3"
                value={metalData.value3}
                onChange={handleMetalChange}
              />
            </div>
          </div>
          <button
            className="SaveBtnAmaount"
            onClick={() => handleSave("metal")}
          >
            Save
          </button>
        </div>
      )} */}
    </div>
  );
};

export default RateCut;
