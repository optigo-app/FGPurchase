import React from 'react';
import { Modal, Box, Button, IconButton } from '@mui/material';
import DatePicker from 'react-datepicker';
import CloseIcon from '@mui/icons-material/Close';
import 'react-datepicker/dist/react-datepicker.css';

const UpdateDateModal = ({
    open,
    onClose,
    date,
    setDate,
    CustomInput,
    theme,
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="update-date-modal-title"
            aria-describedby="update-date-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 400 },
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {/* Close Button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        color: theme?.palette?.grey?.[600] || '#666',
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Title */}
                <h4
                    className="text-center fs_fgp"
                    style={{
                        color: theme?.palette?.customColors?.purple,
                        marginBottom: '1.5rem',
                    }}
                >
                    Update Date
                </h4>

                {/* Date Picker + Button */}
                <div className="d-flex justify-content-center align-items-center">
                    <div
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            padding: '2px 6px',
                            background: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <DatePicker
                            selected={date}
                            onChange={(newDate) => setDate(newDate)}
                            placeholderText="Select date"
                            customInput={<CustomInput />}
                        />
                    </div>

                    <Button
                        variant="contained"
                        size="small"
                        sx={{
                            backgroundColor: theme?.palette?.customColors?.purple,
                            color: 'white',
                            ml: 2,
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: theme?.palette?.customColors?.purpleHover || '#5e50f9',
                            },
                        }}
                        className="fs_fgp"
                        onClick={onClose}
                    >
                        Update
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default UpdateDateModal;
