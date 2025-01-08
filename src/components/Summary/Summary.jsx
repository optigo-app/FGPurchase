import React, { useState } from "react";
import "./summary.css";
import { Box, Button, Modal, Tooltip, useTheme } from "@mui/material";
// import SummCustomTextField from "./Index";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { useRecoilValue } from "recoil";
// import { homePageDataShow } from "../../../atom/atom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const styleKyc = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const Summary = () => {
  const theme = useTheme();
  const mode = useSelector((state) => state?.fgp?.mode);
  const [open, setOpen] = useState(false);
  const [openKyc, setOpenKyc] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenKyc = () => setOpenKyc(true);
  const handleCloseKyc = () => setOpenKyc(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  // const homePageDataAdded = useRecoilValue(homePageDataShow);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div>
          { mode !== "alteration_issue" && <div className="w-100 d-flex justify-content-center">
            <p className="summury_totalValue w_responsive_sum fs_fgp">
              <span style={{color: theme?.palette?.customColors?.orange}}>Balance To Be Paid :</span>
              <span style={{ fontWeight: 600 }}>
                {"605.50/-"}
              </span>
            </p>
          </div>}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="shipingDetailMainModel"
      >
        <Box sx={style}>
          <div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Delivery Mode:</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">E-Way Bill No :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Advance Receipt No :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Delivery :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Name Of Transporter :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Vehicle Number :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Freight Terms :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">E Reference No :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Credit Days :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Product Type :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">LUTARN No :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Delivery :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">IEC No :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Flight No :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Port of Loading :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Port of Discharge :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
            <div className="summuryDeatilPopupDiv">
              <p className="summuryDeatilPopup_name">Insurance By :</p>
              <SummCustomTextField className="summuryDeatilPopup_textfild" />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="Summ_ApllyBtnPay" onClick={handleClose}>
              Save
            </button>
          </div>
        </Box>
      </Modal> */}

      {/* <Modal
        open={openKyc}
        onClose={handleCloseKyc}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="shipingDetailMainModel"
      >
        <Box sx={styleKyc}>
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ display: "flex", gap: "50px" }}>
              <p className="titleForUpload">Upload Aadhaar Card</p>
              <label
                htmlFor="aadhaarCardInput"
                style={{
                  display: "block",
                  marginBottom: 10,
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 20px",
                  textAlign: "center",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Upload
              </label>
              <input
                type="file"
                id="aadhaarCardInput"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }} // Hides the default file input
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => window.open(imagePreview, "_blank")}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <FaEye size={24} />
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              className="Summ_SaveEndContiBtnPay"
              onClick={handleCloseKyc}
            >
              Save & Continue
            </button>
          </div>
        </Box>
      </Modal> */}
      {/* {homePageDataAdded && (
        <div className="summuryExtraButtons">
          <div style={{ display: "flex", gap: "15px" }}>
            <Tooltip title="Shipment Detail" arrow placement="top">
              <button className="Summ_ApllyBtnPay" onClick={handleOpen}>
                <BiMessageAltDetail style={{ height: "30px", width: "30px" }} />
              </button>
            </Tooltip>
            <button
              className="Summ_DiscountApllyBtnPay"
              onClick={handleOpenKyc}
            >
              KYC Pending
            </button>
          </div>
          <div>
            <p className="summury_totalValue">
              Balance To Be Paid :
              <span style={{ fontWeight: 600 }}>
                {homePageDataAdded ? "605.50/-"}
              </span>
            </p>
          </div>
        </div>
      )} */}
      
      <div style={{ marginTop: "30px" }} className="summuryDiv1 fs_fgp">
        <div
          className="summuryTabel_BillMain"
          style={{ display: "flex", gap: "50px" }}
        >
          { mode !== "alteration_issue" && <>
          <table className="summuryDiv1_table1">
            <tr>
              <td colSpan={2} className="tabkeMainTitle">
                Bill Summary
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Amount :</td>
              <td className="tableValue">
                { "605.50/-" }
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Discount :</td>
              <td className="tableValue">
                { "405.50/-" }
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Privilege Discount :</td>
              <td className="tableValue">
                { "605.50/-" }
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Amount After Discount :</td>
              <td className="tableValue">
                { "605.50/-" }
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">IGST @ 3.000% :</td>
              <td className="tableValue">
                { "605.50/-" }
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Add/Less :</td>
              <td className="tableValue">
                { "605.50/-" }
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitleFinal">Final Amount :</td>
              <td className="tableValueFinal">
                { "120052.50/-" }
              </td>
            </tr>
          </table>

          <table className="summuryDiv1_table1">
            <tr>
              <td colSpan={2} className="tabkeMainTitle">
                Payment Summary
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Bill Amount :</td>
              <td className="tableValue">
                { "605.50/-"}
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Exchange value :</td>
              <td className="tableValue">
                { "605.50/-"}
              </td>
            </tr>

            <tr className="tableRow">
              <td className="tableTitle">Settle Amount :</td>
              <td className="tableValue">
                { "605.50/-"}
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Cash :</td>
              <td className="tableValue">
                { "605.50/-"}
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Bank :</td>
              <td className="tableValue">
                { "605.50/-"}
              </td>
            </tr>
            <tr className="tableRow">
              <td className="tableTitle">Advance :</td>
              <td className="tableValue">
                { "120052.50/-"}
              </td>
            </tr>
          </table>
          </>}
          
          <div style={{ width: ` ${mode !== "alteration_issue" ? '33.33%' : '40%' } ` }} className={`${mode !== "alteration_issue" ? "d-block" : "d-flex"}`}>
            <table className="summuryDiv1_table2" style={{marginRight:`${mode !== "alteration_issue" ? '0px' : '10px'}`}}>
              <tr>
                <td colSpan={2} className="tabkeMainTitle">
                  Metal Summary (Pure)
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Total Metal :</td>
                <td className="tableValue">
                  { "1.520 Gms"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Rate Cut :</td>
                <td className="tableValue">0.000 Gms</td>
              </tr>

              <tr className="tableRow">
                <td className="tableTitle">Exchange Metal :</td>
                <td className="tableValue">0.000 Gms</td>
              </tr>
            </table>
            <table className="summuryDiv1_table2">
              <tr>
                <td colSpan={2} className="tabkeMainTitle">
                  Metal Summary
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">GOLD :</td>
                <td className="tableValue">
                  { "1.520 Gms" }
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Total Metal :</td>
                <td className="tableValue">
                  { "1.520 Gms" }
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-start align-items-center flex-wrap fs_fgp">
        <div style={{ display: "flex", marginTop: "10px" }} className="me-4">
          <label className="remakrTitle text_color fs_fgp" htmlFor="remark">Remarks : </label>
          <textarea className="summury_textArea" id="remark" />
        </div>
        <div style={{ display: "flex", marginTop: "10px" }} className="me-4">
          <label className="remakrTitle text_color fs_fgp" htmlFor="printremark">Print Remarks :</label>
          <textarea className="summury_textArea" id="printremark" />
        </div>
            <Button className="fs_fgp" variant="contained" sx={{backgroundColor: theme?.palette?.customColors?.green, color: theme?.palette?.customColors?.white, maxWidth:'250px' }}>
              Save Remarks
            </Button>
        {/* <button className="ApllyBtnPay">Save Remarks</button> */}
      </div>
    </div>
  );
};


