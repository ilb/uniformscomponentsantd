/* eslint-disable no-unused-vars, no-param-reassign -- Отключаем eslint no-unused-vars, no-param-reassign */
import { Badge, Form } from "antd";
import classnames from "classnames";
import { useRef } from "react";
import { NumericFormat } from "react-number-format";
import { connectField } from "uniforms";

import styles from "./index.module.scss";

/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} props.additionalLabel
 * @param {string} props.value
 * @param {Function} props.onChange
 * @param {Object} props.field
 * @param {boolean} props.disabled
 * @param {Object} props.error
 * @param {boolean} props.showInlineError
 * @param {boolean} props.required
 * @param {boolean} props.readOnly
 * @param {Function} props.onAfterChange
 * @param {Function} props.onBlur
 * @param {string} props.validateStatus
 * @param {string} props.help
 * @param {Function} props.onCheckbox
 * @param {Function} props.onInput
 * @param {string} props.className
 * @returns {JSX.Element}
 */
const CustomInput = ({
  label,
  additionalLabel,
  value,
  onChange,
  field,
  disabled,
  error,
  showInlineError,
  required,
  readOnly,
  onAfterChange,
  onBlur,
  validateStatus,
  help,
  onCheckbox,
  onInput,
  className,
}) => {
  const inputRef = useRef();

  if (onCheckbox) {
    value = "";
  }
  /**
   * @param {string} newValue
   * @returns {void}
   */
  const handleOnValueChange = newValue => {
    onChange(newValue);
    if (onAfterChange) {
      onAfterChange(newValue);
    }
  };

  /**
   * Обработчик события вставки текста. Если вставленный текст содержит запятую,
   * то он ее заменяет на точку.
   *
   * @param {Event} event - событие вставки
   * @returns {void}
   */
  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');
    const modifiedData = pastedData.replace(',', '.');

    handleOnValueChange(modifiedData);
  };

  const inputAdditionalLabel = additionalLabel || field.uniforms?.additionalLabel;

  const numericFormatProps = field.uniforms || {};
  const inputElement = (
    <NumericFormat
      disabled={disabled}
      onBlur={onBlur}
      minLength={field.minLength || -Infinity}
      maxLength={field.maxLength || Infinity}
      ref={inputRef}
      readOnly={readOnly}
      required={required}
      type={field.uniforms?.type || "text"}
      value={value ?? ""}
      allowEmptyFormatting={false}
      className={className ? className : styles.patternInput}
      onInput={onInput}
      onPaste={handlePaste}
      onValueChange={values => {
        const newValue = field.type === "string" ? values.value : values.floatValue;

        handleOnValueChange(newValue);
      }}
      {...numericFormatProps}
    />
  );

  return (
    <Form.Item className={styles.patternField} required={required} label={label}>
      <div
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
          {/* <span className={styles.warningIcon}>{getWarningIcon()}</span> */}
        </>
      )}
    </Form.Item>
  );
};

const InputField = connectField(CustomInput);

export default InputField;
/* eslint-enable no-unused-vars, no-param-reassign -- Возвращаем eslint no-unused-vars, no-param-reassign */
