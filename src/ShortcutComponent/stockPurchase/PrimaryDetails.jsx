import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Tooltip, Alert, Snackbar } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { calculateNetWeight, calculateGrossWeight, formatWeight } from '../../Utils/globalFunc';

const fields1 = [
  { id: 'HSN', label: 'HSN', placeholder: 'HSN', type: 'text' },
  { id: 'refno', label: 'Ref No.', placeholder: 'Ref No', type: 'text' },
  { id: 'ctype', label: 'Cert. Type', placeholder: 'Certificate Type', type: 'text' },
  { id: 'certno', label: 'Cert. No.', placeholder: 'Certificate No.', type: 'text' },
  { id: 'huid', label: 'HUID. No.', placeholder: 'HUID No', type: 'text' },
];

const fields2 = [
  { id: 'metaltype', label: 'MetalType', placeholder: 'Metal Type', type: 'text' },
  { id: 'grosswt', label: 'GrossWt', placeholder: 'Gross Wt', type: 'number' },
  { id: 'netwt', label: 'NetWt', placeholder: 'NetWt', type: 'number' },
  { id: 'tunch', label: 'Tunch', placeholder: 'Tunch', type: 'number' },
  { id: 'wastage', label: 'Wastage', placeholder: 'Wastage', type: 'number' },
  { id: 'diawt', label: 'Dia. Wt', placeholder: 'Dia.Wt', type: 'number' },
  { id: 'cswt', label: 'Cs. Wt', placeholder: 'Cs.Wt', type: 'number' },
  { id: 'miscwt', label: 'Misc. Wt', placeholder: 'Misc Wt', type: 'number' },
  { id: 'finewt', label: 'Finding. Wt', placeholder: 'Finding Wt', type: 'number' },
  { id: 'labour', label: 'Labour', placeholder: 'Labour', type: 'number' },
  { id: 'saleslabour', label: 'SalesLabour', placeholder: 'SalesLabour', type: 'number' },
];

const formatDecimal3 = (value) => {
  const [integer, decimal] = value.split('.');
  if (decimal && decimal.length > 3) {
    return `${integer}.${decimal.slice(0, 3)}`;
  }
  return value;
};

const formatDecimal2 = (value) => {
  const [integer, decimal] = value.split('.');
  if (decimal && decimal.length > 2) {
    return `${integer}.${decimal.slice(0, 2)}`;
  }
  return value;
};

const ClearButton = ({ onClick }) => (
  <div className="filter-item d-flex justify-content-center align-items-center w-100">
    <button 
      type="button" 
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: '#776BF0',
        cursor: 'pointer',
        textDecoration: 'underline',
        fontSize: '0.8rem',
        marginTop: '20px'
      }}
    >
      Clear
    </button>
  </div>
);