export default Summary;


// import React, { useState } from "react";
// import "./summary.css";
// import { Box, Modal, Grid, Button } from "@mui/material";
// import CustomTextField from "../TextField/index";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   border: "none",
//   outline: "none",
//   boxShadow: 24,
//   p: 4,
// };

// const Summary = () => {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <>
//     <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         className="shipingDetailMainModel"
//       >
//         <Box sx={style}>
//           <div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Delivery Mode:</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">E-Way Bill No :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>

//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Advance Receipt No :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>

//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Delivery :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Name Of Transporter :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Vehicle Number :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Freight Terms :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">E Reference No :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Credit Days :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Product Type :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">LUTARN No :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Delivery :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">IEC No :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Flight No :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Port of Loading :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Port of Discharge :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div className="summuryDeatilPopupDiv">
//               <p className="summuryDeatilPopup_name">Insurance By :</p>
//               <CustomTextField className="summuryDeatilPopup_textfild" />
//             </div>
//             <div style={{ display: "flex", justifyContent: "center" }}>
//               <button className="Summ_ApllyBtnPay" onClick={handleClose}>
//                 Save
//               </button>
//             </div>
//           </div>
//         </Box>
//       </Modal>
//       {/* <div style={{ marginTop: "30px" }} className="summuryDiv1">
//         <div className="summuryTabel_BillMain" style={{ display: "flex", gap: "50px" }} >
//           <table className="summuryDiv1_table1">
//             <tr>
//               <td colSpan={2} className="tabkeMainTitle">
//                 Bill Summary
//               </td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Amount :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Discount :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Amount After Discount :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">IGST @ 3.000% :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Add/Less :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitleFinal">Final Amount :</td>
//               <td className="tableValueFinal">120052.50/-</td>
//             </tr>
//           </table>

