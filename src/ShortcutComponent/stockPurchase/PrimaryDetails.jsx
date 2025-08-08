import React from 'react';
import { Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const fields1 = [
  { id: 'HSN', label: 'HSN', placeholder: 'HSN' },
  { id: 'refno', label: 'Ref No.', placeholder: 'Ref No' },
  { id: 'ctype', label: 'Cert. Type', placeholder: 'Certificate Type' },
  { id: 'certno', label: 'Cert. No.', placeholder: 'Certificate No.' },
  { id: 'huid', label: 'HUID. No.', placeholder: 'HUID No' },
];

const fields2 = [
  { id: 'metaltype', label: 'MetalType', placeholder: 'Metal Type' },
  { id: 'grosswt', label: 'GrossWt', placeholder: 'Gross Wt' },
  { id: 'netwt', label: 'NetWt', placeholder: 'NetWt' },
  { id: 'tunch', label: 'Tunch', placeholder: 'Tunch' },
  { id: 'wastage', label: 'Wastage', placeholder: 'Wastage' },
  { id: 'diawt', label: 'Dia. Wt', placeholder: 'Dia.Wt' },
  { id: 'cswt', label: 'Cs. Wt', placeholder: 'Cs.Wt' },
  { id: 'miscwt', label: 'Misc. Wt', placeholder: 'Misc Wt' },
  { id: 'finewt', label: 'Finding. Wt', placeholder: 'Finding Wt' },
  { id: 'labour', label: 'Labour', placeholder: 'Labour' },
  { id: 'saleslabour', label: 'SalesLabour', placeholder: 'SalesLabour' },
];

const PrimaryDetails = ({ mode, onChange, showSubTag, setChangeCriteria, handleEnterKeyChange, csWtFocus, miscWtFocus, findingWtFocus }) => {
  const renderInput = ({ id, label, placeholder }, isSecondRow = false) => (
    <div className="filter-item" key={id}>
      <div>
        <label htmlFor={id} style={{ fontSize: '0.7rem', paddingLeft: '4px', color: '#797979' }}>{label}</label>
        <input
          type="text"
          id={id}
          name={id}
          placeholder={placeholder}
          ref={id === 'cswt' ? csWtFocus : id === 'miscwt' ? miscWtFocus : id === 'finewt' ? findingWtFocus : undefined}
          onChange={(e) => onChange(id, e.target.value)}
          onKeyDown={isSecondRow && ['diawt', 'cswt', 'miscwt', 'finewt'].includes(id) ? (e) => handleEnterKeyChange(e, id) : undefined}
        />
      </div>
    </div>
  );

  return (
    <>
      {mode !== 'alteration_receive' && (
        <div className="filters-container_sn fs_fgp">
          {fields1.map(f => renderInput(f))}
          <div className="filter-item d-flex justify-content-center align-items-center w-100">
            <Tooltip title="Change Criteria" style={{ cursor: 'pointer', marginTop: '20px' }} onClick={() => setChangeCriteria(true)}>
              <SettingsIcon style={{ color: '#776BF0', cursor: 'pointer' }} />
            </Tooltip>
          </div>
        </div>
      )}

      <div className="filters-container2 fs_fgp">
        {(mode !== 'alteration_receive' ? fields2.slice(0, 1) : []).map(f => renderInput(f))}
        {fields2.slice(mode !== 'alteration_receive' ? 1 : 0).map(f => renderInput(f, true))}
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
          </div>
          <div className="filters-container2 fs_fgp">
            {fields2.map(f => renderInput(f, true))}
          </div>
        </>
      )}
    </>
  );
};

export default PrimaryDetails;
