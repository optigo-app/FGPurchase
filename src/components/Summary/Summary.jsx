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
      {mode !== "alteration_issue" && <div className="w-100 d-flex justify-content-center">
        <p className="summury_totalValue w_responsive_sum fs_fgp">
          <span style={{ color: theme?.palette?.customColors?.orange }}>Balance To Be Paid :</span>
          <span style={{ fontWeight: 600 }}>
            {"605.50/-"}
          </span>
        </p>
      </div>}

      <div style={{ marginTop: "30px" }} className="summuryDiv1 fs_fgp">
        <div
          className="summuryTabel_BillMain"
          style={{ display: "flex", gap: "50px" }}
        >
          {mode !== "alteration_issue" && <>
            <table className="summuryDiv1_table1">
              <tr>
                <td colSpan={2} className="tabkeMainTitle">
                  Bill Summary
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Amount :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Discount :</td>
                <td className="tableValue">
                  {"405.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Privilege Discount :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Amount After Discount :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">IGST @ 3.000% :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Add/Less :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitleFinal">Final Amount :</td>
                <td className="tableValueFinal">
                  {"120052.50/-"}
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
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Exchange value :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>

              <tr className="tableRow">
                <td className="tableTitle">Settle Amount :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Cash :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Bank :</td>
                <td className="tableValue">
                  {"605.50/-"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Advance :</td>
                <td className="tableValue">
                  {"120052.50/-"}
                </td>
              </tr>
            </table>
          </>}

          <div style={{ width: ` ${mode !== "alteration_issue" ? '33.33%' : '40%'} ` }} className={`${mode !== "alteration_issue" ? "d-block" : "d-flex"}`}>
            <table className="summuryDiv1_table2" style={{ marginRight: `${mode !== "alteration_issue" ? '0px' : '10px'}` }}>
              <tr>
                <td colSpan={2} className="tabkeMainTitle">
                  Metal Summary (Pure)
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Total Metal :</td>
                <td className="tableValue">
                  {"1.520 Gms"}
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
                  {"1.520 Gms"}
                </td>
              </tr>
              <tr className="tableRow">
                <td className="tableTitle">Total Metal :</td>
                <td className="tableValue">
                  {"1.520 Gms"}
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
      </div>
      <Box className="mt-5 d-flex justify-content-center align-items-center">
        <Button className="fs_fgp" variant="contained" sx={{ textAlign: 'center', background: theme?.palette?.customColors?.primary, color: theme?.palette?.customColors?.white, maxWidth: '250px' }}>
          Save Remarks
        </Button>
      </Box>
    </div>
  );
};
export default Summary;