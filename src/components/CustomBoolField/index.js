/* eslint-disable no-unused-vars -- Отключаем eslint no-unused-vars, no-param-reassign */
import { Checkbox } from "antd";
import React from "react";
import { connectField } from "uniforms";

/**
 * @param {Object} props
 * @param {Function} props.onAfterChange
 * @param {string} props.label
 * @returns {JSX.Element}
 */
const CustomBoolField = ({ onAfterChange, label, ...props }) => {
  /**
   * @param {Event} event
   * @returns {void}
   */
  const handleChange = event => {
    if (onAfterChange) {
      onAfterChange(event.target.checked);
    }
    if (props.onChange) {
      props.onChange(event.target.checked);
    }
  };

  return (
    <Checkbox {...props} onChange={handleChange}>{label}</Checkbox>
  );
};

export default connectField(CustomBoolField);
/* eslint-enable no-unused-vars -- Возвращаем eslint no-unused-vars, no-param-reassign */
