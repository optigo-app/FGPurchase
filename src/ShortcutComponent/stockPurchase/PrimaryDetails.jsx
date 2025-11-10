import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Tooltip, Alert, Snackbar, IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { calculateNetWeight, calculateGrossWeight, formatWeight } from '../../Utils/globalFunc';
import MaterialInfo from '../../components/HomePage/orderComponent/savennext/selectedJobDetail/MaterialInfo';

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

const PrimaryDetails = forwardRef(({
  mode,
  values,
  subTagValues,
  onChange,
  showSubTag,
  setChangeCriteria,
  handleEnterKeyChange,
  csWtFocus,
  miscWtFocus,
  findingWtFocus,
  materials,
  subTagMaterials,
  // MaterialInfo props for subtag
  theme,
  showTableEntry,
  setShowTableEntry,
  handleAddRemark,
  handleSubTagAddRemark,
  subTagUploadImages,
  renderFilePreview,
  subTagMaterialDetails,
  subTagCalculations,
  // InfoOutlinedIcon props
  onMainInfoIconClick,
  onSubTagInfoIconClick,
  dispatch,
  // Material context props
  setCurrentMaterialContext
}, ref) => {
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

  const handleInputChange = (id, value, isSubTag = false) => {
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

    const currentValues = isSubTag ? subTagValues : values;

    if (['diawt', 'cswt', 'miscwt', 'finewt'].includes(id)) {
      const updatedValues = { ...currentValues, [id]: formattedValue };

      if (primaryWeightField === 'grosswt' && currentValues.grosswt && currentValues.grosswt.trim() !== '') {
        try {
          const calculatedNetWt = calculateNetWeight(
            currentValues.grosswt,
            updatedValues.diawt || 0,
            updatedValues.cswt || 0,
            updatedValues.miscwt || 0,
            updatedValues.finewt || 0
          );
          onChange('netwt', formatWeight(calculatedNetWt), isSubTag);
        } catch (error) {
          showAlert(error.message);
          onChange('netwt', '', isSubTag);
        }
      } else if (primaryWeightField === 'netwt' && currentValues.netwt && currentValues.netwt.trim() !== '') {
        try {
          const calculatedGrossWt = calculateGrossWeight(
            currentValues.netwt,
            updatedValues.diawt || 0,
            updatedValues.cswt || 0,
            updatedValues.miscwt || 0,
            updatedValues.finewt || 0
          );
          onChange('grosswt', formatWeight(calculatedGrossWt), isSubTag);
        } catch (error) {
          showAlert(error.message);
          onChange('grosswt', '', isSubTag);
        }
      }
    }
    onChange(id, formattedValue, isSubTag);
  };

  const handleKeyDown = (e, id, isSecondRow, isSubTag = false) => {
    if (e.key === 'Tab' && id === 'grosswt') {
      const currentValues = isSubTag ? subTagValues : values;
      if (currentValues.grosswt && currentValues.grosswt.trim() !== '') {
        e.preventDefault();
        const tunchInputId = isSubTag ? 'tunch_subtag' : 'tunch';
        const tunchInput = document.getElementById(tunchInputId);
        if (tunchInput) {
          tunchInput.focus();
        }
      }
    } else if (isSecondRow && ['diawt', 'cswt', 'miscwt', 'finewt'].includes(id)) {
      handleEnterKeyChange(e, id, isSubTag);
    }
  };

  const renderInput = ({ id, label, placeholder, type = 'text' }, isSecondRow = false, isSubTag = false, suffix = '') => {
    const isCalculatedWeightField = ['diawt', 'cswt', 'miscwt', 'finewt'].includes(id);
    const currentValues = isSubTag ? subTagValues : values;
    const currentMaterials = isSubTag ? subTagMaterials : materials;
    const inputId = isSubTag ? `${id}_subtag` : id;

    let calculatedValue = currentValues?.[id] || '';
    if (isCalculatedWeightField && currentMaterials) {
      let materialType = '';
      if (id === 'diawt') materialType = 'diamond';
      else if (id === 'cswt') materialType = 'colorstone';
      else if (id === 'miscwt') materialType = 'misc';
      else if (id === 'finewt') materialType = 'finding';

      if (materialType && currentMaterials[materialType]) {
        const totalWeight = currentMaterials[materialType].reduce((sum, item) => {
          const weight = parseFloat(item.wt) || 0;
          return sum + weight;
        }, 0);

        if (!currentValues?.[id] || currentValues?.[id] === '') {
          calculatedValue = totalWeight > 0 ? totalWeight.toFixed(3) : '';
        } else {
          calculatedValue = currentValues?.[id] || '';
        }
      }
    }

    return (
      <div className="filter-item" key={inputId}>
        <div>
          <label htmlFor={inputId} style={{ fontSize: '0.7rem', paddingLeft: '4px', color: '#797979' }}>
            {label}{suffix}
          </label>
          <input
            type={type}
            id={inputId}
            name={inputId}
            value={calculatedValue}
            placeholder={placeholder}
            step={type === 'number' ? '0.001' : undefined}
            min={type === 'number' ? '0' : undefined}
            ref={id === 'HSN' && !isSubTag ? hsnInputRef : id === 'cswt' ? csWtFocus : id === 'miscwt' ? miscWtFocus : id === 'finewt' ? findingWtFocus : undefined}
            onChange={(e) => handleInputChange(id, e.target.value, isSubTag)}
            onKeyDown={(e) => handleKeyDown(e, id, isSecondRow, isSubTag)}
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
          {fields1?.map(f => renderInput(f))}
          <div className="d-flex justify-content-center align-items-center w-100">
            <ClearButton onClick={handleClearFields1} />
            <Tooltip title="Change Criteria" style={{ cursor: 'pointer', marginTop: '20px' }}>
              <IconButton
                onClick={() => setChangeCriteria(true)}
                sx={{
                  color: '#fff',
                  border: `1px solid ${theme?.palette?.customColors?.purple}`,
                  background: `${theme?.palette?.customColors?.primary}`,
                  p: 1,
                  marginTop: '20px'
                }}
              >
                <SettingsIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Receive From Vendor - Main Tag" style={{ cursor: 'pointer', marginTop: '20px', marginLeft: '10px' }}>
              <IconButton
                onClick={onMainInfoIconClick}
                sx={{
                  color: '#fff',
                  border: `1px solid ${theme?.palette?.customColors?.purple}`,
                  background: `${theme?.palette?.customColors?.primary}`,
                  p: 1,
                  marginTop: '20px'
                }}
              >
                <InfoOutlinedIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}

      <div className="filters-container2 fs_fgp">
        {(mode !== 'alteration_receive' ? fields2?.slice(0, 1) : [])?.map(f => renderInput(f))}
        {fields2?.slice(mode !== 'alteration_receive' ? 1 : 0)?.map(f => renderInput(f, true))}
        <ClearButton onClick={handleClearFields2} />
      </div>

      {showSubTag && (
        <>
          <hr />
          <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <h5 className='header_title_fgp fs_fgp' style={{ color: '#fff' }}>
              Add Sub Tag Product Details
            </h5>
          </div>

          <div style={{ marginTop: '15px', marginBottom: '15px' }}>
            <MaterialInfo
              theme={theme}
              showTableEntry={showTableEntry}
              setShowTableEntry={setShowTableEntry}
              handleAddRemark={handleSubTagAddRemark}
              setAltReceiveTimeHide={() => console.log('Show alt receive time')}
              setChangeCriteria={() => console.log('Change criteria')}
              uploadImage={subTagUploadImages || []}
              renderFilePreview={renderFilePreview}
              mode={mode}
              materialDetails={subTagMaterialDetails || {}}
              calculations={subTagCalculations || {}}
              diamondRows={subTagMaterials?.diamond || []}
              colorstoneRows={subTagMaterials?.colorstone || []}
              miscRows={subTagMaterials?.misc || []}
              findingRows={subTagMaterials?.finding || []}
              currentJob={null}
              isSubTag={true}
              setCurrentMaterialContext={setCurrentMaterialContext}
            />
          </div>
          <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <h6 style={{ color: '#495057', marginBottom: '10px' }}>Sub Tag Entry</h6>
            <div className="filters-container_sn fs_fgp">
              {fields1?.map(f => renderInput(f, false, true, ' (Sub)'))}
              <div className="d-flex justify-content-center align-items-center w-100">
                <ClearButton onClick={() => {
                  fields1?.forEach(field => {
                    onChange(field.id, '', true);
                  });
                }} />
                <Tooltip title="Change Criteria" style={{ cursor: 'pointer', marginTop: '20px' }}>
                  <IconButton
                    onClick={() => setChangeCriteria(true)}
                    sx={{
                      color: '#fff',
                      border: `1px solid ${theme?.palette?.customColors?.purple}`,
                      background: `${theme?.palette?.customColors?.primary}`,
                      p: 1,
                      marginTop: '20px'
                    }}
                  >
                    <SettingsIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Tooltip>
                {/* Sub Tag InfoOutlinedIcon */}
                <Tooltip title="Receive From Vendor - Sub Tag" style={{ cursor: 'pointer', marginTop: '20px', marginLeft: '10px' }}>
                  <IconButton
                    onClick={onSubTagInfoIconClick}
                    sx={{
                      color: '#fff',
                      border: `1px solid ${theme?.palette?.customColors?.purple}`,
                      background: `${theme?.palette?.customColors?.primary}`,
                      p: 1,
                      marginTop: '20px'
                    }}
                  >
                    <InfoOutlinedIcon sx={{ fontSize: '1rem' }} />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="filters-container2 fs_fgp">
              {(mode !== 'alteration_receive' ? fields2?.slice(0, 1) : [])?.map(f => renderInput(f, false, true, ' (Sub)'))}
              {fields2?.slice(mode !== 'alteration_receive' ? 1 : 0)?.map(f => renderInput(f, true, true, ' (Sub)'))}
              <ClearButton onClick={() => {
                fields2?.forEach(field => {
                  onChange(field.id, '', true);
                });
              }} />
            </div>
          </div>
        </>
      )}

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
