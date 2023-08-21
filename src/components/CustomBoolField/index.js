import React from 'react';
import { connectField } from 'uniforms';
import { Checkbox } from 'antd';

const CustomBoolField = ({ onAfterChange, label, ...props }) => {
  const handleChange = (event) => {
    onAfterChange && onAfterChange(event.target.checked);
    props.onChange && props.onChange(event.target.checked);
  };

  return (
    <Checkbox {...props} onChange={handleChange}>{label}</Checkbox>
  );
};

export default connectField(CustomBoolField);
