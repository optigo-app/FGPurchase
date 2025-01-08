import React, { useState } from "react";
import "./ratecut.css";
import CustomTextField from "../TextField";
import { MenuItem, Grid, useTheme, Button } from "@mui/material";

const RateCut = () => {
  const theme = useTheme();
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
    { id: 1, name: 'GOLD' },
    { id: 2, name: 'SILVER' },
    { id: 3, name: 'PLATINUM' },
  ];

  const handleToggleLabel = (btn) => {
    if (btn === 'btn1') {
      setSelectedButton('amount');
    } else {
      setSelectedButton('metal');
    }
  };

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="mb-5 mt-5">
        <input type="checkbox" id="toggle" className="toggleCheckbox" />
        <label htmlFor="toggle" className="toggleContainer">
          <div className="fs_fgp fw-normal" onClick={() => handleToggleLabel('btn1')}>Convert To Amount</div>
          <div className="fs_fgp fw-normal" onClick={() => handleToggleLabel('btn2')}>Convert To Metal</div>
        </label>
      </div>

      {/* Metal Type and Input Fields */}
      {selectedButton === "metal" && (
        <div className="metalInputsContainer">
          {/* <CustomTextField
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
              <em>Choose Metal Type</em>
            </MenuItem>
            {metalTypeArr?.map((e, i) => (
              <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
            ))}
          </CustomTextField> */}
            <div className="d-flex align-items-start flex-column">
              <label htmlFor="metalType" className="fs_fgp text_color">Metal Type</label>
              <select name="" id="metalType" className="inputField fs_fgp fs_fgp_select rc_input">
              <option value="" disabled selected></option>
              {
                metalTypeArr?.map((e, i) => {
                  return <option value={e?.id} key={i}>{e?.name}</option>
                })
              }
            </select>
            </div>

          <div className="d-flex align-items-start flex-column">
          <label htmlFor="metalIn24K" className="fs_fgp text_color">Metal In 24K</label>
          <input
            type="text"
            name="value1"
            value={metalData.value1}
            onChange={handleMetalChange}
            placeholder="Metal In 24K"
            className="inputField fs_fgp rc_input"
          />
          </div>

          <div className="d-flex align-items-start flex-column">
            <label htmlFor="rateIn24K" className="fs_fgp text_color">Rate In 24K</label>
          <input
            type="text"
            name="value2"
            value={metalData.value2}
            onChange={handleMetalChange}
            placeholder="Rate In 24K"
            className="inputField fs_fgp rc_input"
            id="rateIn24K"
            />
          </div>

          <div className="d-flex align-items-start flex-column">
          <label htmlFor="amount" className="fs_fgp text_color">Amount</label>
          <input
            type="text"
            name="value3"
            value={metalData.value3}
            onChange={handleMetalChange}
            placeholder="Amount"
            className="inputField fs_fgp rc_input"
              id="amount"
          />
          </div>

          {/* <button
            className="saveBtn"
            onClick={() => handleSave("metal")}
          >
            Save
          </button> */}
          <Button size="small" variant="contained" sx={{backgroundColor:theme.palette.customColors?.purple, color:'white'}} className=" fs_fgp">
            Save
          </Button>
        </div>
      )}
      
      {/* Metal Type and Input Fields */}
      {selectedButton === "amount" && (
        <div className="metalInputsContainer">
          {/* <CustomTextField
            select
            fullWidth
            // customBorderColor="rgba(47, 43, 61, 0.2)"
            // borderoutlinedColor="#00CFE8"
            customTextColor="#2F2B3DC7"
            customFontSize="0.8125rem"
            size="small"
            className="inputField"
            variant="filled"
          >
            <MenuItem value="">
              <em>Choose Metal Type</em>
            </MenuItem>
            {metalTypeArr?.map((e, i) => (
              <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
            ))}
          </CustomTextField> */}


          <div className="d-flex align-items-start flex-column">
            <label htmlFor="metalType" className="fs_fgp text_color">Metal Type</label>     
          <select name="" id="metalType" className="inputField fs_fgp fs_fgp_select rc_input">
            <option value="" disabled selected></option>
            {
              metalTypeArr?.map((e, i) => {
                return <option value={e?.id} key={i}>{e?.name}</option>
              })
            }
          </select>
          </div>

          <div className="d-flex align-items-start flex-column">
            <label htmlFor="amount" className="fs_fgp text_color">Amount</label>
            <input
            type="text"
            name="value1"
            value={metalData.value1}
            onChange={handleAmountChange}
            placeholder="Amount"
            className="inputField fs_fgp rc_input"
            id="amount"
          />
          </div>

          <div className="d-flex align-items-start flex-column">
            <label htmlFor="rateIn24K" className="fs_fgp text_color">Rate In 24K</label>
            <input
            type="text"
            name="value2"
            value={metalData.value2}
            onChange={handleAmountChange}
            placeholder="Rate In 24K"
            className="inputField fs_fgp rc_input"
            id="rateIn24K"
          />
          </div>

          <div className="d-flex align-items-start flex-column">
            <label htmlFor="metalIn24K" className="fs_fgp text_color">Metal In 24K</label>
            <input
            type="text"
            name="value3"
            value={metalData.value3}
            onChange={handleAmountChange}
            placeholder="Metal In 24K"
            className="inputField fs_fgp rc_input"
            id="metalIn24K"
          />
          </div>
          <Button size="small" variant="contained" sx={{backgroundColor:theme.palette.customColors?.green, color:'white'}} className=" fs_fgp">
            Save
          </Button>
          {/* <button
            className="saveBtn fs_fgp"
            onClick={() => handleSave("metal")}
          >
            Save
          </button> */}
        </div>
      )}
    </div>
  );
};

