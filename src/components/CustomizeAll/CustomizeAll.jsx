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
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import { capitalizeWords } from "../../master/global";

const CustomizeAll = () => {
  const theme = useTheme();
  const is1080 = useMediaQuery(theme.breakpoints.up('1150'));
  console.log(is1080);
  
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

  const handleToggleLabel = (btn) => {

    if(btn === 'btn1'){
      setSelectedButton('CustomizeAll');
    }else{
      setSelectedButton('Making_Category_Wise');
    }
  }
  return (
    <div>

      <div className="MainTitleLine">
        Product Info
      </div>

      <div className="my-2 mt-3">
          <input type="checkbox" id="toggle" className="toggleCheckbox" />
          <label for="toggle" className='toggleContainer'>
            <div className="fs_fgp fw-normal" onClick={() => handleToggleLabel('btn1')}>CustomizeAll</div>   
            <div className="fs_fgp fw-normal" onClick={() => handleToggleLabel('btn2')}>Making Category Wise</div>
          </label>
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
              {/* <Grid item xs={12} sm={6} md={4} lg={3}  className="valueMainDiv"> */}
              <Grid item xs={12} sm={6} md={4} lg={3}  className="">
                {/* <p className="valueMainDivP">Metal Rate (24K)</p>
                <CustomTextField
                  type="text"
                  placeholder=""
                  className="cinputfieldAll"
                  customTextColor="#7367F0"
                /> */}
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metalRate" className="fs_fgp  text_color">Metal Rate (24K)</label>
                  <input type="text" placeholder="" autoFocus  id="metalRate"  className='categoryNewOrder filter_item_call fs_fgp'   />
                </div>
              
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metallosson" className="fs_fgp text_color">Metal Loss On</label>
                  <select name="" id="metallosson" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
                    <option value="" disabled selected></option>
                    {
                      makingChargeOnArr?.map((e, i) => {
                        return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                      })
                    }
                </select>
                </div>
                {/* <p className="valueMainDivP">Metal Loss On</p>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#7367F0"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfieldAll"
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
                </CustomTextField> */}
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
              <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metallossby" className="fs_fgp text_color">Metal Loss By</label>
                  <select name="" id="metallossby" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
                    <option value="" disabled selected></option>
                    {
                      makingChargeOnArr?.map((e, i) => {
                        return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                      })
                    }
                </select>
                </div>
                {/* <p className="valueMainDivP">Metal Loss By</p>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfieldAll"
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
                </CustomTextField> */}
              </Grid>

              {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metalRate" className="fs_fgp  text_color">Metal Rate (24K)</label>
                  <input type="text" placeholder="" autoFocus  id="metalRate"  className='categoryNewOrder filter_item_call fs_fgp'   />
                </div>
                {/* <p className="valueMainDivP">Metal Loss </p>
                <CustomTextField
                  type="text"
                  placeholder=""
                  className="cinputfieldAll"
                /> */}
              </Grid>

              {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metallossby" className="fs_fgp text_color">Metal Loss By</label>
                  <select name="" id="metallossby" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
                    <option value="" disabled selected></option>
                    {
                      makingArr?.map((e, i) => {
                        return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                      })
                    }
                </select>
                </div>
                {/* <p className="valueMainDivP">Making</p>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfieldAll"
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
                </CustomTextField> */}
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
              <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metalcharge" className="fs_fgp  text_color">Making Charge</label>
                  <input type="text" placeholder="" autoFocus  id="metalcharge"  className='categoryNewOrder filter_item_call fs_fgp'   />
                </div>
                {/* <p className="valueMainDivP">Making Charge</p>
                <CustomTextField
                  type="text"
                  placeholder=""
                  className="cinputfieldAll"
                /> */}
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
              <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="makingon" className="fs_fgp text_color">Making On</label>
                  <select name="" id="makingon" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
                    <option value="" disabled selected></option>
                    {
                      makingChargeOnArr?.map((e, i) => {
                        return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                      })
                    }
                </select>
                </div>
                {/* <p className="valueMainDivP">On</p>
                <CustomTextField
                  select
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfieldAll"
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
                </CustomTextField> */}
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="diamondhandling" className="fs_fgp  text_color">Diamond Handling</label>
                  <input type="text" placeholder="" autoFocus  id="diamondhandling"  className='categoryNewOrder filter_item_call fs_fgp'   />
                </div>
                {/* <p className="valueMainDivP">Diamond Handling</p>
                <CustomTextField
                  type="text"
                  placeholder=""
                  className="cinputfieldAll"
                /> */}
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
            <div style={{overflow:'auto'}} className="w-100 sclbar_czall">
            <table style={{ width: "100%", minWidth:'800px' }}>
              <tr className="tableMainTitle">
                <th className="single_tableTr1 p-1 text_color">Sr#</th>
                <th className="single_tableTr2 text_color">Info</th>
                <th className="single_tableTr3 text_color">Size</th>
                <th className="single_tableTr4 text_color">Ctw</th>
                <th className="single_tableTr5 text_color">Pcs</th>
                <th className="single_tableTr6 text_color">Setting</th>
                <th className="single_tableTr6 text_color">Rate/Unit</th>
                <th className="single_tableTr7 text_color">Rate On</th>
                <th className="single_tableTr8 text_color">Total Amount</th>
              </tr>
              <tr>
                <td colSpan={"8"}  className="single_tableExtraTitle" style={{color:theme?.palette?.customColors?.purple}}>
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
                {/* <CustomTextField className="cinputfieldAll" /> */}
                <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
                <td className="single_tableTr2_td">
                  {/* <CustomTextField className="cinputfieldAll" /> */}
                  <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
                <td className="single_tableTr7_td">
                <RadioGroup row aria-label='sizes'  name='sizes' defaultValue='job' >
                  <FormControlLabel value='job' control={<Radio size="small" sx={{
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                    },
                  }} />} label='Ctw' className='fs_fgp' />
                  <FormControlLabel value='memo' control={<Radio size="small" sx={{
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                    },
                  }} />} label='Pcs' className='fs_fgp' />
                </RadioGroup>
                  {/* <div>
                    <input type="radio" name="toggle" defaultChecked />
                    Ctw
                  </div>
                  <div>
                    <input type="radio" name="toggle" />
                    Pcs
                  </div> */}
                </td>
                <td>
                  {/* <CustomTextField className="cinputfieldAll" /> */}
                  <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
              </tr>

              <tr>
                <td colSpan={"8"} className="single_tableExtraTitle  " style={{color:theme?.palette?.customColors?.purple}}>
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
                {/* <CustomTextField className="cinputfieldAll" /> */}
                <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
                <td className="single_tableTr2_td">
                  {/* <CustomTextField className="cinputfieldAll" /> */}
                  <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
                <td className="single_tableTr7_td">
                <RadioGroup row aria-label='sizes'  name='sizes' defaultValue='job' >
                  <FormControlLabel value='job' control={<Radio size="small" sx={{
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                    },
                  }} />} label='Ctw' className='fs_fgp' />
                  <FormControlLabel value='memo' control={<Radio size="small" sx={{
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                    },
                  }} />} label='Pcs' className='fs_fgp' />
                </RadioGroup>
                  {/* <div>
                    <input type="radio" name="toggle" defaultChecked />
                    Ctw
                  </div>
                  <div>
                    <input type="radio" name="toggle" />
                    Pcs
                  </div> */}
                </td>
                <td>
                  {/* <CustomTextField className="cinputfieldAll" /> */}
                  <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
              </tr>
              <tr>
                <td colSpan={"8"} className="single_tableExtraTitle  " style={{color:theme?.palette?.customColors?.purple}}>
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
                {/* <CustomTextField className="cinputfieldAll" /> */}
                <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
                <td className="single_tableTr2_td">
                  {/* <CustomTextField className="cinputfieldAll" /> */}
                  <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
                <td className="single_tableTr7_td">
                <RadioGroup row aria-label='sizes'  name='sizes' defaultValue='job' >
                  <FormControlLabel value='job' control={<Radio size="small" sx={{
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                    },
                  }} />} label='Ctw' className='fs_fgp' />
                  <FormControlLabel value='memo' control={<Radio size="small" sx={{
                    '&.Mui-checked': {
                      color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                    },
                  }} />} label='Pcs' className='fs_fgp' />
                </RadioGroup>
                  {/* <div>
                    <input type="radio" name="toggle" defaultChecked />
                    Ctw
                  </div>
                  <div>
                    <input type="radio" name="toggle" />
                    Pcs
                  </div> */}
                </td>
                <td>
                  {/* <CustomTextField className="cinputfieldAll" /> */}
                  <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
                </td>
              </tr>
            </table>
            </div>
            <hr />
            {/* <p className="single_tableExtraTitle valueMainDivP pb-2 fw-bold text-secondary">Other Charge</p> */}
           
          </div>
          <Grid container spacing={1} className="pb-2" alignItems="center"  wrap={is1080 ? "nowrap" : "wrap"}>
  <Grid item xs={12} sm={6} md={2} lg={2}>
    <div className="d-flex align-items-start flex-column w-100">
      <label htmlFor="certcharge" className="fs_fgp text_color">Certification Charge</label>
      <input type="text" placeholder="" id="certcharge" className='categoryNewOrder filter_item_call fs_fgp' />
    </div>
  </Grid>

  <Grid item xs={12} sm={6} md={2} lg={2}>
    <div className="d-flex align-items-start flex-column w-100">
      <label htmlFor="vermal" className="fs_fgp text_color">Vermal Charges</label>
      <input type="text" placeholder="" id="vermal" className='categoryNewOrder filter_item_call fs_fgp' />
    </div>
  </Grid>

  <Grid item xs={12} sm={6} md={2} lg={2}>
    <div className="d-flex align-items-start flex-column w-100">
      <label htmlFor="hallmark" className="fs_fgp text_color">HallMark Charges</label>
      <input type="text" placeholder="" id="hallmark" className='categoryNewOrder filter_item_call fs_fgp' />
    </div>
  </Grid>

  <Grid item xs={12} sm={6} md={2} lg={2}>
    <div className="d-flex align-items-start flex-column w-100">
      <label htmlFor="dancing" className="fs_fgp text_color">Dancing Collet</label>
      <input type="text" placeholder="" id="dancing" className='categoryNewOrder filter_item_call fs_fgp' />
    </div>
  </Grid>

  <Grid item xs={12} sm={6} md={2} lg={2}>
    <div className="d-flex align-items-start flex-column w-100">
      <label htmlFor="magnet" className="fs_fgp text_color">Magnet Charges</label>
      <input type="text" placeholder="" id="magnet" className='categoryNewOrder filter_item_call fs_fgp' />
    </div>
  </Grid>

  <Grid item xs={12} sm={6} md={2} lg={2}>
    <div className="d-flex align-items-start flex-column w-100">
      <label htmlFor="dis" className="fs_fgp text_color">Discount</label>
      <input type="text" placeholder="" id="dis" className='categoryNewOrder filter_item_call fs_fgp' />
    </div>
  </Grid>

  <Grid item xs={12} sm={6} md={2} lg={2}>
    <div className="d-flex align-items-start flex-column w-100">
      <label htmlFor="dison" className="fs_fgp text_color">Making On</label>
      <select id="dison" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
        <option value="" disabled selected></option>
        {discountArr?.map((e, i) => (
          <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
        ))}
      </select>
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
                  sx={{color:'grey'}}
                    value="amount"
                    control={<Radio sx={{
                      '&.Mui-checked': {
                        color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                      },
                    }} />}
                    label="Total Amount"
                  />
                  <FormControlLabel
                  sx={{color:'grey'}}
                    value="criteria"
                    control={<Radio sx={{
                      '&.Mui-checked': {
                        color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                      },
                    }} />}
                    label="Total Criteria Based"
                  />
                       { criteriaBased && <span className="d-flex ">
                  <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
                    <FormControlLabel
                    sx={{color:'grey'}}
                      control={<Checkbox sx={{
                      '&.Mui-checked': {
                        color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                      },
                    }} />}
                      label="Diamond Rate"
                    />
                    
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>

                    <FormControlLabel
                    sx={{color:'grey'}}
                      control={<Checkbox sx={{
                      '&.Mui-checked': {
                        color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                      },
                    }} />}
                      label="Stone Rate"
                      />
                      </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
                    <FormControlLabel
                    sx={{color:'grey'}}
                      control={<Checkbox sx={{
                      '&.Mui-checked': {
                        color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                      },
                    }} />}
                      label="Metal Rate"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={2}>
                    <FormControlLabel
                    sx={{color:'grey'}}
                      control={<Checkbox sx={{
                      '&.Mui-checked': {
                        color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
                      },
                    }} />}
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
              {/* <button className="SaveBtnAmaountCZALL" onClick={() => handleSave("amount")} >
                Discount Apply
              </button> */}
              <Button size="small" variant="contained" sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} onClick={() => handleSave("amount")} >
                Discount Apply
              </Button>
            </div>
        </div>
      )}

      {selectedButton === "Making_Category_Wise" && (
        <div className="maskingCategoryWiseMain my-4" >
          <table className="maskingCategoryWiseMain_table text_color" style={{maxWidth:'600px', width:'100%'}}>
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
                {/* <CustomTextField className="cinputfieldAll" /> */}
                <input type="text" placeholder="" autoFocus  id="metalRate"  className='categoryNewOrder filter_item_call fs_fgp'   />
              </td>
              <td>
              <select name="" id="metallosson" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select ms-1'>
                    <option value="" disabled selected></option>
                    {
                      makingChargeOnArr?.map((e, i) => {
                        return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                      })
                    }
                </select>
                {/* <CustomTextField
                  select
                  fullWidth
                  customBorderColor="rgba(47, 43, 61, 0.2)"
                  borderoutlinedColor="#00CFE8"
                  customTextColor="#2F2B3DC7"
                  customFontSize="0.8125rem"
                  size="small"
                  className="cinputfieldAll"
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
                </CustomTextField> */}
              </td>
            </tr>
          </table>
          <Button size="small" variant="contained" sx={{backgroundColor:theme?.palette?.customColors?.purple, color:'white'}} onClick={() => handleSave("metal")} >
            Save
          </Button>
          {/* <button
            className="SaveBtnAmaountCZALL"
            onClick={() => handleSave("metal")}
          >
            Save
          </button> */}
        </div>
      )}
    </div>
  );
};

