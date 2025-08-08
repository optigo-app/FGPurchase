import React, { useState } from "react";
import "./customizeAll.css";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  useTheme,
  useMediaQuery,
  Button,
  Box,
  Modal,
  Typography,
  Tooltip,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { capitalizeWords } from "../../master/global";
import { Cancel } from "@mui/icons-material";

const CustomizeAll = () => {
  const theme = useTheme();
  const is1080 = useMediaQuery(theme.breakpoints.up('1150'));
  console.log(is1080);

  const [selectedButton, setSelectedButton] = useState('CustomizeAll')
  const [selectedOption, setSelectedOption] = useState("CustomizeAll");
  const [makingChargeOn, setMakingChargeOn] = useState('');
  const [criteriaBased, setCriteriaBased] = useState(false);
  const [openDiscountPopUp, setOpenDiscountPopUp] = useState(false);
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
      id: 1,
      name: 'netwt'
    },
    {
      id: 2,
      name: 'grosswt'
    },
    {
      id: 3,
      name: 'OnPcs'
    },

  ];

  const makingArr = [
    {
      id: 1,
      name: 'Amount'
    },
    {
      id: 2,
      name: 'Design Master (%)'
    },
    {
      id: 3,
      name: 'Gold Rate (%)'
    },

  ]

  const discountArr = [
    {
      id: 1,
      name: '% Per Pcs'
    },
    {
      id: 2,
      name: 'Amount Per Pcs'
    },
    {
      id: 3,
      name: 'Making Amount (inc. tax)'
    },
    {
      id: 4,
      name: 'Total Amount (inc. tax)'
    },
    {
      id: 5,
      name: 'Diamond Amount (inc. tax)'
    },

  ]

  const handleToggleChange = (event, newValue) => {
    if (newValue !== null) {
      setSelectedButton(newValue)
    }
  }

  return (
    <div>
      <div className="MainTitleLine">
        Product Info
      </div>
      <Box className="toglleButtonBox">
      <ToggleButtonGroup
        value={selectedButton}
        exclusive
        onChange={handleToggleChange}
        className="toggle-group"
        size="small"
      >
        <ToggleButton className="toggle-button" value="CustomizeAll" sx={{minWidth:'180px !important', textTransform: 'none' }}>
          Customize All
        </ToggleButton>
        <ToggleButton className="toggle-button" value="Making_Category_Wise" sx={{minWidth:'180px !important', textTransform: 'none' }}>
          Making Category Wise
        </ToggleButton>
      </ToggleButtonGroup>
      </Box>
      {selectedButton === "CustomizeAll" && (
        <div className="mt-3 sm:mt-2 xs:mt-1 fs_fgp">
          <div style={{ width: "100%" }} className="mb-3 sm:mb-2 xs:mb-1">
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metalRate" className="fs_fgp  text_color">Metal Rate (24K)</label>
                  <input type="text" placeholder="" autoFocus id="metalRate" className='categoryNewOrder filter_item_call fs_fgp' />
                </div>

              </Grid>
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
              </Grid>
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
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metalRate" className="fs_fgp  text_color">Metal Rate (24K)</label>
                  <input type="text" placeholder="" autoFocus id="metalRate" className='categoryNewOrder filter_item_call fs_fgp' />
                </div>
              </Grid>
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
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="metalcharge" className="fs_fgp  text_color">Making Charge</label>
                  <input type="text" placeholder="" autoFocus id="metalcharge" className='categoryNewOrder filter_item_call fs_fgp' />
                </div>
              </Grid>
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
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3} className="">
                <div className="d-flex align-items-start flex-column w-100">
                  <label htmlFor="diamondhandling" className="fs_fgp  text_color">Diamond Handling</label>
                  <input type="text" placeholder="" autoFocus id="diamondhandling" className='categoryNewOrder filter_item_call fs_fgp' />
                </div>
              </Grid>
            </Grid>
          </div>
          <div >
            <div style={{ overflow: 'auto' }} className="w-100 sclbar_czall">
              <table style={{ width: "100%", minWidth: '800px' }}>
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
                  <td colSpan={"8"} className="single_tableExtraTitle" style={{ color: theme?.palette?.customColors?.purple }}>
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
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                  <td className="single_tableTr2_td">
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                  <td className="single_tableTr7_td">
                    <RadioGroup row aria-label='sizes' name='sizes' defaultValue='job' >
                      <FormControlLabel value='job' control={<Radio size="small" sx={{
                        '&.Mui-checked': {
                          color: theme?.palette?.customColors?.purple,
                        },
                      }} />} label='Ctw' className='fs_fgp' />
                      <FormControlLabel value='memo' control={<Radio size="small" sx={{
                        '&.Mui-checked': {
                          color: theme?.palette?.customColors?.purple,
                        },
                      }} />} label='Pcs' className='fs_fgp' />
                    </RadioGroup>
                  </td>
                  <td>
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                </tr>

                <tr>
                  <td colSpan={"8"} className="single_tableExtraTitle  " style={{ color: theme?.palette?.customColors?.purple }}>
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
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                  <td className="single_tableTr2_td">
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                  <td className="single_tableTr7_td">
                    <RadioGroup row aria-label='sizes' name='sizes' defaultValue='job' >
                      <FormControlLabel value='job' control={<Radio size="small" sx={{
                        '&.Mui-checked': {
                          color: theme?.palette?.customColors?.purple,
                        },
                      }} />} label='Ctw' className='fs_fgp' />
                      <FormControlLabel value='memo' control={<Radio size="small" sx={{
                        '&.Mui-checked': {
                          color: theme?.palette?.customColors?.purple,
                        },
                      }} />} label='Pcs' className='fs_fgp' />
                    </RadioGroup>
                  </td>
                  <td>
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                </tr>
                <tr>
                  <td colSpan={"8"} className="single_tableExtraTitle  " style={{ color: theme?.palette?.customColors?.purple }}>
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
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                  <td className="single_tableTr2_td">
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                  <td className="single_tableTr7_td">
                    <RadioGroup row aria-label='sizes' name='sizes' defaultValue='job' >
                      <FormControlLabel value='job' control={<Radio size="small" sx={{
                        '&.Mui-checked': {
                          color: theme?.palette?.customColors?.purple,
                        },
                      }} />} label='Ctw' className='fs_fgp' />
                      <FormControlLabel value='memo' control={<Radio size="small" sx={{
                        '&.Mui-checked': {
                          color: theme?.palette?.customColors?.purple,
                        },
                      }} />} label='Pcs' className='fs_fgp' />
                    </RadioGroup>
                  </td>
                  <td>
                    <input type="text" placeholder="" autoFocus id="" className='categoryNewOrder filter_item_call_2 fs_fgp' />
                  </td>
                </tr>
              </table>
            </div>
            <hr />

          </div>
          <Grid container spacing={1} className="pb-2" alignItems="center" wrap={is1080 ? "nowrap" : "wrap"}>
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
                <label htmlFor="dison" className="fs_fgp text_color">Making On</label>
                <select id="dison" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
                  <option value="" disabled selected></option>
                  {discountArr?.map((e, i) => (
                    <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                  ))}
                </select>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={2} lg={2}>
              <Button size="small" variant="contained" sx={{ background: theme?.palette?.customColors?.primary, color: 'white', marginTop: '20px' }} onClick={() => setOpenDiscountPopUp(true)} >
                Discount
              </Button>
            </Grid>
            {
              openDiscountPopUp && <Modal
                open={openDiscountPopUp}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                onClose={() => setOpenDiscountPopUp(false)}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    maxHeight: 200,
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    boxShadow: 24,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    minHeight: '200px',
                    height: '100%',
                    border: 'none',
                    outline: 'none'
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div>&nbsp;</div>
                    <Typography className="fs_fgp" sx={{ color: theme?.palette?.customColors?.purple, fontWeight: 'bold' }}>Apply Discount</Typography>
                    <div><Tooltip title="Close">
                      <Cancel sx={{ cursor: 'pointer', color: theme?.palette?.customColors?.purple }} onClick={() => setOpenDiscountPopUp(false)} />
                    </Tooltip>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap">
                    <span className="d-flex align-items-start flex-column me-1">
                      <label htmlFor="dis" className="fs_fgp text_color">Discount</label>
                      <input type="text" placeholder="" id="dis" className='categoryNewOrder filter_item_call fs_fgp' />
                    </span>
                    <span className="d-flex align-items-start flex-column ms-1">
                      <label htmlFor="dison" className="fs_fgp text_color">Making On</label>
                      <select id="dison" className='categoryNewOrder filter_item_call fs_fgp fs_fgp_select'>
                        <option value="" disabled selected></option>
                        {discountArr?.map((e, i) => (
                          <option value={e?.code} key={i}>{capitalizeWords(e?.name)}</option>
                        ))}
                      </select>
                    </span>
                  </div>
                  <FormControl component="fieldset" style={{ width: '100%' }}>
                    <RadioGroup
                      row
                      value={selectedOption}
                      onChange={handleOptionChange}
                      aria-label="total-option"
                    >
                      <FormControlLabel
                        sx={{ color: 'grey' }}
                        value="amount"
                        control={<Radio sx={{
                          '&.Mui-checked': {
                            color: theme?.palette?.customColors?.purple,
                          },
                        }} />}
                        label="Total Amount"
                      />
                      <FormControlLabel
                        sx={{ color: 'grey' }}
                        value="criteria"
                        control={<Radio sx={{
                          '&.Mui-checked': {
                            color: theme?.palette?.customColors?.purple,
                          },
                        }} />}
                        label="Total Criteria Based"
                      />
                      {criteriaBased && <span className="d-flex w-100 justify-content-between align-items-center">
                        <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
                          <FormControlLabel
                            sx={{ color: 'grey', minWidth: '160px' }}
                            control={<Checkbox sx={{
                              '&.Mui-checked': {
                                color: theme?.palette?.customColors?.purple,
                              },
                            }} />}
                            label="Diamond Rate"
                          />

                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                          <FormControlLabel
                            sx={{ color: 'grey', minWidth: '160px' }}
                            control={<Checkbox sx={{
                              '&.Mui-checked': {
                                color: theme?.palette?.customColors?.purple,
                              },
                            }} />}
                            label="Stone Rate"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2} style={{ display: "flex" }}>
                          <FormControlLabel
                            sx={{ color: 'grey', minWidth: '160px' }}
                            control={<Checkbox sx={{
                              '&.Mui-checked': {
                                color: theme?.palette?.customColors?.purple,
                              },
                            }} />}
                            label="Metal Rate"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                          <FormControlLabel
                            sx={{ color: 'grey', minWidth: '160px' }}
                            control={<Checkbox sx={{
                              '&.Mui-checked': {
                                color: theme?.palette?.customColors?.purple,
                              },
                            }} />}
                            label="Labour Rate"
                          />
                        </Grid>
                      </span>}
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Modal>
            }
          </Grid>
        </div>
      )}

      {selectedButton === "Making_Category_Wise" && (
        <div className="maskingCategoryWiseMain my-4 fs_fgp" >
          <table className="maskingCategoryWiseMain_table text_color" style={{ maxWidth: '600px', width: '100%' }}>
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
                <input type="text" placeholder="" autoFocus id="metalRate" className='categoryNewOrder filter_item_call fs_fgp' />
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
              </td>
            </tr>
          </table>
          <Button size="small" variant="contained" sx={{ backgroundColor: theme?.palette?.customColors?.green, color: 'white' }} onClick={() => handleSave("metal")} >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomizeAll;
