import { Box, Modal, Tooltip, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { handlePayByBank } from '../../redux/slices/HomeSlice';
import CancelIcon from '@mui/icons-material/Cancel';

const PayByCash = ({payByBank}) => {
    const dispatch = useDispatch();
    const theme = useTheme();
  return (
    <div>
    <Modal
        open={payByBank}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        onClose={() => dispatch(handlePayByBank(false))}
    >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            maxHeight: 700,
            overflow:'auto',
            // overflowY: 'scroll',
            bgcolor: 'background.paper',
            borderRadius: '12px',
            boxShadow: 24,
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: '300px',
            border: 'none',
          }}
          className="boxShadow_hp"
        >
            <div className='d-flex align-items-center justify-content-between align-items-center w-100'>
                <div></div>
                <div><Typography variant='h5' color={theme?.palette?.customColors?.purple}>New Payment Transaction</Typography></div>
                <div>
                <Tooltip title="Close">
                    <CancelIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => dispatch(handlePayByBank(false))}
                    />
                </Tooltip>
                </div>
            </div>
        </Box>
    </Modal>
    </div>
  )
}

export default PayByCash