export default CustomizeAll;





// import React, { useState } from "react";
// import "./customizeAll.css";
// import CustomTextField from "../TextField/index";
// import {
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   MenuItem,
//   Grid,
//   Radio,
//   RadioGroup,
//   useTheme,
// } from "@mui/material";
// import { capitalizeWords } from "../../master/global";

// const CustomizeAll = () => {
//   const theme = useTheme();
//   const [selectedButton, setSelectedButton] = useState("CustomizeAll");
//   const [selectedOption, setSelectedOption] = useState("CustomizeAll");
//   const [makingChargeOn, setMakingChargeOn] = useState('');
//   const [criteriaBased, setCriteriaBased] = useState(false);
//   const [amountData, setAmountData] = useState({
//     value1: "",
//     value2: "",
//     value3: "",
//   });
//   const [metalData, setMetalData] = useState({
//     value1: "",
//     value2: "",
//     value3: "",
//   });

//   const handleAmountChange = (e) => {
//     const { name, value } = e.target;
//     setAmountData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMetalChange = (e) => {
//     const { name, value } = e.target;
//     setMetalData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//     if (event.target.value === "criteria") {
//       setCriteriaBased(true);
//     } else {
//       setCriteriaBased(false);
//     }
//   };

//   const handleSave = (type) => {
//     if (type === "CustomizeAll") {
//       console.log("Amount data saved: ", amountData);
//     } else if (type === "Making_Category_Wise") {
//       console.log("Metal data saved: ", metalData);
//     }
//   };


