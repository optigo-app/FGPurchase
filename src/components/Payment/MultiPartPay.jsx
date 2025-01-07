// import React, { useState } from 'react';
// import { Modal, Box } from '@mui/material';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { useDispatch } from 'react-redux';
// import { handleMultiPartPayFlag } from '../../redux/slices/HomeSlice';

// function MultipartPay({ multiPartPayFlag }) {
//     const dispatch = useDispatch();
//   // State to manage the metal and amount rows
//   const [metalRows, setMetalRows] = useState([{ metal: '4.089', dueDays: '0', date: '27 Nov 2024' }]);
//   const [amountRows, setAmountRows] = useState([{ amount: '2,588.91', dueDays: '0', date: '27 Nov 2024' }]);

//   // Function to add a metal row
//   const addMetalRow = () => {
//     setMetalRows([...metalRows, { metal: '', dueDays: '', date: '27 Nov 2024' }]);
//   };

//   // Function to add an amount row
//   const addAmountRow = () => {
//     setAmountRows([...amountRows, { amount: '', dueDays: '', date: '27 Nov 2024' }]);
//   };

//   const handleCloseMultiPartPay = () => {
//     dispatch(handleMultiPartPayFlag(false));
//   }
//   const handleMLTEntryRemove = (data, type) => {
//     if (type === 'metal') {
//       setMetalRows(prevRows => prevRows.filter(row => row !== data));
//     } else if (type === 'amount') {
//       setAmountRows(prevRows => prevRows.filter(row => row !== data));
//     }
//   };
  

//   return (
//     multiPartPayFlag && (
//       <Modal
//         open={multiPartPayFlag}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 900,
//             maxHeight:700,
//             overflowY:'scroll',
//             bgcolor: 'background.paper',
//             borderRadius: '12px',
//             boxShadow: 24,
//             p: 4,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             minHeight: '300px',
//             border: 'none',
//           }}
//           className="boxShadow_hp"
//         >
//           <div className='d-flex justify-content-between align-items-center w-100 mb-3'>
//                 <div></div>
//                 <h4 className="text-center  text-primary font-bold">Multipart Payment</h4>
//                 <div><CancelIcon style={{cursor:'pointer'}} onClick={() => dispatch(handleMultiPartPayFlag(false))} /></div>
//             </div>
//           <div className="w-full">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <div className="text-secondary">Total Metal: <strong>4.089</strong></div>
//               <div className="text-secondary">Total Amount: <strong>2,588.91</strong></div>
//             </div>

//             {/* Metal Rows Section */}
//             {metalRows?.map((row, index) => (
//               <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 my-3" key={`metal-${index}`}>
//                 <div className="d-flex align-items-center w-45">
//                   <div className="pe-4 text-muted">Metal</div>
//                   <input
//                     type="text"
//                     value={row.metal}
//                     className="focus_pay"
//                     style={{ maxWidth: '120px', fontWeight: '500' }}
//                   />
//                 </div>
//                 <div className="d-flex align-items-center w-45">
//                   <div className="pe-2 text-muted">Due Days:</div>
//                   <input
//                     type="text"
//                     value={row.dueDays}
//                     className="focus_pay"
//                     style={{ maxWidth: '120px' }}
//                   />
//                 </div>
//                 <div className="d-flex justify-content-center w-20 text-muted">{row.date}</div>
//                 <div className="d-flex justify-content-center w-20 text-white bg-danger p-1 rounded fw-semibold"  onClick={() => handleMLTEntryRemove(row, 'metal')} style={{cursor:'pointer'}}>Remove</div>
//               </div>
//             ))}

//             {/* Amount Rows Section */}
//             {amountRows?.map((row, index) => (
//               <div className="d-flex flex-wrap justify-content-between gap-3 my-3" key={`amount-${index}`}>
//                 <div className="d-flex align-items-center w-45">
//                   <div className="pe-2 text-muted">Amount</div>
//                   <input
//                     type="text"
//                     value={row.amount}
//                     className="focus_pay"
//                     style={{ maxWidth: '120px', fontWeight: '500' }}
//                   />
//                 </div>
//                 <div className="d-flex align-items-center w-45">
//                   <div className="pe-2 text-muted">Due Days:</div>
//                   <input
//                     type="text"
//                     value={row.dueDays}
//                     className="focus_pay"
//                     style={{ maxWidth: '120px' }}
//                   />
//                 </div>
//                 <div className="d-flex justify-content-center w-20 text-muted">{row.date}</div>
//                 <div className="d-flex justify-content-center w-20 text-white bg-danger p-1 rounded fw-semibold" onClick={() => handleMLTEntryRemove(row, 'amount')} style={{cursor:'pointer'}}>Remove</div>
//               </div>
//             ))}

