import { Box, Modal, Tooltip, Typography, useTheme, Grid, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { handlePayByBank } from '../../redux/slices/HomeSlice';
import CancelIcon from '@mui/icons-material/Cancel';
import { currencyRates } from '../../master/MasterData';
import "./popupstyle.css";
const PayByCash = ({ payByBank }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <div className='fs_fgp'>
            <Modal
                open={payByBank}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                onClose={() => dispatch(handlePayByBank(false))}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '75%', md: '60%' },
                        maxHeight: '700px',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: '12px',
                        boxShadow: 24,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '300px',
                        border: 'none',
                        maxWidth:1000,
                        outline:'none'
                    }}
                    className="boxShadow_hp"
                >
                    <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                        <div></div>
                        <Typography variant="h5" color={theme?.palette?.customColors?.purple} className='fs_fgp'> 
                            New Payment Transaction
                        </Typography>
                        <Tooltip title="Close">
                            <CancelIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => dispatch(handlePayByBank(false))}
                            />
                        </Tooltip>
                    </div>
                    <div className='d-flex justify-content-start align-items-center w-100 ps-2 pb-2 border-bottom  mb-2'>
                        <Typography variant="h5" className='fs_fgp'> 
                            ISSUE
                        </Typography>
                    </div>

                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        {/* Date and Document/Ref# */}
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="date" className='fs_fgp text_color'>Date (dd/mm/yyyy)</label>
                            <input type="date" id="date" name="date" style={{ width: '100%' }} className='fs_fgp popupfield' />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="ref" className='fs_fgp text_color'>Doc/Ref#</label>
                            <input type="text" id="ref" name="ref" className='fs_fgp popupfield' style={{ width: '100%' }} />
                        </Grid>

                        {/* Currency and Exchange Rate */}
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="currency" className='fs_fgp text_color'>Currency</label>
                            <select id="currency" name="currency" className='fs_fgp popupfield' style={{ width: '100%' }}>
                                {currencyRates?.map((e, i) => (
                                    <option key={i} value={e?.value} className='fs_fgp '>
                                        {e?.label}
                                    </option>
                                ))}
                            </select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="exchrate" className='fs_fgp text_color'>Exch. Rate</label>
                            <input type="text" id="exchrate" className='fs_fgp popupfield' name="exchrate" style={{ width: '100%' }} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <label htmlFor="currency" className='fs_fgp text_color'> Payment By :</label>
                            <select id="currency" name="currency" className='fs_fgp popupfield' style={{ width: '100%' }}>
                                {currencyRates?.map((e, i) => (
                                    <option key={i} value={e?.value} className='fs_fgp '>
                                        {e?.label}
                                    </option>
                                ))}
                            </select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="exchrate" className='fs_fgp text_color'>Transaction Id :</label>
                            <input type="text" id="exchrate" className='fs_fgp popupfield' name="exchrate" style={{ width: '100%' }} />
                        </Grid>

                        {/* Cash Account and Cash Value */}
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="cash" className='fs_fgp text_color'>Cash Account</label>
                            <select id="cash" className='fs_fgp popupfield' name="cash" style={{ width: '100%' }}>
                                {currencyRates?.map((e, i) => (
                                    <option key={i} value={e?.value} className='fs_fgp'>
                                        {e?.label}
                                    </option>
                                ))}
                            </select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="cashvalue" className='fs_fgp text_color'>Cash Value</label>
                            <input type="text" id="cashvalue" name="cashvalue" className='fs_fgp popupfield' style={{ width: '100%' }} />
                        </Grid>

                        {/* Account Holder Name */}
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="accountholdername" className='fs_fgp text_color'>Account</label>
                            <input type="text" id="accountholdername" className='fs_fgp popupfield' name="accountholdername" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="accountholdername" className='fs_fgp text_color'>&nbsp;</label>
                            <input type="text" id="accountholdername" className='fs_fgp popupfield' name="accountholdername" style={{ width: '100%' }} />
                        </Grid>

                        {/* Static fields for Head, Sub Head, Contact Person, City */}
                        <Grid item xs={12} sm={6} display={'flex'} justifyContent={'space-between'}>
                            <label className='fs_fgp text_color me-2'>Head</label>
                            <div className='fs_fgp fw-bold'>Sundry Creditors</div>
                        </Grid>
                        <Grid item xs={12} sm={6} display={'flex'} justifyContent={'space-between'}>
                            <label className='fs_fgp text_color me-2'>Sub Head</label>
                            <div className='fs_fgp fw-bold'>Manufacturer</div>
                        </Grid>
                        <Grid item xs={12} sm={6} display={'flex'} justifyContent={'space-between'}>
                            <label className='fs_fgp text_color me-2'>Contact Person</label>
                            <div className='fs_fgp fw-bold'>Dhiraj Sharma (Aarnya Jewellers)</div>
                        </Grid>
                        <Grid item xs={12} sm={6} display={'flex'} justifyContent={'space-between'}>
                            <label className='fs_fgp text_color me-2'>City</label>
                            <div className='fs_fgp fw-bold'>Surat</div>
                        </Grid>

                        {/* Paid Amount and Written Text */}
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="paidamount" className='fs_fgp text_color'>Paid Amount</label>
                            <input type="text" id="paidamount" className='fs_fgp popupfield' name="paidamount" placeholder="125.96" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="" className='fs_fgp text_color'>&nbsp;</label>
                            <div className='fs_fgp' style={{paddingTop:'8px'}}>[ One Hundred and Twenty Five Point Ninety Six Only ]</div>
                        </Grid>

                        {/* Amount and Total Amount */}
                        <Grid item xs={12} sm={6}>
                            <div className='fs_fgp d-flex justify-content-between'><span className='text_color fw-bold'>Amount</span> <span className='fw-bold'>125.96/-</span></div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='fs_fgp d-flex justify-content-between' > <span className='text_color fw-bold'>Total Amount</span> <span className='fw-bold'>125.96/-</span></div>
                        </Grid>

                        {/* Remarks */}
                        <Grid item xs={12}>
                            <label htmlFor="companyremark" className='fs_fgp text_color'>Company Remark (if any)</label>
                            <textarea id="companyremark" className='fs_fgp popupfield' name="companyremark" rows="2" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12}>
                            <label htmlFor="customerremark" className='fs_fgp text_color'>Customer Remark (if any)</label>
                            <textarea id="customerremark" className='fs_fgp popupfield' name="customerremark" rows="2" style={{ width: '100%' }} />
                        </Grid>
                    </Grid>

                    {/* Action Buttons */}
                    <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ color: 'white', backgroundColor: theme?.palette?.customColors?.orange }}
                                className='fs_fgp'
                                onClick={() => {
                                    dispatch(handlePayByBank(false));
                                    setTimeout(() => {
                                    window.print();
                                    },10);
                                }}
                            >
                                Save & Print
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ color: 'white', backgroundColor: theme?.palette?.customColors?.green }}
                                className='fs_fgp'
                                onClick={() => dispatch(handlePayByBank(false))}
                            >
                                Save & Close
                            </Button>
                        </Grid>
                        <Grid item sx={{mt:0.5}} >
                            <input type='checkbox' style={{cursor:'pointer'}} id='sms' /><label htmlFor="sms" className='fs_fgp text_color ms-2 user-select-none' style={{cursor:'pointer'}}>Send SMS</label>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default PayByCash;