//   const handleMakingChargeOn = (e) => {
//     setMakingChargeOn(e.target.value);
//   }

//   const makingChargeOnArr = [
//     {
//       id:1,
//       name:'netwt'
//     },
//     {
//       id:2,
//       name:'grosswt'
//     },
//     {
//       id:3,
//       name:'OnPcs'
//     },

//   ];

//   const makingArr = [
//     {
//       id:1,
//       name:'Amount'
//     },
//     {
//       id:2,
//       name:'Design Master (%)'
//     },
//     {
//       id:3,
//       name:'Gold Rate (%)'
//     },

//   ]

//   const discountArr = [
//     {
//       id:1,
//       name:'% Per Pcs'
//     },
//     {
//       id:2,
//       name:'Amount Per Pcs'
//     },
//     {
//       id:3,
//       name:'Making Amount (inc. tax)'
//     },
//     {
//       id:4,
//       name:'Total Amount (inc. tax)'
//     },
//     {
//       id:5,
//       name:'Diamond Amount (inc. tax)'
//     },

//   ]

//   return (
//     <div>

//       <div className="MainTitleLine">
//         Product Info
//       </div>

//       {/* Toggle Buttons */}
//       <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//         <button
//           className={`btn ${
//             selectedButton === "CustomizeAll" ? "btn-primary" : "btn-warning"
//           }`}
//           onClick={() => setSelectedButton("CustomizeAll")}
//         >
//           Customize All
//         </button>
//         <button
//           className={`btn ${
//             selectedButton === "Making_Category_Wise"
//               ? "btn-primary"
//               : "btn-warning"
//           }`}
//           onClick={() => setSelectedButton("Making_Category_Wise")}
//         >
//           Making Category Wise
//         </button>
//       </div>

