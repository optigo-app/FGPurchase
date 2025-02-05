import { Box, Modal, Tooltip, Typography, useTheme, Grid, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { handlePayByCash } from '../../redux/slices/HomeSlice';
import CancelIcon from '@mui/icons-material/Cancel';
import { currencyRates } from '../../master/MasterData';
import "./popupstyle.css";
const PayByCash = ({ payByCash }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    return (
        <div className='fs_fgp'>
            <Modal
                open={payByCash}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                onClose={() => dispatch(handlePayByCash(false))}
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
                                onClick={() => dispatch(handlePayByCash(false))}
                            />
                        </Tooltip>
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
                            <div className='fs_fgp ' style={{color:theme?.palette?.customColors?.purple}}>Sundry Creditors</div>
                        </Grid>
                        <Grid item xs={12} sm={6} display={'flex'} justifyContent={'space-between'}>
                            <label className='fs_fgp text_color me-2'>Sub Head</label>
                            <div className='fs_fgp ' style={{color:theme?.palette?.customColors?.purple}}>Manufacturer</div>
                        </Grid>
                        <Grid item xs={12} sm={6} display={'flex'} justifyContent={'space-between'}>
                            <label className='fs_fgp text_color me-2'>Contact Person</label>
                            <div className='fs_fgp ' style={{color:theme?.palette?.customColors?.purple}}>Dhiraj Sharma (Aarnya Jewellers)</div>
                        </Grid>
                        <Grid item xs={12} sm={6} display={'flex'} justifyContent={'space-between'}>
                            <label className='fs_fgp text_color me-2'>City</label>
                            <div className='fs_fgp ' style={{color:theme?.palette?.customColors?.purple}}>Surat</div>
                        </Grid>

                        {/* Paid Amount and Written Text */}
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="paidamount" className='fs_fgp text_color'>Paid Amount</label>
                            <input type="text" id="paidamount" className='fs_fgp popupfield' name="paidamount" placeholder="125.96" style={{ width: '100%' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <label htmlFor="" className='fs_fgp text_color'>&nbsp;</label>
                            <div className='fs_fgp' style={{color:theme?.palette?.customColors?.purple, paddingTop:'8px'}}>[ One Hundred and Twenty Five Point Ninety Six Only ]</div>
                        </Grid>

                        {/* Amount and Total Amount */}
                        <Grid item xs={12} sm={6}>
                            <div className='fs_fgp d-flex justify-content-between'><span className='text_color fw-bold'>Amount</span> <span style={{color:theme?.palette?.customColors?.purple}} className='fw-bold'>125.96/-</span></div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='fs_fgp d-flex justify-content-between' > <span className='text_color fw-bold'>Total Amount</span> <span style={{color:theme?.palette?.customColors?.purple}} className='fw-bold'>125.96/-</span></div>
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
                                sx={{ color: 'white', backgroundColor: theme?.palette?.customColors?.green }}
                                className='fs_fgp'
                            >
                                Save & Close
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ color: 'white', backgroundColor: theme?.palette?.customColors?.orange }}
                                className='fs_fgp'
                            >
                                Save & Print
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default PayByCash;


// import { Box, Button, Modal, Tooltip, Typography, useTheme } from '@mui/material'
// import React from 'react'
// import { useDispatch } from 'react-redux'
// import { handlePayByCash } from '../../redux/slices/HomeSlice';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { currencyRates } from '../../master/MasterData';

// const PayByCash = ({payByCash}) => {
//     const dispatch = useDispatch();
//     const theme = useTheme();
//   return (
//     <div>
//     <Modal
//         open={payByCash}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//         onClose={() => dispatch(handlePayByCash(false))}
//     >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 900,
//             maxHeight: 700,
//             overflow:'auto',
//             // overflowY: 'scroll',
//             bgcolor: 'background.paper',
//             borderRadius: '12px',
//             boxShadow: 24,
//             p: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             minHeight: '300px',
//             border: 'none',
//           }}
//           className="boxShadow_hp"
//         >
//             <div className='d-flex align-items-center justify-content-between align-items-center w-100'>
//                 <div></div>
//                 <div><Typography variant='h5' color={theme?.palette?.customColors?.purple}>New Payment Transaction</Typography></div>
//                 <div>
//                 <Tooltip title="Close">
//                     <CancelIcon
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => dispatch(handlePayByCash(false))}
//                     />
//                 </Tooltip>
//                 </div>
//             </div>
//             <div>
//                 pay
//             </div>
//             <div className='d-flex'>
//                 <div className='d-flex'>
//                     <div>
//                         <label htmlFor="date">Date :</label>
//                         <label>(dd/mm/yyyy)</label>
//                     </div>
//                     <div>
//                         <input type="date" />
//                     </div>
//                 </div>
//                 <div className='d-flex'>
//                     <div>
//                         <label htmlFor="ref">Doc/Ref# :</label>
//                     </div>
//                     <div>
//                         <input type="text" />
//                     </div>
//                 </div>
//             </div>
//             <div className='d-flex'>
//                 <div className='d-flex'>
//                     <div>
//                         <label htmlFor="currency">Currency :</label>
//                     </div>
//                     <div>
//                         <select name="currency" id="currency">
//                             {
//                                 currencyRates?.map((e, i) => {
//                                     return <option key={i} value={e?.value}>{e?.label}</option>
//                                 })
//                             }
//                         </select>
//                     </div>
//                 </div>
//                 <div className='d-flex'>
//                     <div>
//                         <label htmlFor="exchrate">Exch. Rate :</label>
//                     </div>
//                     <div>
//                         <input type="text" />
//                     </div>
//                 </div>
//             </div>
//             <div className='d-flex'>
//                 <div>
//                     <div>
//                         <label htmlFor="cash">Cash Account :</label>
//                     </div>
//                     <div>
//                         <select name="cash" id="cash">
//                             {
//                                 currencyRates?.map((e, i) => {
//                                     return <option key={i} value={e?.value}>{e?.label}</option>
//                                 })
//                             }
//                         </select>
//                     </div>
//                 </div>
//                 <div>
//                     <div>
//                         <label htmlFor="exchrate">Cash Value :</label>
//                     </div>
//                     <div>
//                         <input type="text" />
//                     </div>
//                 </div>
//             </div>
//             <div className='d-flex'>
//                 <div >
//                     <div>
//                         <label htmlFor="accountholdername">Account :</label>
//                     </div>
//                 </div>
//                 <div>
//                     <div>
//                         <input type="text" id='accountholdername' />
//                     </div>
//                 </div>
//             </div>
//             <div className='d-flex'>
//                 <div className='d-flex'>
//                     <div>
//                         <label>Head :</label>
//                     </div>
//                     <div>
//                         <div>Sundry Creditors</div>
//                     </div>
//                 </div>
//                 <div className='d-flex'>
//                     <div>
//                         <label>Sub Head :</label>
//                     </div>
//                     <div>
//                         <div>Manufacturer</div>
//                     </div>
//                 </div>
//             </div>
//             <div className='d-flex'>
//                 <div className='d-flex'>
//                     <div>
//                         <label>Contact Person :</label>
//                     </div>
//                     <div>
//                         <div>Dhiraj Sharma (Aarnya Jewellers)</div>
//                     </div>
//                 </div>
//                 <div className='d-flex'>
//                     <div>
//                         <label>City :</label>
//                     </div>
//                     <div>
//                         <div>Surat</div>
//                     </div>
//                 </div>
//             </div>
//             <div className='d-flex'>
//                 <div className='d-flex'>
//                     <div>
//                         <label>Paid Amount :</label>
//                     </div>
//                     <div>
//                         <input type="text" placeholder='125.96' />
//                     </div>
//                 </div>
//                 <div>
//                     <div>
//                         <div>	[ One Hundred and Twenty Five Point Ninety Six Only ]</div>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <div className='d-flex'>
//                     <div>
//                         <label>Amount :</label>
//                     </div>
//                     <div>
//                         125.96/-
//                     </div>
//                 </div>
//                 <div className='d-flex'>
//                     <div>
//                         <div>Total Amount :</div>
//                     </div>
//                     <div>
//                         <div>125.96/-</div>
//                     </div>
//                 </div>
//             </div>
//             <div className='w-100'>
//                         <label>Company Remark (if any) :</label>

//                         <textarea name="" id="" className='w-100'></textarea>
//             </div>
//             <div className='w-100'>
//                         <label>Customer Remark (if any) :</label>

//                         <textarea name="" id="" className='w-100'></textarea>
//             </div>
//             <div>
//                 <Button variant='contained' size='small' sx={{color:'white', backgroundColor:theme?.palette?.customColors?.green}}>Save & Close</Button>
//                 <Button variant='contained' size='small' sx={{color:'white', backgroundColor:theme?.palette?.customColors?.orange}}>Save & Print</Button>
//             </div>
//         </Box>
//     </Modal>
//     </div>
//   )
// }

// export default PayByCash
