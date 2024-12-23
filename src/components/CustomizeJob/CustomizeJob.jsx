import React, { useState } from "react";
import "./customizejob.css";
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

const CustomizeJob = () => {
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
        {/* Product Info */}
        Customize Job No 1/12345
      </div>

      {/* Toggle Buttons */}
      {/* <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
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
      </div> */}

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
                </RadioGroup>
              </FormControl>

              {criteriaBased && (
                <Grid container spacing={1} className="checkboxesSection">
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
                </Grid>
              )}
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

export default CustomizeJob;

// import React from 'react';
// import "./customizejob.css";
// import { useDispatch } from 'react-redux';
// import { handleCustomizeJobFlag } from '../../redux/slices/HomeSlice';
// import { Settings } from '@mui/icons-material';
// import DeleteIcon from "../../assets/images/delete.png";
// import  EditIcon  from '@mui/icons-material/Edit';
// const CustomizeJob = () => {
//     const dispatch = useDispatch();
//   return (
//     <>
//     <div className='customizejob_container'>
//         <div className='py-2 ps-2 text-secondary fw-bold headline_cmj'>Customize Job No <span className='text-dark'>1/12345</span></div>
//         {/* Job Line */}
//         <div className="job-info">
//             <div>Tag No: <b className="text-primary">1/12566</b></div>
//             <div>Net Wt: <b className="text-primary">2.256 gm</b></div>
//             <div>Pure Wt: <b className="text-primary">1.256</b></div>
//             <div>Dia: <b className="text-primary">2.256 cts</b></div>
//             <div>Amount: <b className="text-primary">120000</b></div>
//         </div>
//         <div className="filters-container_cjob">
//             <div className="filter-item">
//                 <label htmlFor="metallosson">Metal Loss On</label>
//                 <select name="metallosson" id="metallosson">
//                     <option value="" disabled selected>Net Weight</option>
//                 </select>
//             </div>
//             <div className="filter-item">
//                 <label htmlFor="MetLoss">Metal Loss By</label>
//                 {/* <input type="text" placeholder="" id='MetLoss' /> */}
//                 <select name="MetLoss" id="MetLoss">
//                     <option value=""  selected disabled></option>
//                     <option value="" >Wt</option>
//                     <option value="" >Percentage</option>
//                 </select>
//             </div>
//             <div className="filter-item">
//                 <label htmlFor="making">Metal Loss</label>
//                 <input type="text" placeholder="" id='making' />
//             </div>
//             <div className="filter-item">
//                 <label htmlFor="makingrate">Making Rate</label>
//                 <input type="text" placeholder="" id='makingrate' />
//             </div>
            
//             <div className="filter-item">
//                 <label htmlFor="makingon">Making On</label>
//                 <select name="makingon" id="makingon">
//                     <option value="" disabled selected>Net Weight</option>
//                 </select>
//             </div>

//             <div className="filter-item">
//                 <label htmlFor="handling">Handling</label>
//                 <input type="text" placeholder="" id='handling' />
//             </div>

//         </div>

//         <div >
//             <table className='table'>
//                 <thead>
//                     <tr>
//                         <th>Details</th>
//                         <th>Group#</th>
//                         <th>Quality</th>
//                         <th>Wt(G+D)</th>
//                         <th>GrossWt</th>
//                         <th>NetWt</th>
//                         <th>Net(24K)</th>
//                         <th>Amount</th>
//                         <th>Metal</th>
//                         <th>Dia CTW</th>
//                         <th>Dia Rate</th>
//                         <th>Dia Amt.</th>
//                         <th>CS CTW</th>
//                         <th>CS Rate</th>
//                         <th>CS Amt.</th>
//                         <th>MISC CTW</th>
//                         <th>MISC Rate</th>
//                         <th>MISC Amt.</th>
//                         <th>Make Rate</th>
//                         <th>Total Amt</th>
//                         <th>Edit</th>
//                         <th>Del</th>
//                         <th>Apply</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td align='left' style={{cursor:'pointer'}}><span>1/271928</span> <br /><span className="smallText">D#: LR23453</span></td>
//                         <td></td>
//                         <td>PD 18K</td>
//                         <td>10.400</td>
//                         <td>10.000</td>
//                         <td>2.700</td>
//                         <td>2.900</td>
//                         <td>20000</td>
//                         <td><Settings /></td>
//                         <td>1.040</td>
//                         <td>670</td>
//                         <td>3400</td>
//                         <td>2.809</td>
//                         <td>120</td>
//                         <td>680</td>
//                         <td>1.234</td>
//                         <td>230</td>
//                         <td>4500</td>
//                         <td>10000</td>
//                         <td>20000</td>
//                         <td><EditIcon titleAccess='Edit' /></td>
//                         <td><img src={DeleteIcon} alt="#delete" title='Delete' style={{height:'20px', width:'20px', cursor:'pointer'}} /></td>
//                         <td>
//                             <button className='btn btn-warning p-1' onClick={() => dispatch(handleCustomizeJobFlag(false))}>Save</button></td>
//                     </tr>
//                 </tbody>
//             </table>
//         </div>

//     </div>
//     </>
//   )
// }

// export default CustomizeJob