//             <div className="text-secondary d-flex text-start mt-3">
//               Remaining Metal: <strong className="mx-2">0.0000</strong>
//               Remaining Amount: <strong className="mx-2">0.00</strong>
//             </div>

//             <div className="d-flex justify-content-between align-items-center mt-3 gap-2">
//               <button
//                 className="btn btn-success p-1 px-2"
//                 style={{ borderRadius: '8px', fontWeight: 'bold' }}
//                 onClick={() => handleCloseMultiPartPay()}
//               >
//                 Apply & Close
//               </button>
//               <button
//                 className="btn btn-primary p-1 px-2"
//                 style={{ borderRadius: '8px', fontWeight: 'bold' }}
//                 onClick={addMetalRow}
//               >
//                 Add Metal Row
//               </button>
//               <button
//                 className="btn btn-primary p-1 px-2"
//                 style={{ borderRadius: '8px', fontWeight: 'bold' }}
//                 onClick={addAmountRow}
//               >
//                 Add Amount Row
//               </button>
//             </div>
//           </div>
//         </Box>
//       </Modal>
//     )
//   );
// }

// export default MultipartPay;


import React, { useState } from 'react';
import { Modal, Box, Tooltip, Button, useTheme } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch } from 'react-redux';
import { handleMultiPartPayFlag } from '../../redux/slices/HomeSlice';