//           <div style={{width: '50%'}}>
//             <table className="summuryDiv1_table2">
//               <tr>
//                 <td colSpan={2} className="tabkeMainTitle">
//                   Metal Summary
//                 </td>
//               </tr>
//               <tr className="tableRow">
//                 <td className="tableTitle">GOLD :</td>
//                 <td className="tableValue">3.250 Gms</td>
//               </tr>
//               <tr className="tableRow">
//                 <td className="tableTitle">Total Metal :</td>
//                 <td className="tableValue">3.250 Gms</td>
//               </tr>
//             </table>
//           </div>
//         </div>
//         <div className="summuryTabel_BillMain" style={{ display: "flex", gap: "50px", marginTop: "50px" }}>
//           <table className="summuryDiv1_table1">
//             <tr>
//               <td colSpan={2} className="tabkeMainTitle">
//                 Payment Summary
//               </td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Bill Amount :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Exchange value :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>

//             <tr className="tableRow">
//               <td className="tableTitle">Settle Amount :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Cash :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Bank :</td>
//               <td className="tableValue">605.50/-</td>
//             </tr>
//             <tr className="tableRow">
//               <td className="tableTitle">Advance :</td>
//               <td className="tableValue">120052.50/-</td>
//             </tr>
//           </table>
//           <div style={{width: '50%'}}>
//             <table className="summuryDiv1_table2">
//               <tr>
//                 <td colSpan={2} className="tabkeMainTitle">
//                   Metal Summary (Pure)
//                 </td>
//               </tr>
//               <tr className="tableRow">
//                 <td className="tableTitle">Total Metal :</td>
//                 <td className="tableValue">1.520 Gms</td>
//               </tr>
//               <tr className="tableRow">
//                 <td className="tableTitle">Rate Cut :</td>
//                 <td className="tableValue">0.000 Gms</td>
//               </tr>

//               <tr className="tableRow">
//                 <td className="tableTitle">Exchange Metal :</td>
//                 <td className="tableValue">0.000 Gms</td>
//               </tr>
//             </table>
//           </div>
//         </div>
//         <div style={{ marginTop: "20px", paddingBottom:'5%' }}>
//           <table>
//             <tr>
//               <td colSpan={2} className="tabkeMainTitle">
//                 Balance To Be Paid
//               </td>
//             </tr>
//             <tr className="tableRow">
//               <td colSpan={2} className="tableValueBalance">
//                 605.50/-
//               </td>
//             </tr>
//           </table>
//         </div>
//       </div> */}

