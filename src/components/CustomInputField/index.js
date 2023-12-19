import classnames from 'classnames';
import { useRef, useState } from 'react';
import { Badge, Form } from 'antd';
import { connectField } from 'uniforms';
import ReactInputMask from 'react-input-mask';
import styles from './index.module.scss';

const CustomInput = ({
  label,
  additionalLabel,
  field,
  disabled,
  error,
  showInlineError,
  required,
  validateStatus,
  help,
  onCheckbox,
  ...props
}) => {
  const inputRef = useRef();
  const [value, setValue] = useState();

  const inputAdditionalLabel = additionalLabel || field.uniforms?.additionalLabel;
  const mask = field.uniforms.pattern;
  const maskChar = field.uniforms.mask || ' ';
  const caseMode = field.uniforms.caseMode;

  const casedText = (event) => {
    if (caseMode === 'upperCase') {
      let target = event.target;
      let p = target.selectionStart;
      target.value = target.value.toUpperCase();
      target.setSelectionRange(p, p);
    };
    if (caseMode === 'lowerCase') {
      let target = event.target;
      let p = target.selectionStart;
      target.value = target.value.toLowerCase();
      target.setSelectionRange(p, p);
    }
  };

  const patternFormatProps = field.uniforms || {};
  const inputElement = (
    <ReactInputMask
      mask={mask}
      maskChar={maskChar}
      onInput={(event) => {
        casedText(event);
      }}
      onChange={(event) => {
        setValue(event.target.value);
      }}
      value={value}
      {...patternFormatProps}
    />
  );
  return (
    <Form.Item className={styles.patternField} required={required} label={label} {...props} >
      <div
        style={{ width: '100%' }}
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
        </>
      )}
    </Form.Item>
  );
};

const InputField = connectField(CustomInput);
export default InputField;