export default RateCut;

// import React, { useState } from "react";
// import "./ratecut.css";
// import CustomTextField from "../TextField";
// import { MenuItem, Grid } from "@mui/material";

// const RateCut = () => {
//   const [selectedButton, setSelectedButton] = useState("amount");
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

//   const handleSave = (type) => {
//     if (type === "amount") {
//       console.log("Amount data saved: ", amountData);
//     } else if (type === "metal") {
//       console.log("Metal data saved: ", metalData);
//     }
//   };

//   const metalTypeArr = [
//     {
//       id:1,
//       name:'GOLD 10K'
//     },
//     {
//       id:2,
//       name:'GOLD 18K'
//     },
//     {
//       id:3,
//       name:'GOLD 24K'
//     },

//   ]

//   const handleToggleLabel = (btn) => {

//     if(btn === 'btn1'){
//       setSelectedButton('amount');
//     }else{
//       setSelectedButton('metal');
//     }
//   }

//   return (
//     <div>
//       {/* Toggle Buttons */}
//       {/* <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
//         <button
//           className={`btn ${
//             selectedButton === "amount" ? "btn-primary" : "btn-warning"
//           }`}
//           onClick={() => setSelectedButton("amount")}
//         >
//           Convert To Amount
//         </button>
//         <button
//           className={`btn ${
//             selectedButton === "metal" ? "btn-primary" : "btn-warning"
//           }`}
//           onClick={() => setSelectedButton("metal")}
//         >
//           Convert To Metal
//         </button>
//       </div> */}
//       <div className="my-2 mt-3">
//           <input type="checkbox" id="toggle" className="toggleCheckbox" />
//           <label for="toggle" className='toggleContainer'>
//             <div className="fs_fgp fw-normal" onClick={() => handleToggleLabel('btn1')}>Convert To Amount</div>   
//             <div className="fs_fgp fw-normal" onClick={() => handleToggleLabel('btn2')}>Convert To Metal</div>
//           </label>
//       </div>
      
//       <Grid container className="valueMainDiv " style={{ paddingTop:'0px', paddingLeft:'15px'}}>
//         <Grid item xs={12} sm={6} md={3} >
//                 <div className="valueMainDivP pb-1" >Metal Type</div>
//                 <CustomTextField
//                   select
//                   customBorderColor="rgba(47, 43, 61, 0.2)"
//                   borderoutlinedColor="#00CFE8"
//                   customTextColor="#2F2B3DC7"
//                   customFontSize="0.8125rem"
//                   size="small"
//                   className="allCustomize_textinput"
//                   variant="filled"
//                 >
//                     <MenuItem value="">
//                       <em></em>
//                     </MenuItem>
//                   {
//                     metalTypeArr?.map((e, i) => {
//                       return (
//                         <MenuItem key={i} value={e?.id}>{e?.name}</MenuItem>
//                       )
//                     })
//                   }
//                 </CustomTextField>
//                 </Grid>
//               </Grid>

