/* eslint-disable no-unused-vars, no-param-reassign -- Отключаем eslint no-unused-vars, no-param-reassign */
import { Badge, Form } from "antd";
import classnames from "classnames";
import { useRef } from "react";
import ReactInputMask from "react-input-mask";
import { connectField } from "uniforms";

import styles from "./index.module.scss";

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.additionalLabel
 * @param {string} props.value
 * @param {Object} props.field
 * @param {boolean} props.disabled
 * @param {Object} props.error
 * @param {boolean} props.showInlineError
 * @param {boolean} props.required
 * @param {string} props.validateStatus
 * @param {string} props.help
 * @param {Function} props.onCheckbox
 * @param {Function} props.onChange
 * @returns {JSX.Element}
 */
const CustomInput = ({
  label,
  additionalLabel,
  value,
  field,
  disabled,
  error,
  showInlineError,
  required,
  validateStatus,
  help,
  onCheckbox,
  onChange,
  ...props
}) => {
  const inputRef = useRef();

  if (onCheckbox) {
    value = "";
  }

  const inputAdditionalLabel = additionalLabel || field.uniforms?.additionalLabel;
  const mask = field.uniforms.pattern;
  const maskChar = field.uniforms.mask || " ";
  const caseMode = field.uniforms.caseMode;
  const formatChars = field.uniforms.formatChars;

  /**
   * @param {Event} event
   * @returns {void}
   */
  const casedText = event => {
    const target = event.target;

    if (caseMode === "upperCase") {
      const p = target.selectionStart;

      target.value = target.value.toUpperCase();
      target.setSelectionRange(p, p);
    }
    if (caseMode === "lowerCase") {
      const p = target.selectionStart;

      target.value = target.value.toLowerCase();
      target.setSelectionRange(p, p);
    }
    onChange(target.value);
  };

  const patternFormatProps = field.uniforms || {};
  const inputElement = (
    <ReactInputMask
      mask={mask}
      maskChar={maskChar}
      formatChars={formatChars}
      onInput={event => {
        casedText(event);
      }}
      className={styles.patternInput}
      value={value}
      {...patternFormatProps}
    />
  );

  return (
    <Form.Item className={styles.patternField} required={required} label={label} {...props} >
      <div
        style={{ width: "100%" }}
        className={classnames(
          "ui",
          {
            disabled,
            error,
          },
          inputAdditionalLabel ? "right labeled input" : "input",
          validateStatus && styles.warningInput,
        )}>
        <div className={classnames("ant-form-item-control-input-content")}>
          <div
            className={classnames(
              `ant-picker ${
                error ? " ant-picker-status-error " : ""
              }ant-picker-has-feedback ` +
              `${styles.patternPicker}`,
            )}>
            <div className={classnames("ant-picker-input")}>
              {inputElement}
              {inputAdditionalLabel && <Badge>{inputAdditionalLabel}</Badge>}
            </div>
          </div>
        </div>
      </div>
      {!!(error && showInlineError) && (
        <div
          className="ui red fluid basic pointing label"
          style={{ color: "#ff4d4f", fontSize: "14px" }}>
          {error.message}
        </div>
      )}
      {help && (
        <>
          <p className={styles.helpText}>{help}</p>
        </>
      )}
    </Form.Item>
  );
};

const InputField = connectField(CustomInput);

export default InputField;
/* eslint-enable no-unused-vars, no-param-reassign -- Возвращаем eslint no-unused-vars, no-param-reassign */
