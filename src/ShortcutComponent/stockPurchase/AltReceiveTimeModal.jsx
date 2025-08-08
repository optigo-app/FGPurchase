import React from 'react';
import { Modal, Box, Typography, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const AltReceiveTimeModal = ({ open, onClose, theme }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxHeight: 700,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 24,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '200px',
        border: 'none',
        outline: 'none',
      }}
    >
      <div className='w-100'>
        <div className='d-flex align-items-center justify-content-between pb-2'>
          <div>&nbsp;</div>
          <h4 className='px-0 text-center w-100 fw-normal fs_fgp' style={{ color: theme?.palette?.customColors?.purple }}>Item Information</h4>
          <Tooltip title="Close"><CancelIcon style={{ cursor: 'pointer' }} onClick={onClose} /></Tooltip>
        </div>
        <div className="mt-3 fs_fgp">
          <Typography variant="body1" className="text-secondary">
            <div className="d-flex justify-content-between"><div>MetalType</div><div><strong>Gold 18K YW</strong></div></div>
            <div className="d-flex justify-content-between mt-2"><div>HSN No.</div><div><strong>7113</strong></div></div>
            <div className="d-flex justify-content-between mt-2"><div>Reference No.</div><div><strong>REF12345</strong></div></div>
            <div className="d-flex justify-content-between mt-2"><div>Certificate Type</div><div><strong>IGI</strong></div></div>
            <div className="d-flex justify-content-between mt-2"><div>Certificate No.</div><div><strong>CERT56789</strong></div></div>
            <div className="d-flex justify-content-between mt-2"><div>HUID No.</div><div><strong>HUID1234</strong></div></div>
          </Typography>
        </div>
      </div>
    </Box>
  </Modal>
);

export default AltReceiveTimeModal;