//       {selectedButton === "CustomizeAll" && (
//         <div className="mt-3 sm:mt-2 xs:mt-1 ">
//           <div style={{ width: "100%" }} className="mb-3 sm:mb-2 xs:mb-1">
//             <Grid container spacing={1}>
//               {/* <Grid item xs={12} sm={6} md={4} lg={3}  className="valueMainDiv"> */}
//               <Grid item xs={12} sm={6} md={4} lg={3}  className="">
//                 {/* <p className="valueMainDivP">Metal Rate (24K)</p>
//                 <CustomTextField
//                   type="text"
//                   placeholder=""
//                   className="cinputfieldAll"
//                   customTextColor="#7367F0"
//                 /> */}
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="metalRate" className="fs_fgp  text_color">Metal Rate (24K)</label>
//                   <input type="text" placeholder="" autoFocus  id="metalRate"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
              
//               </Grid>
//               {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
//               <Grid item xs={12} sm={6} md={4} lg={3} className="">
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="metallosson" className="fs_fgp text_color">Metal Loss On</label>
//                   <select name="" id="metallosson" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
//                     <option value="" disabled selected></option>
//                     {
//                       makingChargeOnArr?.map((e, i) => {
//                         return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
//                       })
//                     }
//                 </select>
//                 </div>
//                 {/* <p className="valueMainDivP">Metal Loss On</p>
//                 <CustomTextField
//                   select
//                   customBorderColor="rgba(47, 43, 61, 0.2)"
//                   borderoutlinedColor="#7367F0"
//                   customTextColor="#2F2B3DC7"
//                   customFontSize="0.8125rem"
//                   size="small"
//                   className="cinputfieldAll"
//                   variant="filled"
//                 >
//                       <MenuItem value="" selected disabled></MenuItem>
//                   {
//                     makingChargeOnArr?.map((e, i) => {
//                       return (
//                         <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
//                       )
//                     })
//                   }
//                 </CustomTextField> */}
//               </Grid>
//               {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
//               <Grid item xs={12} sm={6} md={4} lg={3} className="">
//               <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="metallossby" className="fs_fgp text_color">Metal Loss By</label>
//                   <select name="" id="metallossby" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
//                     <option value="" disabled selected></option>
//                     {
//                       makingChargeOnArr?.map((e, i) => {
//                         return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
//                       })
//                     }
//                 </select>
//                 </div>
//                 {/* <p className="valueMainDivP">Metal Loss By</p>
//                 <CustomTextField
//                   select
//                   customBorderColor="rgba(47, 43, 61, 0.2)"
//                   borderoutlinedColor="#00CFE8"
//                   customTextColor="#2F2B3DC7"
//                   customFontSize="0.8125rem"
//                   size="small"
//                   className="cinputfieldAll"
//                   variant="filled"
//                 >
//                       <MenuItem value="" selected disabled></MenuItem>
//                   {
//                     makingChargeOnArr?.map((e, i) => {
//                       return (
//                         <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
//                       )
//                     })
//                   }
//                 </CustomTextField> */}
//               </Grid>

