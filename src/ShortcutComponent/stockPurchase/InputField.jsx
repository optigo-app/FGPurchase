import React, { forwardRef } from 'react';

const InputField = forwardRef(({
  name,
  value,
  onChange,
  width,
  placeholder,
  style = {},
  readOnly,
  ...props
}, ref) => {
  const inputStyle = {
    width,
    border: "1px solid #ccc",
    ...style
  };

  return (
    <input
      ref={ref}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      style={inputStyle}
      className='onfocus_snv m_x_inp_snv'
      placeholder={placeholder}
      autoComplete='off'
      readOnly={readOnly}
      {...props}
    />
  );
});

InputField.displayName = 'InputField';

export default InputField;