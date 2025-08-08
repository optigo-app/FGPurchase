import React from 'react';
import { Modal, Box, Tooltip, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const MarkupModal = ({ open, onClose, theme }) => (
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
        minHeight: '300px',
        border: 'none',
      }}
    >
      <div className='w-100'>
        <div className='d-flex align-items-center justify-content-between pb-2'>
          <div>&nbsp;</div>
          <h4 className='text-secondary text-center w-100 fw-bold fs_fgp'>Apply Sale Mark Up</h4>
          <Tooltip title="Close"><CancelIcon style={{ cursor: 'pointer' }} onClick={onClose} /></Tooltip>
        </div>
        <div className='pt-2'>
          <label htmlFor="applyon" className='form-label fs_fgp mb-1 px-1' style={{ color: theme?.palette?.customColors?.purple }}>Apply On</label>
          <select id="applyon" className='form-control fs_fgp'>
            <option value="" disabled selected>Select</option>
            <option value="amount">Amount</option>
            <option value="percentage">Percentage</option>
          </select>
        </div>
        <div className='pt-2'>
          <label htmlFor="salerate" className='form-label mb-1 px-1 fs_fgp' style={{ color: theme?.palette?.customColors?.purple }}>Mark Rate</label>
          <input type="text" id="salerate" className='form-control' placeholder='50000' />
        </div>
        <div className='pt-2 w-100 ps-2'>
          <input type="checkbox" id="onpcsmarkup" />
          <label htmlFor="onpcsmarkup" className='form-label mb-1 px-1 user-select-none fs_fgp' style={{ color: theme?.palette?.customColors?.purple }}>On Pcs</label>
        </div>
        <div className='text-center w-100'>
          <Button variant='contained' className='fs_fgp' sx={{ fontWeight: 'bold', backgroundColor: theme?.palette?.customColors?.green }} size='small' onClick={onClose}>Apply</Button>
        </div>
      </div>
    </Box>
  </Modal>
);

export default MarkupModal;
