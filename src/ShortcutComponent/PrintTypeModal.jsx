import {
  Modal,
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PrintTypeModal = ({
  open,
  onClose,
  selectedOption,
  handleOptionChange,
  mode,
  theme,
}) => {
  const renderOptions = () => {
    const commonRadioStyles = {
      '&.Mui-checked': {
        color: theme?.palette?.customColors?.purple || '#7367f0',
      },
    };

    if (mode === 'alteration_receive' || mode === 'alteration_issue') {
      return (
        <>
          <FormControlLabel value="270" control={<Radio sx={commonRadioStyles} />} label="Alteration Print" />
          <FormControlLabel value="271" control={<Radio sx={commonRadioStyles} />} label="Repair Print" />
        </>
      );
    }

    return (
      <>
        <FormControlLabel value="270" control={<Radio sx={commonRadioStyles} />} label="Bill Sticker" />
        <FormControlLabel value="10" control={<Radio sx={commonRadioStyles} />} label="Daily Statement" />
        <FormControlLabel value="232" control={<Radio sx={commonRadioStyles} />} label="Detail Print 10" />
        <FormControlLabel value="312" control={<Radio sx={commonRadioStyles} />} label="Export Invoice A" />
        <FormControlLabel value="244" control={<Radio sx={commonRadioStyles} />} label="Invoice Print R" />
        <FormControlLabel value="283" control={<Radio sx={commonRadioStyles} />} label="Invoice Print V" />
      </>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        {/* Close icon */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: theme?.palette?.grey[600] || '#888',
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" component="h2" className="text-center mb-3" sx={{ color: theme?.palette?.customColors?.purple || '#7367f0' }}>
          Select Print Type
        </Typography>

        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            aria-label="print-type"
            name="print-type"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            {renderOptions()}
          </RadioGroup>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default PrintTypeModal;
