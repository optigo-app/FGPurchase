import React, { useEffect, useState, useRef } from "react";
import "./scanaddjob.css"
import { Box, Button, FormControlLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import scanGif from "../../../assets/images/scan.gif"
const ScanAddJob = () => {
    const [inputValueHidden, setInputValueHidden] = useState("");
    const [enteredValues, setEnteredValues] = useState([]);
    const [inputValue, setInputValue] = useState(undefined);
    const [inputError, setInputError] = useState(false);
    const [viewType, setViewType] = useState("tag");
    const [openModal, setOpenModal] = useState(false);
    const ScanRef = useRef(null);
  
    useEffect(() => {
      if (inputValueHidden.length) {
        setTimeout(() => {
          setEnteredValues([...enteredValues, inputValueHidden]);
        }, 500);
      }
    }, [inputValueHidden]);
  
    const handleInputChangeHidden = (event) => {
      setInputValueHidden(event.target.value);
    };
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleGoButtonClick();
      }
    };
  
    const handleGoButtonClick = () => {
      if (inputValue === "" || inputValue === undefined) {
        setInputError(true);
      } else {
        setInputError(false);
        setEnteredValues([...enteredValues, inputValue]);
        setInputValue("");
      }
    };
  
    const handleViewTypeChange = (event) => {
      setViewType(event.target.value);
    };
  
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
  
    return (
      <div>
        {/* <Modal open={openModal} onClose={handleCloseModal}>
          <Box>
            <div style={{ marginTop: "20px", display: "flex" }}>
              <div>
                <RadioGroup>
                  <FormControlLabel
                    value="customerStock"
                    control={<Radio />}
                    label="Customer Stock"
                  />
                  <FormControlLabel
                    value="companyStock"
                    control={<Radio />}
                    label="Company Stock"
                  />
                  <FormControlLabel
                    value="memoToSale"
                    control={<Radio />}
                    label="Memo to Sale"
                  />
                  <FormControlLabel
                    value="engageToOtherCustomer"
                    control={<Radio />}
                    label="Engage To Other Customer"
                  />
                </RadioGroup>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  style={{
                    border: inputError && "1px solid red",
                    height: "35px",
                    outline: "none",
                  }}
                  className="enterBrachItemBox"
                  placeholder="Add Design#"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  variant="contained"
                  className="createGoBtn"
                  style={{
                    color: "white",
                    backgroundColor: "#e68900",
                    borderRadius: "0px",
                  }}
                  onClick={handleGoButtonClick}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    GO
                  </Typography>
                </Button>
              </div>
            </div>
          </Box>
        </Modal> */}
        <div>
          <div style={{ display: "flex", margin: "10px 0" }}>
            <FormControlLabel
              control={
                <Radio
                  checked={viewType === "tag"}
                  onChange={handleViewTypeChange}
                  value="tag"
                  name="viewType"
                />
              }
              label="Tag Wise"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={viewType === "design"}
                  onChange={handleViewTypeChange}
                  value="design"
                  name="viewType"
                />
              }
              label="Design Wise"
            />
          </div>
  
          {viewType === "tag" && (
            <div>
              <div>
                {/* <p style={{ margin: "20px 0px 0px 0px", fontSize: "15px" }}>
                  Order and Memo items pending to bill{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "blue",
                    }}
                    onClick={handleOpenModal}
                  >
                    Click here.
                  </span>
                </p> */}
              </div>
              <div style={{position:'relative'}}>
                <img src={scanGif} className="createImageQrCode"  />
                <div>
                  <input
                    type="text"
                    id="hiddeninp"
                    ref={ScanRef}
                    value={inputValueHidden}
                    onChange={handleInputChangeHidden}
                    style={{
                      width: "100px",
                      position: "absolute",
                      top: "10px",
                      left: "-250px",
                      zIndex: -1,
                    }}
                  />
                  {/* <button
                    style={{
                      position: "absolute",
                      left: "50px",
                      top: "70px",
                      zIndex: -1,
                    }}
                  >
                    c
                  </button> */}
                </div>
              </div>
              <div style={{ display: "flex", margin: "15px 0px 20px -5px" }}>
                <input
                  type="text"
                  value={inputValue}
                  style={{ border: inputError && "1px solid red" }}
                  className="enterBrachItemBox"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
                <Button
                  variant="contained"
                  className="createGoBtn"
                  style={{
                    color: "white",
                    backgroundColor: "#e68900",
                    borderRadius: "0px",
                  }}
                  onClick={handleGoButtonClick}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    GO
                  </Typography>
                </Button>
              </div>
              
            </div>
          )}
  
          {viewType === "design" && (
            <div style={{ marginTop: "20px", display: "flex" }}>
              <div>
                <RadioGroup>
                  <FormControlLabel
                    value="customerStock"
                    control={<Radio />}
                    label="Customer Stock"
                  />
                  <FormControlLabel
                    value="companyStock"
                    control={<Radio />}
                    label="Company Stock"
                  />
                  <FormControlLabel
                    value="memoToSale"
                    control={<Radio />}
                    label="Memo to Sale"
                  />
                  <FormControlLabel
                    value="engageToOtherCustomer"
                    control={<Radio />}
                    label="Engage To Other Customer"
                  />
                </RadioGroup>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "150px",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  style={{
                    border: inputError && "1px solid red",
                    height: "35px",
                    outline: "none",
                  }}
                  autoFocus
                  className="enterBrachItemBox"
                  placeholder="Add Design#"
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  variant="contained"
                  className="createGoBtn"
                  style={{
                    color: "white",
                    backgroundColor: "#e68900",
                    borderRadius: "0px",
                  }}
                  onClick={handleGoButtonClick}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    GO
                  </Typography>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ScanAddJob;