//               {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
//               <Grid item xs={12} sm={6} md={4} lg={3} className="">
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="metalRate" className="fs_fgp  text_color">Metal Rate (24K)</label>
//                   <input type="text" placeholder="" autoFocus  id="metalRate"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//                 {/* <p className="valueMainDivP">Metal Loss </p>
//                 <CustomTextField
//                   type="text"
//                   placeholder=""
//                   className="cinputfieldAll"
//                 /> */}
//               </Grid>

//               {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
//               <Grid item xs={12} sm={6} md={4} lg={3} className="">
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="metallossby" className="fs_fgp text_color">Metal Loss By</label>
//                   <select name="" id="metallossby" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
//                     <option value="" disabled selected></option>
//                     {
//                       makingArr?.map((e, i) => {
//                         return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
//                       })
//                     }
//                 </select>
//                 </div>
//                 {/* <p className="valueMainDivP">Making</p>
//                 <CustomTextField
//                   select
//                   customBorderColor="rgba(47, 43, 61, 0.2)"
//                   borderoutlinedColor="#00CFE8"
//                   customTextColor="#2F2B3DC7"
//                   customFontSize="0.8125rem"
//                   size="small"
//                   className="cinputfieldAll"
//                   variant="filled"
//                 >
//                   <MenuItem value="">
//                     <em></em>
//                   </MenuItem>
//                   {
//                     makingArr?.map((e, i) => {
//                       return (
//                         <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
//                       )
//                     })
//                   }
//                 </CustomTextField> */}
//               </Grid>
//               {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
//               <Grid item xs={12} sm={6} md={4} lg={3} className="">
//               <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="metalcharge" className="fs_fgp  text_color">Making Charge</label>
//                   <input type="text" placeholder="" autoFocus  id="metalcharge"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//                 {/* <p className="valueMainDivP">Making Charge</p>
//                 <CustomTextField
//                   type="text"
//                   placeholder=""
//                   className="cinputfieldAll"
//                 /> */}
//               </Grid>
//               {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
//               <Grid item xs={12} sm={6} md={4} lg={3} className="">
//               <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="makingon" className="fs_fgp text_color">Making On</label>
//                   <select name="" id="makingon" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
//                     <option value="" disabled selected></option>
//                     {
//                       makingChargeOnArr?.map((e, i) => {
//                         return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
//                       })
//                     }
//                 </select>
//                 </div>
//                 {/* <p className="valueMainDivP">On</p>
//                 <CustomTextField
//                   select
//                   customBorderColor="rgba(47, 43, 61, 0.2)"
//                   borderoutlinedColor="#00CFE8"
//                   customTextColor="#2F2B3DC7"
//                   customFontSize="0.8125rem"
//                   size="small"
//                   className="cinputfieldAll"
//                   variant="filled"
//                 >
//                     <MenuItem value="">
//                       <em></em>
//                     </MenuItem>
//                   {
//                     makingChargeOnArr?.map((e, i) => {
//                       return (
//                         <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
//                       )
//                     })
//                   }
//                 </CustomTextField> */}
//               </Grid>
//               {/* <Grid item xs={12} sm={6} md={4} lg={3} className="valueMainDiv"> */}
//               <Grid item xs={12} sm={6} md={4} lg={3} className="">
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="diamondhandling" className="fs_fgp  text_color">Diamond Handling</label>
//                   <input type="text" placeholder="" autoFocus  id="diamondhandling"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//                 {/* <p className="valueMainDivP">Diamond Handling</p>
//                 <CustomTextField
//                   type="text"
//                   placeholder=""
//                   className="cinputfieldAll"
//                 /> */}
//               </Grid>
//             </Grid>

