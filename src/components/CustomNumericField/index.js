import classnames from 'classnames';
import { useRef, useState } from 'react';
import { Badge, Form } from 'antd';
import { connectField } from 'uniforms';
import { NumericFormat } from 'react-number-format';
import styles from './index.module.scss';

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
  onInput
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const inputRef = useRef();

  if (onCheckbox) {
    value = '';
  }
  const handleOnValueChange = (value) => {
    setInputValue(value);
    onChange(value);
    onAfterChange && onAfterChange(value);
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
      type={field.uniforms?.type || 'text'}
      value={value ?? ''}
      allowEmptyFormatting={false}
      className={styles.patternInput}
      onInput={onInput}
      onValueChange={(values) => {
        let value = field.type === 'string' ? values.value : values.floatValue;

        handleOnValueChange(value);
      }}
      {...numericFormatProps}
    />
  );
  return (
    <Form.Item className={styles.patternField} required={required} label={label}>
      <div
        className={classnames(
          'ui',
          {
            disabled,
            error
          },
          inputAdditionalLabel ? 'right labeled input' : 'input',
          validateStatus && styles.warningInput
        )}>
        <div className={classnames('ant-form-item-control-input-content')}>
          <div
            className={classnames(
              'ant-picker ' +
                (error ? ' ant-picker-status-error ' : '') +
                'ant-picker-has-feedback ' +
                `${styles.patternPicker}`
            )}>
            <div className={classnames('ant-picker-input')}>
              {inputElement}
              {inputAdditionalLabel && <Badge>{inputAdditionalLabel}</Badge>}
            </div>
          </div>
        </div>
      </div>
      {!!(error && showInlineError) && (
        <div
          className="ui red fluid basic pointing label"
          style={{ color: '#ff4d4f', fontSize: '14px' }}>
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