const PrimaryDetails = forwardRef(({ mode, values, onChange, showSubTag, setChangeCriteria, handleEnterKeyChange, csWtFocus, miscWtFocus, findingWtFocus }, ref) => {
  const [primaryWeightField, setPrimaryWeightField] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const hsnInputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focusHSN: () => {
      if (hsnInputRef.current) {
        hsnInputRef.current.focus();
      }
    }
  }));

  const showAlert = (message) => {
    setAlertMessage(message);
    setAlertOpen(true);
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertOpen(false);
  };

  useEffect(() => {
    if ((!values.grosswt || values.grosswt.trim() === '') && (!values.netwt || values.netwt.trim() === '')) {
      setPrimaryWeightField(null);
    }
  }, [values.grosswt, values.netwt]);

  useEffect(() => {
    if (!primaryWeightField && values.grosswt && values.grosswt.trim() !== '') {
      setPrimaryWeightField('grosswt');
      return;
    }
    if (primaryWeightField === 'grosswt' && values.grosswt && values.grosswt.trim() !== '') {
      try {
        const calculatedNetWt = calculateNetWeight(
          values.grosswt,
          values.diawt || 0,
          values.cswt || 0,
          values.miscwt || 0,
          values.finewt || 0
        );
        const formattedNetWt = formatWeight(calculatedNetWt);
        if (values.netwt !== formattedNetWt) {
          onChange('netwt', formattedNetWt);
        }
      } catch (error) {
        showAlert(error.message);
        onChange('netwt', '');
      }
    } else if (primaryWeightField === 'netwt' && values.netwt && values.netwt.trim() !== '') {
      try {
        const calculatedGrossWt = calculateGrossWeight(
          values.netwt,
          values.diawt || 0,
          values.cswt || 0,
          values.miscwt || 0,
          values.finewt || 0
        );
        const formattedGrossWt = formatWeight(calculatedGrossWt);
        
        if (values.grosswt !== formattedGrossWt) {
          onChange('grosswt', formattedGrossWt);
        }
      } catch (error) {
        showAlert(error.message);
        onChange('grosswt', '');
      }
    }
  }, [values.diawt, values.cswt, values.miscwt, values.finewt, primaryWeightField, values.grosswt, values.netwt]);

  const handleClearFields1 = () => {
    fields1.forEach(field => {
      onChange(field.id, '');
    });
  };

  const handleClearFields2 = () => {
    fields2.forEach(field => {
      onChange(field.id, '');
    });
    setPrimaryWeightField(null);
  };

  const handleInputChange = (id, value) => {
    let formattedValue = value;
    if (id === 'grosswt' || id === 'netwt') {
      formattedValue = formatDecimal3(value);
    } else if (id === 'tunch' || id === 'wastage') {
      formattedValue = formatDecimal2(value);
    } else if (['diawt', 'cswt', 'miscwt', 'finewt'].includes(id)) {
      formattedValue = formatDecimal3(value);
    }

    if (id === 'grosswt' || id === 'netwt') {
      setPrimaryWeightField(id);
    }

    if (['diawt', 'cswt', 'miscwt', 'finewt'].includes(id)) {
      const updatedValues = { ...values, [id]: formattedValue };
      
      if (primaryWeightField === 'grosswt' && values.grosswt && values.grosswt.trim() !== '') {
        try {
          const calculatedNetWt = calculateNetWeight(
            values.grosswt,
            updatedValues.diawt || 0,
            updatedValues.cswt || 0,
            updatedValues.miscwt || 0,
            updatedValues.finewt || 0
          );
          onChange('netwt', formatWeight(calculatedNetWt));
        } catch (error) {
          showAlert(error.message);
          onChange('netwt', '');
        }
      } else if (primaryWeightField === 'netwt' && values.netwt && values.netwt.trim() !== '') {
        try {
          const calculatedGrossWt = calculateGrossWeight(
            values.netwt,
            updatedValues.diawt || 0,
            updatedValues.cswt || 0,
            updatedValues.miscwt || 0,
            updatedValues.finewt || 0
          );
          onChange('grosswt', formatWeight(calculatedGrossWt));
        } catch (error) {
          showAlert(error.message);
          onChange('grosswt', '');
        }
      }
    }
    onChange(id, formattedValue);
  };

  const handleKeyDown = (e, id, isSecondRow) => {
    if (e.key === 'Tab' && id === 'grosswt' && values.grosswt && values.grosswt.trim() !== '') {
      e.preventDefault();
      const tunchInput = document.getElementById('tunch');
      if (tunchInput) {
        tunchInput.focus();
      }
    } else if (isSecondRow && ['diawt', 'cswt', 'miscwt', 'finewt'].includes(id)) {
      handleEnterKeyChange(e, id);  
    }
  };

  const renderInput = ({ id, label, placeholder, type = 'text' }, isSecondRow = false) => {
    const isCalculatedWeightField = ['diawt', 'cswt', 'miscwt', 'finewt'].includes(id);
    
    return (
      <div className="filter-item" key={id}>
        <div>
          <label htmlFor={id} style={{ fontSize: '0.7rem', paddingLeft: '4px', color: '#797979' }}>{label}</label>
          <input
            type={type}
            id={id}
            name={id}
            value={values[id] || ''}
            placeholder={placeholder}
            step={type === 'number' ? '0.001' : undefined}
            min={type === 'number' ? '0' : undefined}
            ref={id === 'HSN' ? hsnInputRef : id === 'cswt' ? csWtFocus : id === 'miscwt' ? miscWtFocus : id === 'finewt' ? findingWtFocus : undefined}
            onChange={(e) => handleInputChange(id, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, id, isSecondRow)}
            style={{
              backgroundColor: isCalculatedWeightField ? '#f8f9fa' : 'white',
              cursor: isCalculatedWeightField ? 'pointer' : 'text'
            }}
            title={isCalculatedWeightField ? 'Click to open material details' : ''}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {mode !== 'alteration_receive' && (
        <div className="filters-container_sn fs_fgp">
          {fields1.map(f => renderInput(f))}
          <div className="filter-item d-flex justify-content-center align-items-center w-100">
          <ClearButton onClick={handleClearFields1} />
            <Tooltip title="Change Criteria" style={{ cursor: 'pointer', marginTop: '20px' }} onClick={() => setChangeCriteria(true)}>
              <SettingsIcon style={{ color: '#776BF0', cursor: 'pointer' }} />
            </Tooltip>
          </div>
        </div>
      )}

      <div className="filters-container2 fs_fgp">
        {(mode !== 'alteration_receive' ? fields2.slice(0, 1) : []).map(f => renderInput(f))}
        {fields2.slice(mode !== 'alteration_receive' ? 1 : 0).map(f => renderInput(f, true))}
        <ClearButton onClick={handleClearFields2} />
      </div>

      {showSubTag && (
        <>
          <hr />
          <div className="filters-container_sn fs_fgp">
            {fields1.map(f => renderInput(f))}
            <div className="filter-item d-flex justify-content-center align-items-center w-100">
              <Tooltip title="Change Criteria" style={{ cursor: 'pointer', marginTop: '20px' }} onClick={() => setChangeCriteria(true)}>
                <SettingsIcon style={{ color: '#776BF0', cursor: 'pointer' }} />
              </Tooltip>
            </div>
            <ClearButton onClick={handleClearFields1} />
          </div>
          <div className="filters-container2 fs_fgp">
            {fields2.map(f => renderInput(f, true))}
            <ClearButton onClick={handleClearFields2} />
          </div>
        </>
      )}

      {/* MUI Alert for error messages */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={8000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleAlertClose}
          severity="warning"
          variant="outlined"
          sx={{ 
            width: '100%',
            backgroundColor: '#fff3cd',
            borderColor: '#ffc107',
            color: '#856404',
            '& .MuiAlert-icon': {
              color: '#ffc107'
            },
            '& .MuiAlert-action': {
              color: '#856404'
            },
            boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
            borderRadius: '8px',
            fontWeight: 500
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
});

export default PrimaryDetails;