//             {/* <div className="valueMainDiv">
//               <p className="valueMainDivP">Discount</p>
//               <CustomTextField
//                 type="text"
//                 placeholder="Discount"
//                 className="allCustomize_textinput"
//               />
//             </div>
//             <div className="valueMainDiv">
//               <p className="valueMainDivP">On</p>
//               <CustomTextField
//                 select
//                 customBorderColor="rgba(47, 43, 61, 0.2)"
//                 borderoutlinedColor="#00CFE8"
//                 customTextColor="#2F2B3DC7"
//                 customFontSize="0.8125rem"
//                 size="small"
//                 variant="filled"
//                 className="allCustomize_textinput"
                
//               >
//                   <MenuItem value="">
//                     <em></em>
//                   </MenuItem>
//                   {
//                     discountArr?.map((e, i) => {
//                       return (
//                         <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
//                       )
//                     })
//                   }
//               </CustomTextField>
//             </div> */}

        
//           </div>
//           <div >
//             <div style={{overflow:'auto'}} className="w-100 sclbar_czall">
//             <table style={{ width: "100%", minWidth:'800px' }}>
//               <tr className="tableMainTitle">
//                 <th className="single_tableTr1 p-1 text_color">Sr#</th>
//                 <th className="single_tableTr2 text_color">Info</th>
//                 <th className="single_tableTr3 text_color">Size</th>
//                 <th className="single_tableTr4 text_color">Ctw</th>
//                 <th className="single_tableTr5 text_color">Pcs</th>
//                 <th className="single_tableTr6 text_color">Setting</th>
//                 <th className="single_tableTr6 text_color">Rate/Unit</th>
//                 <th className="single_tableTr7 text_color">Rate On</th>
//                 <th className="single_tableTr8 text_color">Total Amount</th>
//               </tr>
//               <tr>
//                 <td colSpan={"8"}  className="single_tableExtraTitle" style={{color:theme?.palette?.customColors?.purple}}>
//                   Diamond
//                 </td>
//               </tr>
//               <tr>
//                 <td className="single_tableTr2_td">1</td>
//                 <td className="single_tableTr2_td">NTR PD PD</td>
//                 <td className="single_tableTr2_td">1mm</td>
//                 <td className="single_tableTr2_td">2.750</td>
//                 <td className="single_tableTr2_td">2</td>
//                 <td className="single_tableTr2_td">
//                 {/* <CustomTextField className="cinputfieldAll" /> */}
//                 <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//                 <td className="single_tableTr2_td">
//                   {/* <CustomTextField className="cinputfieldAll" /> */}
//                   <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//                 <td className="single_tableTr7_td">
//                 <RadioGroup row aria-label='sizes'  name='sizes' defaultValue='job' >
//                   <FormControlLabel value='job' control={<Radio size="small" sx={{
//                     '&.Mui-checked': {
//                       color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
//                     },
//                   }} />} label='Ctw' className='fs_fgp' />
//                   <FormControlLabel value='memo' control={<Radio size="small" sx={{
//                     '&.Mui-checked': {
//                       color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
//                     },
//                   }} />} label='Pcs' className='fs_fgp' />
//                 </RadioGroup>
//                   {/* <div>
//                     <input type="radio" name="toggle" defaultChecked />
//                     Ctw
//                   </div>
//                   <div>
//                     <input type="radio" name="toggle" />
//                     Pcs
//                   </div> */}
//                 </td>
//                 <td>
//                   {/* <CustomTextField className="cinputfieldAll" /> */}
//                   <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//               </tr>

