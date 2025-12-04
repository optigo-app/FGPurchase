import React, { useEffect, useState } from 'react';
import './neworder.css';
import { useDispatch } from 'react-redux';
import { Button, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { handleaddSubtagFlag, handleSaveAndNextFlag } from '../../../../redux/slices/HomeSlice';
import {
  brandMainData,
  categorymainData,
  collectionMainData,
  genderMainData,
  occasionMainData,
  productTypeMainData,
  styleMainData,
  subCategoryMainData,
} from '../../../../master/MasterData';
import { capitalizeWords } from '../../../../master/global';
import { storeFormData } from '../../../../redux/slices/jobSlice';

const Dropdown = ({ name, value, options, onChange }) => (
  <select
    name={name}
    id={name}
    className="categoryNewOrder fs_fgp fs_fgp_select"
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
  >
    <option value="" disabled>
      {capitalizeWords(name)}
    </option>
    {options?.map((e, i) => (
      <option
        value={
          e?.code ||
          e?.typeCode ||
          e?.genderCode ||
          e?.occasionCode ||
          e?.styleCode
        }
        key={i}
      >
        {capitalizeWords(
          e?.name ||
          e?.typeName ||
          e?.genderName ||
          e?.occasionName ||
          e?.styleName
        )}
      </option>
    ))}
  </select>
);

const fieldMap = [
  { name: 'productType', options: productTypeMainData },
  { name: 'brand', options: brandMainData },
  { name: 'collection', options: collectionMainData },
  { name: 'category', options: categorymainData },
  { name: 'subCategory', options: subCategoryMainData },
  { name: 'gender', options: genderMainData },
  { name: 'occasion', options: occasionMainData },
  { name: 'style', options: styleMainData },
  { name: 'hsn', options: [] },
];

const FormSection = ({ data, onChange }) => (
  <div className="filter_grid mt-3">
    {fieldMap.map(({ name, options }) => (
      <div key={name}>
        <Dropdown
          name={name}
          value={data[name] || ''}
          options={options}
          onChange={onChange}
        />
      </div>
    ))}
  </div>
);

const NewOrder = ({ purchase }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [mode, setMode] = useState('');
  const [formData, setFormData] = useState({});
  const [subTagData, setSubTagData] = useState({});
  const [designModeMain, setDesignModeMain] = useState('auto');
  const [designValueMain, setDesignValueMain] = useState('auto');
  const [designModeSub, setDesignModeSub] = useState('auto');
  const [designValueSub, setDesignValueSub] = useState('auto');

  useEffect(() => {
    dispatch(handleaddSubtagFlag(false));
  }, [dispatch]);

  useEffect(() => {
    if (purchase === 'tagging') {
      setMode('tag');
      dispatch(handleaddSubtagFlag(false));
    } else {
      setMode('');
      dispatch(handleaddSubtagFlag(false));
    }
  }, [purchase, dispatch]);

  const handleChange = (field, value) => {
    if (mode === 'subtag' && field.startsWith('sub_')) {
      const cleanField = field.replace('sub_', '');
      setSubTagData((prev) => ({ ...prev, [cleanField]: value }));
    } else if (mode === 'subtag') {
      setFormData((prev) => ({ ...prev, [field]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleCheckboxChange = (selectedMode) => {
    if (selectedMode === 'tag') {
      if (mode === 'tag' || mode === 'subtag') {
        setMode('');
        dispatch(handleaddSubtagFlag(false));
      } else {
        setMode('tag');
      }
    } else if (selectedMode === 'subtag') {
      if (mode === 'subtag') {
        setMode('tag');
        dispatch(handleaddSubtagFlag(false));
      } else {
        setMode('subtag');
        dispatch(handleaddSubtagFlag(true));
      }
    }
  };

  const handleSaveNNext = () => {
    const designFlagMain = designModeMain;
    const designNoMain = designModeMain === 'auto'
      ? 'Auto'
      : (designValueMain || '');

    const designFlagSub = designModeSub;
    const designNoSub = designModeSub === 'auto'
      ? 'Auto'
      : (designValueSub || '');

    let payload = {
      inwardAs: 'neworder',
      designFlagMain,
      designNoMain,
      designFlagSub,
      designNoSub,
    };

    if (mode === 'tag') {
      payload = {
        ...payload,
        mode: 'tag',
        data: formData,
      };
    } else if (mode === 'subtag') {
      payload = {
        ...payload,
        mode: 'subtag',
        data: formData,
        subTagData: subTagData,
      };
    } else {
      payload = {
        ...payload,
        mode: 'bulk',
        data: formData,
      };
    }

    dispatch(handleSaveAndNextFlag(true));
    dispatch(storeFormData(payload));
  };

  return (
    <>
      <div className='mainDivForStEntry'>
        {mode === 'subtag' ? (
          <>
            {/* Card 1: Tag Entry */}
            <div className='designDt' style={{
              justifyContent: mode === 'subtag' ? "space-between" : "flex-end"
            }}>
              {purchase === 'tagging' && (
                <div className="radio_group">
                  <input
                    type="checkbox"
                    id="subtag"
                    checked={mode === 'subtag'}
                    onChange={() => handleCheckboxChange('subtag')}
                    className="checkbox-radio"
                  />
                  <label htmlFor="subtag" className={`checkbox-label ${mode === 'subtag' ? 'checked' : ''}`}>
                    Add Sub Tag
                  </label>
                </div>
              )}
              <div className="design-controls">
                <label className='me-4'>Design#:</label>
                <label className="fs_fgp me-2">
                  <input
                    type="checkbox"
                    checked={designModeMain === 'auto'}
                    onChange={() => {
                      setDesignModeMain('auto');
                      setDesignValueMain('auto');
                    }}
                    className="me-1"
                  />
                  Auto
                </label>
                <label className="fs_fgp me-2">
                  <input
                    type="checkbox"
                    checked={designModeMain === 'manual'}
                    onChange={() => {
                      setDesignModeMain('manual');
                      setDesignValueMain('');
                    }}
                    className="me-1"
                  />
                  Manual
                </label>
                <input
                  type="text"
                  className="fs_fgp design-input"
                  value={designValueMain}
                  placeholder='Enter Design'
                  onChange={(e) => {
                    if (designModeMain === 'manual') {
                      setDesignValueMain(e.target.value);
                    }
                  }}
                  readOnly={designModeMain === 'auto'}
                />
              </div>
            </div>
            <div className="neworder_component mb-3">
              <div className="d-flex align-items-center">
                <h4 className="text-secondary fs_fgp">Tag Entry</h4>
              </div>
              <FormSection data={formData} onChange={handleChange} />
            </div>

            {/* Card 2: Sub Tag Entry */}
            <div className='designDt' style={{
              justifyContent: "flex-end"
            }}>
              <div className="design-controls">
                <label className='me-4'>Design#:</label>
                <label className="fs_fgp me-2">
                  <input
                    type="checkbox"
                    checked={designModeSub === 'auto'}
                    onChange={() => {
                      setDesignModeSub('auto');
                      setDesignValueSub('auto');
                    }}
                    className="me-1"
                  />
                  Auto
                </label>
                <label className="fs_fgp me-2">
                  <input
                    type="checkbox"
                    checked={designModeSub === 'manual'}
                    onChange={() => {
                      setDesignModeSub('manual');
                      setDesignValueSub('');
                    }}
                    className="me-1"
                  />
                  Manual
                </label>
                <input
                  type="text"
                  className="fs_fgp design-input"
                  value={designValueSub}
                  placeholder='Enter Design'
                  onChange={(e) => {
                    if (designModeSub === 'manual') {
                      setDesignValueSub(e.target.value);
                    }
                  }}
                  readOnly={designModeSub === 'auto'}
                />
              </div>
            </div>
            <div className="neworder_component">
              <div className="d-flex align-items-center">
                <h4 className="text-secondary fs_fgp">Sub Tag Entry</h4>
              </div>
              <FormSection
                data={subTagData}
                onChange={(field, value) => handleChange(`sub_${field}`, value)}
              />
            </div>
          </>
        ) : (
          <div className='mainDivForStEntry'>
            <div className='designDt' style={{
              justifyContent: mode === 'subtag' ? "space-between" : "flex-end"
            }}>
              <div className="design-controls">
                <label className='me-4'>Design#:</label>
                <label className="fs_fgp me-2">
                  <input
                    type="checkbox"
                    checked={designModeMain === 'auto'}
                    onChange={() => {
                      setDesignModeMain('auto');
                      setDesignValueMain('auto');
                    }}
                    className="me-1"
                  />
                  Auto
                </label>
                <label className="fs_fgp me-2">
                  <input
                    type="checkbox"
                    checked={designModeMain === 'manual'}
                    onChange={() => {
                      setDesignModeMain('manual');
                      setDesignValueMain('');
                    }}
                    className="me-1"
                  />
                  Manual
                </label>
                <input
                  type="text"
                  className="fs_fgp design-input"
                  value={designValueMain}
                  placeholder='Enter Design'
                  onChange={(e) => {
                    if (designModeMain === 'manual') {
                      setDesignValueMain(e.target.value);
                    }
                  }}
                  readOnly={designModeMain === 'auto'}
                />
              </div>
            </div>
            <div className="neworder_component">
              <div className="d-flex align-items-center">
                {mode === 'tag' ? (
                  <h4 className="text-secondary fs_fgp">Tag Entry</h4>
                ) : (
                  <h4 className="text-secondary fs_fgp">Bulk Job Entry</h4>
                )}
              </div>

              {purchase === 'tagging' && (
                <div className="action_section mt-2 mb-3">
                  <div className="radio_group">
                    <input
                      type="checkbox"
                      id="subtag"
                      checked={mode === 'subtag'}
                      onChange={() => handleCheckboxChange('subtag')}
                      className="checkbox-radio"
                    />
                    <label htmlFor="subtag" className={`checkbox-label ${mode === 'subtag' ? 'checked' : ''}`}>
                      Add Sub Tag
                    </label>
                  </div>
                </div>
              )}

              {mode === 'tag' && <>
                <div className="text-secondary mt-3 fs_fgp">Tag Entry</div>
                <FormSection data={formData} onChange={handleChange} /></>}
              {mode === '' && (
                <>
                  <div className="text-secondary mt-3 fs_fgp">Bulk Job Entry</div>
                  <FormSection data={formData} onChange={handleChange} />
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Button
          variant="contained"
          size="small"
          sx={{
            background: theme?.palette?.customColors?.primary,
            color: 'white',
          }}
          endIcon={<ArrowForwardIcon style={{ color: 'white' }} />}
          className="fs_fgp"
          onClick={handleSaveNNext}
        >
          Next
        </Button>
      </div>
    </>

  );
};

export default NewOrder;
