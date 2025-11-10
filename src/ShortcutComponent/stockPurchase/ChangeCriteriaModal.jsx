import React, { useState } from 'react';
import { Modal, Box, Tooltip, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const ChangeCriteriaModal = ({
  open, onClose, theme,
  brandMainData = [], collectionMainData = [], categorymainData = [],
  subCategoryMainData = [], productTypeMainData = [],
  genderMainData = [], occasionMainData = [], styleMainData = [],
  onChange,
}) => {
  const [criteria, setCriteria] = useState({
    brand: '', collection: '', category: '', subCategory: '',
    productType: '', gender: '', occasion: '', style: '', hsn: ''
  });

  const handleChange = (field, value) => {
    setCriteria(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onChange("criteria", criteria);
    onClose();
  };

  const options = [
    { label: 'Brand', key: 'brand', data: brandMainData, value: 'code', text: 'name' },
    { label: 'Collection', key: 'collection', data: collectionMainData, value: 'code', text: 'name' },
    { label: 'Category', key: 'category', data: categorymainData, value: 'code', text: 'name' },
    { label: 'Sub Category', key: 'subCategory', data: subCategoryMainData, value: 'code', text: 'name' },
    { label: 'Product Type', key: 'productType', data: productTypeMainData, value: 'typeCode', text: 'typeName' },
    { label: 'Gender', key: 'gender', data: genderMainData, value: 'genderCode', text: 'genderName' },
    { label: 'Occasion', key: 'occasion', data: occasionMainData, value: 'occasionCode', text: 'occasionName' },
    { label: 'Style', key: 'style', data: styleMainData, value: 'styleCode', text: 'styleName' },
    { label: 'HSN', key: 'hsn', data: [], value: '', text: '' }
  ];

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800,
          maxHeight: 700,
          bgcolor: 'background.paper',
          borderRadius: '12px',
          boxShadow: 24,
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '200px',
          border: 'none',
          outline: 'none'
        }}
      >
        <div className='w-100'>
          <div className='d-flex align-items-center justify-content-between pb-2'>
            <div>&nbsp;</div>
            <h4 className='px-0 text-center w-100 fw-bold fs_fgp' style={{ color: theme?.palette?.customColors?.purple }}>Change Criteria</h4>
            <Tooltip title="Close"><CancelIcon style={{ cursor: 'pointer' }} onClick={onClose} /></Tooltip>
          </div>

          <div className="filter_grid mt-3">
            {options?.map((item, index) => (
              <div key={index}>
                <select
                  className='categoryNewOrder fs_fgp'
                  value={criteria[item.key]}
                  onChange={(e) => handleChange(item.key, e.target.value)}
                >
                  <option value="">{item.label}</option>
                  {item?.data?.map((e, i) => (
                    <option value={e?.[item.value]} key={i}>{e?.[item.text]}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className='categoryNewOrder mt-2 d-flex justify-content-end w-100 gap-2'>
            <Button
              variant='contained'
              className='fs_fgp'
              sx={{ fontWeight: 'bold', background: theme?.palette?.customColors?.primary }}
              size='small'
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant='outlined'
              className='fs_fgp'
              sx={{ fontWeight: 'bold', borderColor: theme?.palette?.customColors?.purple, color: theme?.palette?.customColors?.purple }}
              size='small'
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ChangeCriteriaModal;