//       {/* {selectedButton === "amount" && (
//         <div className="amaountmain">
//           <div>
//             <div className="valueMainDiv">
//               <p className="valueMainDivP">Amount</p>
//               <input
//                 type="text"
//                 name="value1"
//                 value={amountData.value1}
//                 onChange={handleAmountChange}
//               />
//             </div>
//             <div className="valueMainDiv">
//               <p className="valueMainDivP">Rate In 24K</p>
//               <input
//                 type="text"
//                 name="value2"
//                 value={amountData.value2}
//                 onChange={handleAmountChange}
//               />
//             </div>

//             <div className="valueMainDiv">
//               <p className="valueMainDivP">Metal In 24K</p>
//               <input
//                 type="text"
//                 name="value3"
//                 value={amountData.value3}
//                 onChange={handleAmountChange}
//               />
//             </div>
//           </div>
//           <button
//             className="SaveBtnAmaount"
//             onClick={() => handleSave("amount")}
//           >
//             Save
//           </button>
//         </div>
//       )} */}
//       {selectedButton === "amount" && (
//   <div className="amountMain_rc">
//     <div className="amountGrid_rc">
//       <div className="valueMainDiv_rc">
//         <div className="valueMainDivP">Amount</div>
//         <input
//           type="text"
//           name="value1"
//           value={amountData.value1}
//           onChange={handleAmountChange}
//           className="inputF_rc"
//         />
//       </div>
//       <div className="valueMainDiv_rc">
//         <div className="valueMainDivP">Rate In 24K</div>
//         <input
//           type="text"
//           name="value2"
//           value={amountData.value2}
//           onChange={handleAmountChange}
//           className="inputF_rc"
//         />
//       </div>
//       <div className="valueMainDiv_rc">
//         <div className="valueMainDivP">Metal In 24K</div>
//         <input
//           type="text"
//           name="value3"
//           value={amountData.value3}
//           onChange={handleAmountChange}
//           className="inputF_rc"
//         />
//       </div>
//     </div>
//     <button
//       className="saveBtnAmount_rc"
//       onClick={() => handleSave("amount")}
//     >
//       Save
//     </button>
//   </div>
// )}

// {selectedButton === "metal" && (
//   <div className="amountMain_rc">
//     <div className="amountGrid_rc">
//       <div className="valueMainDiv_rc">
//         <div className="valueMainDivP">Metal In 24K</div>
//         <input
//           type="text"
//           name="value1"
//           value={metalData.value1}
//           onChange={handleMetalChange}
//           className="inputF_rc"
//         />
//       </div>
//       <div className="valueMainDiv_rc">
//         <div className="valueMainDivP">Rate In 24K</div>
//         <input
//           type="text"
//           name="value2"
//           value={metalData.value2}
//           onChange={handleMetalChange}
//           className="inputF_rc"
//         />
//       </div>
//       <div className="valueMainDiv_rc">
//         <div className="valueMainDivP">Amount</div>
//         <input
//              type="text"
//              name="value3"
//              value={metalData.value3}
//              onChange={handleMetalChange}
//           className="inputF_rc"
//         />
//       </div>
//     </div>
//     <button
//       className="saveBtnAmount_rc"
//       onClick={() => handleSave("metal")}
//     >
//       Save
//     </button>
//   </div>
// )}


//       {/* {selectedButton === "metal" && (
//         <div className="amaountmain">
//           <div>
//             <div className="valueMainDiv">
//               <p className="valueMainDivP">Metal In 24K</p>
//               <input
//                 type="text"
//                 name="value1"
//                 value={metalData.value1}
//                 onChange={handleMetalChange}
//               />
//             </div>

//             <div className="valueMainDiv">
//               <p className="valueMainDivP">Rate In 24K</p>
//               <input
//                 type="text"
//                 name="value2"
//                 value={metalData.value2}
//                 onChange={handleMetalChange}
//               />
//             </div>

//             <div className="valueMainDiv">
//               <p className="valueMainDivP">Amount</p>
//               <input
//                 type="text"
//                 name="value3"
//                 value={metalData.value3}
//                 onChange={handleMetalChange}
//               />
//             </div>
//           </div>
//           <button
//             className="SaveBtnAmaount"
//             onClick={() => handleSave("metal")}
//           >
//             Save
//           </button>
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default RateCut;