function MultipartPay({ multiPartPayFlag }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  // State to manage the metal and amount rows
  const [metalRows, setMetalRows] = useState([
    { id: 1, metal: '4.089', dueDays: '0', date: '27 Nov 2024' },
  ]);
  const [amountRows, setAmountRows] = useState([
    { id: 1, amount: '2,588.91', dueDays: '0', date: '27 Nov 2024' },
  ]);

  // Function to generate unique IDs
  const generateId = () => Date.now() + Math.floor(Math.random());

  // Function to add a metal row
  const addMetalRow = () => {
    setMetalRows([
      ...metalRows,
      { id: generateId(), metal: '', dueDays: '', date: '27 Nov 2024' },
    ]);
  };

  // Function to add an amount row
  const addAmountRow = () => {
    setAmountRows([
      ...amountRows,
      { id: generateId(), amount: '', dueDays: '', date: '27 Nov 2024' },
    ]);
  };

  // Function to remove a row based on ID
  const handleMLTEntryRemove = (id, type) => {
    if (type === 'metal') {
      setMetalRows((prevRows) => prevRows.filter((row) => row.id !== id));
    } else if (type === 'amount') {
      setAmountRows((prevRows) => prevRows.filter((row) => row.id !== id));
    }
  };

  const handleCloseMultiPartPay = () => {
    dispatch(handleMultiPartPayFlag(false));
  };
  return (
    multiPartPayFlag && (
      <Modal
        open={multiPartPayFlag}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            maxHeight: 700,
            overflowY: 'scroll',
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '300px',
            border: 'none',
          }}
          className="boxShadow_hp"
        >
          <div className="d-flex justify-content-between align-items-center w-100 mb-3">
            <div></div>
            <h4 className="text-center   font-bold fs_fgp" style={{color: theme?.palette?.customColors?.purple}}>
              Multipart Payment
            </h4>
            <div>
              <Tooltip title="Close">

              <CancelIcon
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch(handleMultiPartPayFlag(false))}
                />
                </Tooltip>
            </div>
          </div>
          <div className="w-full">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-secondary fs_fgp">
                Total Metal: <strong>4.089</strong>
              </div>
              <div className="text-secondary fs_fgp">
                Total Amount: <strong>2,588.91</strong>
              </div>
            </div>

            {/* Metal Rows Section */}
            {metalRows?.map((row) => (
              <div
                className="d-flex flex-wrap justify-content-between align-items-center gap-3 my-3 fs_fgp"
                key={row.id}
              >
                <div className="d-flex align-items-center w-45">
                  <div className="pe-4 text-muted">Metal</div>
                  <input
                    type="text"
                    value={row.metal}
                    className="focus_pay"
                    style={{ maxWidth: '120px',  }}
                  />
                </div>
                <div className="d-flex align-items-center w-45">
                  <div className="pe-2 text-muted">Due Days:</div>
                  <input
                    type="text"
                    value={row.dueDays}
                    className="focus_pay"
                    style={{ maxWidth: '120px' }}
                  />
                </div>
                <div className="d-flex justify-content-center w-20 text-muted">
                  {row.date}
                </div>
                {/* <div
                  className="d-flex justify-content-center w-20 text-white bg-danger p-1 rounded fw-semibold"
                  onClick={() => handleMLTEntryRemove(row.id, 'metal')}
                  style={{ cursor: 'pointer' }}
                >
                  Remove
                </div> */}
                <Button variant="contained" size="small" onClick={() => handleMLTEntryRemove(row.id, 'metal')} className='fs_fgp' sx={{backgroundColor: theme?.palette?.customColors?.red, color: theme?.palette?.customColors?.white, maxWidth:'250px' }}>
                  Remove
                </Button>
              </div>
            ))}

            {/* Amount Rows Section */}
            {amountRows?.map((row) => (
              <div
                className="d-flex flex-wrap justify-content-between gap-3 my-3 fs_fgp"
                key={row.id}
              >
                <div className="d-flex align-items-center w-45">
                  <div className="pe-2 text-muted">Amount</div>
                  <input
                    type="text"
                    value={row.amount}
                    className="focus_pay"
                    style={{ maxWidth: '120px',  }}
                  />
                </div>
                <div className="d-flex align-items-center w-45">
                  <div className="pe-2 text-muted">Due Days:</div>
                  <input
                    type="text"
                    value={row.dueDays}
                    className="focus_pay"
                    style={{ maxWidth: '120px' }}
                  />
                </div>
                <div className="d-flex justify-content-center w-20 text-muted">
                  {row.date}
                </div>
                {/* <div
                  className="d-flex justify-content-center w-20 text-white bg-danger p-1 rounded fw-semibold"
                  onClick={() => handleMLTEntryRemove(row.id, 'amount')}
                  style={{ cursor: 'pointer' }}
                >
                  Remove
                </div> */}
                <Button variant="contained" size="small" onClick={() => handleMLTEntryRemove(row.id, 'amount')} className='fs_fgp' sx={{backgroundColor: theme?.palette?.customColors?.red, color: theme?.palette?.customColors?.white, maxWidth:'250px' }}>
                  Remove
                </Button>
              </div>
            ))}

            <div className="text-secondary d-flex text-start mt-3 fs_fgp">
              Remaining Metal: <strong className="mx-2">0.0000</strong>
              Remaining Amount: <strong className="mx-2">0.00</strong>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3 gap-2 fs_fgp">
              {/* <button
                className="btn btn-success p-1 px-2"
                style={{ borderRadius: '8px', fontWeight: 'bold' }}
                onClick={() => handleCloseMultiPartPay()}
              >
                Apply & Close
              </button> */}
              <Button variant="contained" size="small" onClick={() => handleCloseMultiPartPay()} className='fs_fgp' sx={{backgroundColor: theme?.palette?.customColors?.green, color: theme?.palette?.customColors?.white, maxWidth:'250px' }}>
                Apply & Close
              </Button>
              {/* <button
                className="btn btn-primary p-1 px-2"
                style={{ borderRadius: '8px', fontWeight: 'bold' }}
                onClick={addMetalRow}
              >
                Add Metal Row
              </button> */}
              <Button variant="contained" size="small" onClick={addMetalRow} className='fs_fgp' sx={{backgroundColor: theme?.palette?.customColors?.purple, color: theme?.palette?.customColors?.white, maxWidth:'250px' }}>
                Add Metal Row
              </Button>
              {/* <button
                className="btn btn-primary p-1 px-2"
                style={{ borderRadius: '8px', fontWeight: 'bold' }}
                onClick={addAmountRow}
              >
                Add Amount Row
              </button> */}
              <Button variant="contained" size="small" onClick={addAmountRow} className='fs_fgp' sx={{backgroundColor: theme?.palette?.customColors?.purple, color: theme?.palette?.customColors?.white, maxWidth:'250px' }}>
                Add Amount Row
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    )
  );
}

export default MultipartPay;
