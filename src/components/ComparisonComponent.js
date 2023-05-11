import { useState, useEffect } from 'react';
import { TextField } from 'uniforms-antd';
import { connectField } from 'uniforms';
import { getCursorPosition, genDynHTML } from '../libs/dynamicInput';
import IconError from '../styles/IconError';
import DynamicInput from './DynamicInput';

const Comparison = ({ value = '', valueToCompare, getValue, ...props }) => {
  const { id, label, error } = { ...props };
  const [newValue, setNewValue] = useState(value);
  const [dataValue, setDataValue] = useState(value ? genDynHTML(value, valueToCompare) : '');
  const [errorCompare, setErrorCompare] = useState(dataValue.error);
  const idDivInput = valueToCompare + '-div';
  const [cursorPos, setCursorPos] = useState(0);

  useEffect(() => {
    const inputDiv = document.getElementById(idDivInput);
    inputDiv.addEventListener(
      'input',
      function (e) {
        const text = e.target.innerText;

        if (text.trim() === '') {
          setNewValue('');
          getValue('');
          setErrorCompare(true);

          return (e.target.innerHTML = '');
        }

        if (text.length > valueToCompare.length) {
          const pos = getCursorPosition(inputDiv);
          const { newHTML, newValue, newLength, error } = genDynHTML(
            text.substr(0, valueToCompare.length),
            valueToCompare
          );

          getValue(newValue);
          setDataValue({ newHTML, error });
          setCursorPos(pos > newLength ? newLength : pos);
          setErrorCompare(error);
          return;
        }

        const pos = getCursorPosition(inputDiv);
        const { newHTML, newValue, newLength, error } = genDynHTML(text, valueToCompare);

        getValue(newValue);
        setDataValue({ newHTML, error });
        setCursorPos(pos > newLength ? newLength : pos);
        setNewValue(newValue);
        setErrorCompare(error);
      },
      false
    );
  }, []);

  return (
    <>
      <div
        role="row"
        className="ant-row ant-form-item ant-form-item-with-help ant-form-item-has-feedback ant-form-item-has-error">
        <div role="cell" className="ant-col ant-form-item-label">
          <label htmlFor={id}>
            <span>{label}</span>
          </label>
        </div>
        <div role="cell" className="ant-col ant-form-item-control">
          <div className="ant-form-item-control-input">
            <div className="ant-form-item-control-input-content" style={{ position: 'relative' }}>
              <DynamicInput id={idDivInput} cursor={cursorPos} value={dataValue.newHTML} />
              {error && (
                <span
                  className="ant-input-suffix"
                  style={{ position: 'absolute', right: '12px', top: '5px' }}>
                  <span className="ant-form-item-feedback-icon ant-form-item-feedback-icon-error">
                    <span
                      role="img"
                      aria-label="close-circle"
                      className="anticon anticon-close-circle">
                      <IconError />
                    </span>
                  </span>
                </span>
              )}
            </div>
          </div>
          {errorCompare && (
            <div className="ant-tooltip ant-tooltip-placement-bottomLeft " style={{ top: '30px' }}>
              <div className="ant-tooltip-content">
                <div className="ant-tooltip-arrow">
                  <span
                    className="ant-tooltip-arrow-content"
                    style={{ '--antd-arrow-background-color': 'white' }}></span>
                </div>
                <div
                  className="ant-tooltip-inner"
                  role="tooltip"
                  style={{ color: 'rgba(0, 0, 0, 0.85)', background: 'white' }}>
                  {valueToCompare}
                </div>
              </div>
            </div>
          )}
          <div className="ant-form-item-explain ant-form-item-explain-connected">
            {error && (
              <div role="alert" className="ant-form-item-explain-error">
                {error?.message || 'Ошибка'}
              </div>
            )}
          </div>
        </div>
        <TextField {...props} name="" value={newValue} hidden label={false} />
      </div>
    </>
  );
};

const ComparisonComponent = connectField(Comparison);
export default ComparisonComponent;