//               <tr>
//                 <td colSpan={"8"} className="single_tableExtraTitle  " style={{color:theme?.palette?.customColors?.purple}}>
//                   Color Stone
//                 </td>
//               </tr>
//               <tr>
//                 <td className="single_tableTr2_td">1</td>
//                 <td className="single_tableTr2_td">NTR PD PD</td>
//                 <td className="single_tableTr2_td">1mm</td>
//                 <td className="single_tableTr2_td">2.750</td>
//                 <td className="single_tableTr2_td">2</td>
//                 <td className="single_tableTr2_td">
//                 {/* <CustomTextField className="cinputfieldAll" /> */}
//                 <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//                 <td className="single_tableTr2_td">
//                   {/* <CustomTextField className="cinputfieldAll" /> */}
//                   <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//                 <td className="single_tableTr7_td">
//                 <RadioGroup row aria-label='sizes'  name='sizes' defaultValue='job' >
//                   <FormControlLabel value='job' control={<Radio size="small" sx={{
//                     '&.Mui-checked': {
//                       color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
//                     },
//                   }} />} label='Ctw' className='fs_fgp' />
//                   <FormControlLabel value='memo' control={<Radio size="small" sx={{
//                     '&.Mui-checked': {
//                       color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
//                     },
//                   }} />} label='Pcs' className='fs_fgp' />
//                 </RadioGroup>
//                   {/* <div>
//                     <input type="radio" name="toggle" defaultChecked />
//                     Ctw
//                   </div>
//                   <div>
//                     <input type="radio" name="toggle" />
//                     Pcs
//                   </div> */}
//                 </td>
//                 <td>
//                   {/* <CustomTextField className="cinputfieldAll" /> */}
//                   <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={"8"} className="single_tableExtraTitle  " style={{color:theme?.palette?.customColors?.purple}}>
//                   Misc
//                 </td>
//               </tr>
//               <tr>
//                 <td className="single_tableTr2_td">1</td>
//                 <td className="single_tableTr2_td">NTR PD PD</td>
//                 <td className="single_tableTr2_td">1mm</td>
//                 <td className="single_tableTr2_td">2.750</td>
//                 <td className="single_tableTr2_td">2</td>
//                 <td className="single_tableTr2_td">
//                 {/* <CustomTextField className="cinputfieldAll" /> */}
//                 <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//                 <td className="single_tableTr2_td">
//                   {/* <CustomTextField className="cinputfieldAll" /> */}
//                   <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//                 <td className="single_tableTr7_td">
//                 <RadioGroup row aria-label='sizes'  name='sizes' defaultValue='job' >
//                   <FormControlLabel value='job' control={<Radio size="small" sx={{
//                     '&.Mui-checked': {
//                       color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
//                     },
//                   }} />} label='Ctw' className='fs_fgp' />
//                   <FormControlLabel value='memo' control={<Radio size="small" sx={{
//                     '&.Mui-checked': {
//                       color: theme?.palette?.customColors?.purple, // Change selected radio color to purple
//                     },
//                   }} />} label='Pcs' className='fs_fgp' />
//                 </RadioGroup>
//                   {/* <div>
//                     <input type="radio" name="toggle" defaultChecked />
//                     Ctw
//                   </div>
//                   <div>
//                     <input type="radio" name="toggle" />
//                     Pcs
//                   </div> */}
//                 </td>
//                 <td>
//                   {/* <CustomTextField className="cinputfieldAll" /> */}
//                   <input type="text" placeholder="" autoFocus  id=""  className='categoryNewOrder filter_item_call_2 fs_fgp'   />
//                 </td>
//               </tr>
//             </table>
//             </div>
//             <hr />
//             {/* <p className="single_tableExtraTitle valueMainDivP pb-2 fw-bold text-secondary">Other Charge</p> */}
//             <div style={{  }} className="pb-2">
//               <Grid container spacing={1}>
//                 <Grid item xs={12} sm={6} md={4} lg={2}>
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="certcharge" className="fs_fgp  text_color">Certification Charge</label>
//                   <input type="text" placeholder="" autoFocus  id="certcharge"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//                   {/* <div className="valueMainDivP"> Certification Charge </div>
//                   <CustomTextField className="cinputfieldAll" /> */}
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4} lg={2}>
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="vermal" className="fs_fgp  text_color">Vermal Charges</label>
//                   <input type="text" placeholder="" autoFocus  id="vermal"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//                   {/* <div className="valueMainDivP">Vermal charges</div>
//                   <CustomTextField className="cinputfieldAll" /> */}
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4} lg={2}>
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="hallmark" className="fs_fgp  text_color">HallMark Charges</label>
//                   <input type="text" placeholder="" autoFocus  id="hallmark"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//                   {/* <div className="valueMainDivP">HallMark Charges</div>
//                   <CustomTextField className="cinputfieldAll" /> */}
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4} lg={2}>
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="dancing" className="fs_fgp  text_color">Dancing Collet</label>
//                   <input type="text" placeholder="" autoFocus  id="dancing"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//                   {/* <div className="valueMainDivP">Dancing Collet</div>
//                   <CustomTextField className="cinputfieldAll" /> */}
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4} lg={2}>
//                 <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="magnet" className="fs_fgp  text_color">Magnet Charges</label>
//                   <input type="text" placeholder="" autoFocus  id="magnet"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//                   {/* <div className="valueMainDivP"> Magnet Charges</div>
//                   <CustomTextField className="cinputfieldAll" /> */}
//                 </Grid>
//               </Grid>
//               <div>
//                 {/* <div>
//                   <p className="single_tableExtraTitle_p">HallMark Charges</p>
//                   <CustomTextField />
//                 </div>
//                 <div>
//                   <p className="single_tableExtraTitle_p">Dancing Collet</p>
//                   <CustomTextField />
//                 </div> */}
//               </div>
//               <div>
//                 {/* <div>
//                   <p className="single_tableExtraTitle_p"> Magnet Charges</p>
//                   <CustomTextField />
//                 </div> */}
//               </div>
//             </div>
//           </div>
//           <Grid container spacing={1} className="pb-2">
//             <Grid item xs={12} sm={6} md={3} lg={2} className="valueMainDiv">
//               <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="dis" className="fs_fgp  text_color">Discount</label>
//                   <input type="text" placeholder="" autoFocus  id="dis"  className='categoryNewOrder filter_item_call fs_fgp'   />
//                 </div>
//               {/* <div className="w-100">
//                 <p className="valueMainDivP">Discount</p>
//                 <CustomTextField type="text" placeholder="Discount" className="cinputfieldAll" />
//               </div> */}
//             </Grid>
//             <Grid item xs={12} sm={6} md={3} lg={2} className="valueMainDiv">
//             <div className="d-flex align-items-start flex-column w-100">
//                   <label htmlFor="dison" className="fs_fgp text_color">Making On</label>
//                   <select name="" id="dison" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
//                     <option value="" disabled selected></option>
//                     {
//                       discountArr?.map((e, i) => {
//                         return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
//                       })
//                     }
//                 </select>
//                 </div>
//                 {/* <CustomTextField select customBorderColor="rgba(47, 43, 61, 0.2)"  borderoutlinedColor="#00CFE8" customTextColor="#2F2B3DC7" customFontSize="0.8125rem" size="small" variant="filled" className="cinputfieldAll" > */}
//               {/* <div className="w-100">
//                 <p className="valueMainDivP">On</p>
//                 <CustomTextField 
//                     select 
//                     customBorderColor="rgba(47, 43, 61, 0.2)"  
//                     borderoutlinedColor="#00CFE8" 
//                     customTextColor="#2F2B3DC7" 
//                     customFontSize="0.8125rem" 
//                     size="small" 
//                     variant="filled" 
//                     className="cinputfieldAll" >
//                     <MenuItem value="">
//                       <em></em>
//                     </MenuItem>
//                     {
//                       discountArr?.map((e, i) => {
//                         return (
//                           <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
//                         )
//                       })
//                     }
//                 </CustomTextField>
//               </div> */}
//             </Grid>
//           </Grid>
//           <div className="pb-4 pt-3">
//               <FormControl component="fieldset">
//                 <RadioGroup
//                   row
//                   value={selectedOption}
//                   onChange={handleOptionChange}
//                   aria-label="total-option"
//                 >
//                   <FormControlLabel
//                     value="amount"
//                     control={<Radio />}
//                     label="Total Amount"
//                   />
//                   <FormControlLabel
//                     value="criteria"
//                     control={<Radio />}
//                     label="Total Criteria Based"
//                   />
//                        { criteriaBased && <span className="d-flex ">
//                   <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Diamond Rate"
//                     />
                    
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3} lg={2}>

