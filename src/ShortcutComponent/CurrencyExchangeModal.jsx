import { Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CurrencyExchangeModal = ({
    theme,
    open,
    onClose,
    value,
    setValue
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="currency-exchange-modal-title"
            aria-describedby="currency-exchange-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: 400 },
                    bgcolor: 'background.paper',
                    borderRadius: '12px',
                    boxShadow: 24,
                    p: 3,
                }}
                className="boxShadow_hp"
            >
                {/* Close Icon */}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 12,
                        top: 12,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>

                <h4
                    className="text-center fs_fgp"
                    style={{
                        color: theme?.palette?.customColors?.purple,
                        marginBottom: '1.5rem',
                    }}
                >
                    Currency Exchange Rate
                </h4>
                <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="form-control"
                        placeholder="Enter rate"
                        style={{ maxWidth: '160px' }}
                    />
                    <button
                        className="btn btn-primary py-1 px-3"
                        onClick={onClose}
                    >
                        Update
                    </button>
                </div>
            </Box>
        </Modal>
    );
};

export default CurrencyExchangeModal;
