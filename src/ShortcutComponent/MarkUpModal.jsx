import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const MarkUpModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="markup-modal">
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
        <div className="w-100">
          <div className="d-flex align-items-center justify-content-between pb-2">
            <div>&nbsp;</div>
            <h4 className="text-secondary px-0 text-center w-100 fw-bold">
              Apply Sale Mark Up
            </h4>
            <div>
              <CancelIcon style={{ cursor: 'pointer' }} onClick={onClose} />
            </div>
          </div>
          <div className="pt-2">
            <label htmlFor="applyon" className="form-label text-primary mb-1 px-1">
              Apply On
            </label>
            <select name="applyon" id="applyon" className="form-control">
              <option value="" selected disabled>
                Select
              </option>
              <option value="amount">Amount</option>
              <option value="percentage">Percentage</option>
            </select>
          </div>
          <div className="pt-2">
            <label htmlFor="salerate" className="form-label text-primary mb-1 px-1">
              Mark Rate
            </label>
            <input type="text" id="salerate" className="form-control" placeholder="50000" />
          </div>
          <div className="pt-2 w-100 ps-2">
            <input type="checkbox" id="onpcsmarkup" />
            <label
              htmlFor="onpcsmarkup"
              className="form-label mb-1 px-1 text-primary user-select-none"
            >
              On Pcs
            </label>
          </div>
          <div className="text-center w-100">
            <Button
              variant="contained"
              color="success"
              sx={{ fontWeight: 'bold' }}
              size="small"
              onClick={onClose}
            >
              Apply
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default MarkUpModal;
