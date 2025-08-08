import React from 'react';
import InputField from './InputField';

const CriteriaInputs = ({ rowData, onChange, config }) => {
  const criteriaFields = config.criteriaFields || [
    { name: 'shape', placeholder: 'Shape', width: '80px' },
    { name: 'clarity', placeholder: 'Clarity', width: '70px' },
    { name: 'color', placeholder: 'Color', width: '70px' },
    { name: 'size', placeholder: 'Size', width: '80px' }
  ];

  return (
    <div>
      {criteriaFields.map((field) => (
        <InputField
          key={field.name}
          name={field.name}
          value={rowData[field.name]}
          onChange={onChange}
          width={field.width}
          placeholder={field.placeholder}
        />
      ))}
    </div>
  );
};

export default CriteriaInputs;
