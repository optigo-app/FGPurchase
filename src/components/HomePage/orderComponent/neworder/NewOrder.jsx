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
import { saveNewOrder } from '../../../../redux/slices/StockPurchaseSlice';

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

const NewOrder = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [mode, setMode] = useState('');
  const [formData, setFormData] = useState({});
  const [subTagData, setSubTagData] = useState({});

  useEffect(() => {
    dispatch(handleaddSubtagFlag(false));
  }, [dispatch]);

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
    let payload = {};

    if (mode === 'tag') {
      payload = {
        mode: 'tag',
        data: formData,
      };
    } else if (mode === 'subtag') {
      payload = {
        mode: 'subtag',
        mainData: formData,
        subTagData: subTagData,
      };
    } else {
      payload = {
        mode: 'bulk',
        data: formData,
      };
    }

    dispatch(handleSaveAndNextFlag(true));
    dispatch(saveNewOrder(payload));
  };

  return (
    <div className="neworder_component">
      {/* Heading */}
      <div className="d-flex align-items-center">
        {mode === 'tag' ? (
          <h4 className="text-secondary fs_fgp">Tag Entry</h4>
        ) : mode === 'subtag' ? (
          <h4 className="text-secondary fs_fgp">Make Your Sub Entry</h4>
        ) : (
          <h4 className="text-secondary fs_fgp">Bulk Job Entry</h4>
        )}
      </div>

      {/* Radio Buttons */}
      <div className="action_section mt-2 mb-3">
        <div className="radio_group">
          <input
            type="checkbox"
            id="tag"
            checked={mode === 'tag' || mode === 'subtag'}
            onChange={() => handleCheckboxChange('tag')}
            className="checkbox-radio"
          />
          <label htmlFor="tag" className={`checkbox-label ${(mode === 'tag' || mode === 'subtag') ? 'checked' : ''}`}>
            Tag Generate
          </label>
        </div>
        {/* Show Add Sub Tag checkbox only when Tag Generate is checked */}
        {(mode === 'tag' || mode === 'subtag') && (
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
      </div>

      {/* Forms */}
      {mode === 'tag' && <>
        <div className="text-secondary mt-3 fs_fgp">Tag Entry</div>
        <FormSection data={formData} onChange={handleChange} /></>}
      {mode === 'subtag' && (
        <>
          <div className="text-secondary mt-3 fs_fgp">Sub Tag Entry</div>
          <FormSection data={formData} onChange={handleChange} />
          <div className="mt-3">
            <FormSection
              data={subTagData}
              onChange={(field, value) => handleChange(`sub_${field}`, value)}
            />
          </div>
        </>
      )}
      {mode === '' && (
        <>
          <div className="text-secondary mt-3 fs_fgp">Bulk Job Entry</div>
          <FormSection data={formData} onChange={handleChange} />
        </>
      )}


      {/* Next Button */}
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
    </div>

  );
};

export default NewOrder;