//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Stone Rate"
//                       />
//                       </Grid>
//                   <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Metal Rate"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3} lg={2}>
//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Labour Rate"
//                       />
//                       </Grid>
//                       </span>}
//                 </RadioGroup>
                
//               </FormControl>

//               {/* {criteriaBased && (
//                 // <Grid container spacing={1} className="checkboxesSection">
//                   <span>
//                   <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Diamond Rate"
//                     />
                    
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3} lg={2}>

//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Stone Rate"
//                       />
//                       </Grid>
//                   <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Metal Rate"
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6} md={3} lg={2}>
//                     <FormControlLabel
//                       control={<Checkbox />}
//                       label="Labour Rate"
//                       />
//                       </Grid>
//                       </span>
//                 // </Grid>
//               )} */}
//               <button className="SaveBtnAmaountCZALL" onClick={() => handleSave("amount")} >
//                 Discount Apply
//               </button>
//             </div>
//         </div>
//       )}

//       {selectedButton === "Making_Category_Wise" && (
//         <div className="maskingCategoryWiseMain my-4" >
//           <table className="maskingCategoryWiseMain_table text_color" style={{maxWidth:'600px', width:'100%'}}>
//             <tr>
//               <th>Category</th>
//               <th>SubCategory</th>
//               <th>Making Unit</th>
//               <th>Making Charge On</th>
//             </tr>
//             <tr>
//               <td>Ring</td>
//               <td>Light ring</td>
//               <td>
//                 {/* <CustomTextField className="cinputfieldAll" /> */}
//                 <input type="text" placeholder="" autoFocus  id="metalRate"  className='categoryNewOrder filter_item_call fs_fgp'   />
//               </td>
//               <td>
//               <select name="" id="metallosson" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select ms-1'>
//                     <option value="" disabled selected></option>
//                     {
//                       makingChargeOnArr?.map((e, i) => {
//                         return <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
//                       })
//                     }
//                 </select>
//                 {/* <CustomTextField
//                   select
//                   fullWidth
//                   customBorderColor="rgba(47, 43, 61, 0.2)"
//                   borderoutlinedColor="#00CFE8"
//                   customTextColor="#2F2B3DC7"
//                   customFontSize="0.8125rem"
//                   size="small"
//                   className="cinputfieldAll"
//                   variant="filled"
//                   style={{ width: "200px" }}
//                 >
//                   <MenuItem value="">
//                     <em></em>
//                   </MenuItem>
//                   {
//                     makingChargeOnArr?.map((e, i) => {
//                       return (
//                         <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
//                       )
//                     })
//                   }
//                 </CustomTextField> */}
//               </td>
//             </tr>
//           </table>
//           <button
//             className="SaveBtnAmaountCZALL"
//             onClick={() => handleSave("metal")}
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomizeAll;
