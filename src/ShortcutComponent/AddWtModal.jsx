import { Modal, Box, Button, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const AddWtModal = ({ open, onClose }) => {
  return (
    <Modal open={open} aria-labelledby="addwt-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxHeight: 300,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 190,
          border: 'none',
        }}
      >
        <div className="w-100">
          <div className="d-flex align-items-center justify-content-between pb-2">
            <div>&nbsp;</div>
            <h4 className="text-secondary px-0 text-center w-100 fw-bold"></h4>
            <div>
              <CancelIcon style={{ cursor: 'pointer' }} onClick={onClose} />
            </div>
          </div>
          <div className="pt-2 d-flex flex-column justify-content-center align-items-center">
            <Typography>Material Exceeds Issue Wt?</Typography>
            <Typography>Do You Want to Add?</Typography>
            <div className="mt-2">
              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold', mx: 1 }}
                size="small"
                onClick={onClose}
              >
                Manufacturer
              </Button>
              or
              <Button
                variant="contained"
                color="primary"
                sx={{ fontWeight: 'bold', mx: 1 }}
                size="small"
                onClick={onClose}
              >
                Company
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddWtModal;
