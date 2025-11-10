import { Modal, Box, Tooltip, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const RemarkModal = ({
  open,
  onClose,
  remark,
  onChange,
  onSave,
  theme
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="remark-modal-title"
      aria-describedby="remark-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxHeight: 400,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '215px',
          border: 'none'
        }}
      >
        <div className='w-100 d-flex flex-column my-1'>
          <div className='mb-3 d-flex align-items-center justify-content-between'>
            <span></span>
            <Tooltip title="Close">
              <span style={{ cursor: 'pointer' }} onClick={onClose}><CancelIcon /></span>
            </Tooltip>
          </div>

          <textarea
            placeholder='Enter Your Remark'
            rows={5}
            className='mb-2 textareadRemark_snv fs_fgp'
            value={remark}
            onChange={onChange}
          />

          <Button
            className='fs_fgp'
            sx={{
              background: theme?.palette?.customColors?.primary,
              color: 'white',
              fontWeight: 'bold'
            }}
            variant='contained'
            size='small'
            onClick={onSave}
          >
            Save Remark
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default RemarkModal;