//       <Grid container spacing={2} sx={{mt:3}}>
//           <Grid item xs={12} sm={6} md={4} lg={2.4}>
//                   <table className="w-100">
//                     <tr>
//                       <td colSpan={2} className="tabkeMainTitle">
//                         Bill Summary
//                       </td>
//                     </tr>
//                     <tr className="tableRow">
//                       <td className="tableTitle">Amount :</td>
//                       <td className="tableValue">605.50/-</td>
//                     </tr>
//                     <tr className="tableRow">
//                       <td className="tableTitle">Discount :</td>
//                       <td className="tableValue">605.50/-</td>
//                     </tr>
//                     <tr className="tableRow">
//                       <td className="tableTitle">Amount After Discount :</td>
//                       <td className="tableValue">605.50/-</td>
//                     </tr>
//                     <tr className="tableRow">
//                       <td className="tableTitle">IGST @ 3.000% :</td>
//                       <td className="tableValue">605.50/-</td>
//                     </tr>
//                     <tr className="tableRow">
//                       <td className="tableTitle">Add/Less :</td>
//                       <td className="tableValue">605.50/-</td>
//                     </tr>
//                     <tr className="tableRow">
//                       <td className="tableTitleFinal">Final Amount :</td>
//                       <td className="tableValueFinal">120052.50/-</td>
//                     </tr>
//                   </table>  
//           </Grid>
          
//           <Grid item xs={12} sm={6} md={4} lg={2.4}>
//                 <table  able className="w-100">
//                   <tr>
//                     <td colSpan={2} className="tabkeMainTitle">
//                       Payment Summary
//                     </td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">Bill Amount :</td>
//                     <td className="tableValue">605.50/-</td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">Exchange value :</td>
//                     <td className="tableValue">605.50/-</td>
//                   </tr>

//                   <tr className="tableRow">
//                     <td className="tableTitle">Settle Amount :</td>
//                     <td className="tableValue">605.50/-</td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">Cash :</td>
//                     <td className="tableValue">605.50/-</td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">Bank :</td>
//                     <td className="tableValue">605.50/-</td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">Advance :</td>
//                     <td className="tableValue">120052.50/-</td>
//                   </tr>
//                 </table>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={2.4}>
//                 <table className="w-100">
//                   <tr>
//                     <td colSpan={2} className="tabkeMainTitle">
//                       Metal Summary
//                     </td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">GOLD :</td>
//                     <td className="tableValue">3.250 Gms</td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">Total Metal :</td>
//                     <td className="tableValue">3.250 Gms</td>
//                   </tr>
//                 </table>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={2.4}>
//               <table className="w-100">
//                   <tr>
//                     <td colSpan={2} className="tabkeMainTitle">
//                       Metal Summary (Pure)
//                     </td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">Total Metal :</td>
//                     <td className="tableValue">1.520 Gms</td>
//                   </tr>
//                   <tr className="tableRow">
//                     <td className="tableTitle">Rate Cut :</td>
//                     <td className="tableValue">0.000 Gms</td>
//                   </tr>

//                   <tr className="tableRow">
//                     <td className="tableTitle">Exchange Metal :</td>
//                     <td className="tableValue">0.000 Gms</td>
//                   </tr>
//               </table>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} lg={2.4}>
//               <table className="w-100">
//                 <tr>
//                   <td colSpan={2} className="tabkeMainTitle">
//                     Balance To Be Paid
//                   </td>
//                 </tr>
//                 <tr className="tableRow">
//                   <td colSpan={2} className="tableValueBalance">
//                     605.50/-
//                   </td>
//                 </tr>
//               </table>
//           </Grid>
//       </Grid>

//       <Grid container spacing={1} >
//         {/* <div style={{ display: "flex" }}>
//           <button className="Summ_ApllyBtnPay" onClick={handleOpen}>
//             Shipment Details
//           </button>
//         </div> */}
//         <Grid item xs={12} sm={6} md={6} lg={4}>
//           <div style={{ display: "flex" }} className="my-1">
//             <label htmlFor="r" className="remakrTitle">Remarks</label>
//             <textarea id="r" className="summury_textArea" />
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={6} md={6} lg={4}>
//           <div style={{ display: "flex" }}>
//             <label htmlFor="pr" className="remakrTitle">Print Remarks :</label>
//             <textarea id="pr" className="summury_textArea" />
//           </div>
//         </Grid>
//       </Grid>
      
//     </div>
//     <div className="mb-4 pb-4 mt-4 w-100 text-center">
//         <Button variant="contained" color="success" size="small">Save</Button>
//       </div>
//     </>
    
//   );
// };

// export default Summary;


