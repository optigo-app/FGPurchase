import React from 'react';
import { Modal, Box, Typography, Tooltip, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MaterialDetailsTable from './MaterialDetailsTable';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const MaterialDetailsModal = ({
  open,
  onClose,
  title,
  rows,
  onInputChange,
  onAddRow,
  onSave,
  onKeyDown,
  config,
  theme,
  dispatch,
  handleIssuedMaterialModal,
  markUpModalOpen,
  focusRef
}) => {
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxHeight: '500px',
    overflowY: 'scroll',
    border: 'none',
    minWidth: '1550px'
  };

  return (
    <Modal
      open={open}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
      onClose={onClose}
    >
      <Box sx={modalStyle}>
        <div className='w-100'>
          {/* Header */}
          <div className='d-flex align-items-center justify-content-between p-1'>
            <div></div>
            <div>
              <Typography
                variant='h6'
                className='fs_fgp'
                sx={{ color: theme?.palette?.customColors?.purple }}
              >
                {title}
              </Typography>
            </div>
            <div className='d-flex align-items-center'>
              <Tooltip title="Receive From Vendor">
                <IconButton
                  onClick={() => dispatch(handleIssuedMaterialModal(true))}
                  sx={{
                    color: '#fff',
                    border: `1px solid ${theme?.palette?.customColors?.purple}`,
                    background: `${theme?.palette?.customColors?.primary}`,
                    p: .5,
                    mr: 2
                  }}
                >
                  <InfoOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Close" onClick={onClose} style={{ cursor: 'pointer' }}>
                <CloseIcon />
              </Tooltip>
            </div>
          </div>

          {/* Table */}
          <MaterialDetailsTable
            rows={rows}
            onInputChange={onInputChange}
            onAddRow={onAddRow}
            onKeyDown={onKeyDown}
            config={config}
            theme={theme}
            markUpModalOpen={markUpModalOpen}
            focusRef={focusRef}
          />

          {/* Save Button */}
          <div className='d-flex justify-content-center align-items-center w-100'>
            <Button
              variant='contained'
              size='small'
              className='fs_fgp'
              sx={{
                backgroundColor: theme?.palette?.customColors?.purple,
                color: 'white'
              }}
              onClick={onSave}
            >
              {config.saveButtonText}
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default MaterialDetailsModal;