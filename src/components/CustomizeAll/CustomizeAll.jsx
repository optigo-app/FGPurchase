import React, { useState } from "react";
import "./customizeAll.css";
import CustomTextField from "../TextField/index";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Grid,
  Radio,
  RadioGroup,
} from "@mui/material";

const CustomizeAll = () => {
  const [selectedButton, setSelectedButton] = useState("CustomizeAll");
  const [selectedOption, setSelectedOption] = useState("CustomizeAll");
  const [makingChargeOn, setMakingChargeOn] = useState('');
  const [criteriaBased, setCriteriaBased] = useState(false);
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

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "criteria") {
      setCriteriaBased(true);
    } else {
      setCriteriaBased(false);
    }
  };

  const handleSave = (type) => {
    if (type === "CustomizeAll") {
      console.log("Amount data saved: ", amountData);
    } else if (type === "Making_Category_Wise") {
      console.log("Metal data saved: ", metalData);
    }
  };


  const handleMakingChargeOn = (e) => {
    setMakingChargeOn(e.target.value);
  }

  const makingChargeOnArr = [
    {
      id:1,
      name:'netwt'
    },
    {
      id:2,
      name:'grosswt'
    },
    {
      id:3,
      name:'OnPcs'
    },

  ];

  const makingArr = [
    {
      id:1,
      name:'Amount'
    },
    {
      id:2,
      name:'Design Master (%)'
    },
    {
      id:3,
      name:'Gold Rate (%)'
    },

  ]

  const discountArr = [
    {
      id:1,
      name:'% Per Pcs'
    },
    {
      id:2,
      name:'Amount Per Pcs'
    },
    {
      id:3,
      name:'Making Amount (inc. tax)'
    },
    {
      id:4,
      name:'Total Amount (inc. tax)'
    },
    {
      id:5,
      name:'Diamond Amount (inc. tax)'
    },

  ]

  return (
    <div>

      <div className="MainTitleLine">
        Product Info
      </div>

      {/* Toggle Buttons */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          className={`btn ${
            selectedButton === "CustomizeAll" ? "btn-primary" : "btn-warning"
          }`}
          onClick={() => setSelectedButton("CustomizeAll")}
        >
          Customize All
        </button>
        <button
          className={`btn ${
            selectedButton === "Making_Category_Wise"
              ? "btn-primary"
              : "btn-warning"
          }`}
          onClick={() => setSelectedButton("Making_Category_Wise")}
        >
          Making Category Wise
        </button>
      </div>

      {selectedButton === "CustomizeAll" && (
        <div className="mt-3 sm:mt-2 xs:mt-1 ">
          <div style={{ width: "100%" }} className="mb-3 sm:mb-2 xs:mb-1">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={3}  className="valueMainDiv">
                <p className="valueMainDivP">Metal Rate (24K)</p>
                <CustomTextField
                  type="text"
                  placeholder=""
                  className="cinputfield"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv">
                <p className="valueMainDivP">Metal Loss On</p>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfield"
                  variant="filled"
                >
                      <MenuItem value="" selected disabled></MenuItem>
                  {
                    makingChargeOnArr?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
                      )
                    })
                  }
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv">
                <p className="valueMainDivP">Metal Loss By</p>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfield"
                  variant="filled"
                >
                      <MenuItem value="" selected disabled></MenuItem>
                  {
                    makingChargeOnArr?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
                      )
                    })
                  }
                </CustomTextField>
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv">
                <p className="valueMainDivP">Metal Loss </p>
                <CustomTextField
                  type="text"
                  placeholder=""
                  className="cinputfield"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv">
                <p className="valueMainDivP">Making</p>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfield"
                  variant="filled"
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  {
                    makingArr?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
                      )
                    })
                  }
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv">
                <p className="valueMainDivP">Making Charge</p>
                <CustomTextField
                  type="text"
                  placeholder=""
                  className="cinputfield"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv">
                <p className="valueMainDivP">On</p>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfield"
                  variant="filled"
                >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                  {
                    makingChargeOnArr?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
                      )
                    })
                  }
                </CustomTextField>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv">
                <p className="valueMainDivP">Diamond Handling</p>
                <CustomTextField
                  type="text"
                  placeholder=""
                  className="cinputfield"
                />
              </Grid>
            </Grid>

            {/* <div className="valueMainDiv">
              <p className="valueMainDivP">Discount</p>
              <CustomTextField
                type="text"
                placeholder="Discount"
                className="allCustomize_textinput"
              />
            </div>
            <div className="valueMainDiv">
              <p className="valueMainDivP">On</p>
              <CustomTextField
                select
                customBorderColor="rgba(47, 43, 61, 0.2)"
                borderoutlinedColor="#00CFE8"
                customTextColor="#2F2B3DC7"
                customFontSize="0.8125rem"
                size="small"
                variant="filled"
                className="allCustomize_textinput"
                
              >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  {
                    discountArr?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
                      )
                    })
                  }
              </CustomTextField>
            </div> */}

        
          </div>
          <div >
            <div style={{overflowX:'scroll'}} className="w-100 sclbar_czall">
            <table style={{ width: "100%", minWidth:'800px' }}>
              <tr className="tableMainTitle">
                <th className="single_tableTr1 p-1">Sr#</th>
                <th className="single_tableTr2">Info</th>
                <th className="single_tableTr3">Size</th>
                <th className="single_tableTr4">Ctw</th>
                <th className="single_tableTr5">Pcs</th>
                <th className="single_tableTr6">Setting</th>
                <th className="single_tableTr6">Rate/Unit</th>
                <th className="single_tableTr7">Rate On</th>
                <th className="single_tableTr8">Total Amount</th>
              </tr>
              <tr>
                <td colSpan={"8"}  className="single_tableExtraTitle text-primary">
                  Diamond
                </td>
              </tr>
              <tr>
                <td className="single_tableTr2_td">1</td>
                <td className="single_tableTr2_td">NTR PD PD</td>
                <td className="single_tableTr2_td">1mm</td>
                <td className="single_tableTr2_td">2.750</td>
                <td className="single_tableTr2_td">2</td>
                <td className="single_tableTr2_td">
                <CustomTextField className="cinputfield" />
                </td>
                <td className="single_tableTr2_td">
                  <CustomTextField className="cinputfield" />
                </td>
                <td className="single_tableTr7_td">
                  <div>
                    <input type="radio" name="toggle" defaultChecked />
                    Ctw
                  </div>
                  <div>
                    <input type="radio" name="toggle" />
                    Pcs
                  </div>
                </td>
                <td>
                  <CustomTextField className="cinputfield" />
                </td>
              </tr>

              <tr>
                <td colSpan={"8"} className="single_tableExtraTitle  text-primary">
                  Color Stone
                </td>
              </tr>
              <tr>
                <td className="single_tableTr2_td">1</td>
                <td className="single_tableTr2_td">NTR PD PD</td>
                <td className="single_tableTr2_td">1mm</td>
                <td className="single_tableTr2_td">2.750</td>
                <td className="single_tableTr2_td">2</td>
                <td className="single_tableTr2_td">
                <CustomTextField className="cinputfield" />
                </td>
                <td className="single_tableTr2_td">
                  <CustomTextField className="cinputfield" />
                </td>
                <td className="single_tableTr7_td">
                  <div>
                    <input type="radio" name="toggle" defaultChecked />
                    Ctw
                  </div>
                  <div>
                    <input type="radio" name="toggle" />
                    Pcs
                  </div>
                </td>
                <td>
                  <CustomTextField className="cinputfield" />
                </td>
              </tr>
              <tr>
                <td colSpan={"8"} className="single_tableExtraTitle  text-primary">
                  Misc
                </td>
              </tr>
              <tr>
                <td className="single_tableTr2_td">1</td>
                <td className="single_tableTr2_td">NTR PD PD</td>
                <td className="single_tableTr2_td">1mm</td>
                <td className="single_tableTr2_td">2.750</td>
                <td className="single_tableTr2_td">2</td>
                <td className="single_tableTr2_td">
                <CustomTextField className="cinputfield" />
                </td>
                <td className="single_tableTr2_td">
                  <CustomTextField className="cinputfield" />
                </td>
                <td className="single_tableTr7_td">
                  <div>
                    <input type="radio" name="toggle" defaultChecked />
                    Ctw
                  </div>
                  <div>
                    <input type="radio" name="toggle" />
                    Pcs
                  </div>
                </td>
                <td>
                  <CustomTextField className="cinputfield" />
                </td>
              </tr>
            </table>
            </div>
            <hr />
            {/* <p className="single_tableExtraTitle valueMainDivP pb-2 fw-bold text-secondary">Other Charge</p> */}
            <div style={{  }} className="pb-2">
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <div className="valueMainDivP"> Certification Charge </div>
                  <CustomTextField className="cinputfield" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <div className="valueMainDivP">Vermal charges</div>
                  <CustomTextField className="cinputfield" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <div className="valueMainDivP">HallMark Charges</div>
                  <CustomTextField className="cinputfield" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <div className="valueMainDivP">Dancing Collet</div>
                  <CustomTextField className="cinputfield" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2}>
                  <div className="valueMainDivP"> Magnet Charges</div>
                  <CustomTextField className="cinputfield" />
                </Grid>
              </Grid>
              <div>
                {/* <div>
                  <p className="single_tableExtraTitle_p">HallMark Charges</p>
                  <CustomTextField />
                </div>
                <div>
                  <p className="single_tableExtraTitle_p">Dancing Collet</p>
                  <CustomTextField />
                </div> */}
              </div>
              <div>
                {/* <div>
                  <p className="single_tableExtraTitle_p"> Magnet Charges</p>
                  <CustomTextField />
                </div> */}
              </div>
            </div>
          </div>
          <Grid container spacing={1} className="pb-2">
            <Grid item xs={12} sm={6} md={3} lg={2} className="valueMainDiv">
              <div>
                <p className="valueMainDivP">Discount</p>
                <CustomTextField type="text" placeholder="Discount" className="cinputfield" />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={2} className="valueMainDiv">
              <div>
                <p className="valueMainDivP">On</p>
                <CustomTextField select customBorderColor="rgba(47, 43, 61, 0.2)" borderoutlinedColor="#00CFE8" customTextColor="#2F2B3DC7" customFontSize="0.8125rem" size="small" variant="filled" className="cinputfield" >
                    <MenuItem value="">
                      <em></em>
                    </MenuItem>
                    {
                      discountArr?.map((e, i) => {
                        return (
                          <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
                        )
                      })
                    }
                </CustomTextField>
              </div>
            </Grid>
          </Grid>
          <div className="pb-4 pt-3">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={selectedOption}
                  onChange={handleOptionChange}
                  aria-label="total-option"
                >
                  <FormControlLabel
                    value="amount"
                    control={<Radio />}
                    label="Total Amount"
                  />
                  <FormControlLabel
                    value="criteria"
                    control={<Radio />}
                    label="Total Criteria Based"
                  />
                       { criteriaBased && <span className="d-flex ">
                  <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Diamond Rate"
                    />
                    
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>

                    <FormControlLabel
                      control={<Checkbox />}
                      label="Stone Rate"
                      />
                      </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Metal Rate"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Labour Rate"
                      />
                      </Grid>
                      </span>}
                </RadioGroup>
                
              </FormControl>

              {/* {criteriaBased && (
                // <Grid container spacing={1} className="checkboxesSection">
                  <span>
                  <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Diamond Rate"
                    />
                    
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>

                    <FormControlLabel
                      control={<Checkbox />}
                      label="Stone Rate"
                      />
                      </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Metal Rate"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Labour Rate"
                      />
                      </Grid>
                      </span>
                // </Grid>
              )} */}
              <button className="SaveBtnAmaountCZALL" onClick={() => handleSave("amount")} >
                Discount Apply
              </button>
            </div>
        </div>
      )}

      {selectedButton === "Making_Category_Wise" && (
        <div className="maskingCategoryWiseMain">
          <table className="maskingCategoryWiseMain_table">
            <tr>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Making Unit</th>
              <th>Making Charge On</th>
            </tr>
            <tr>
              <td>Ring</td>
              <td>Light ring</td>
              <td>
                <CustomTextField className="cinputfield" />
              </td>
              <td>
                <CustomTextField
                  select
                  fullWidth
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfield"
                  variant="filled"
                  style={{ width: "200px" }}
                >
                  <MenuItem value="">
                    <em></em>
                  </MenuItem>
                  {
                    makingChargeOnArr?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
                      )
                    })
                  }
                </CustomTextField>
              </td>
            </tr>
          </table>
          <button
            className="SaveBtnAmaountCZALL"
            onClick={() => handleSave("metal")}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomizeAll;
