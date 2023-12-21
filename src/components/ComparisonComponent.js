import { useState, useEffect } from 'react';
import { connectField } from 'uniforms';
import { getCursorPosition, genDynHTML } from '../libs/dynamicInput';
import IconError from '../styles/IconError';
import DynamicInput from './DynamicInput';
import { Form } from 'antd';

const Comparison = ({ value = '', valueToCompare, onChange, caseMode, ...props }) => {
  const { error } = { ...props };
  const [newValue, setNewValue] = useState(value);
  const [dataValue, setDataValue] = useState(value ? genDynHTML(value, valueToCompare) : {});
  const [errorCompare, setErrorCompare] = useState(dataValue.error);
  const idDivInput = valueToCompare + '-div';
  const [cursorPos, setCursorPos] = useState(value?.length || 0);

  useEffect(() => {
    const inputDiv = document.getElementById(idDivInput);
    inputDiv.addEventListener(
      'input',
      function (e) {
        let text = e.target.innerText;
        if (caseMode === 'upperCase') {
          text = text.toUpperCase();
        }
        if (caseMode === 'lowerCase') {
          text = text.toLowerCase();
        }

        if (props?.maxLength === text.length || props?.maxlength === text.length) {
          return;
        }

        if (text.trim() === '') {
          setNewValue(undefined);
          setDataValue({ newHTML: '' });
          setErrorCompare(true);

          return;
        }

        const pos = getCursorPosition(inputDiv);
        const { newHTML, newValue, newLength, error } = genDynHTML(text, valueToCompare);

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
      <Form.Item {...props}>
        <div
          role="row"
          className="ant-row ant-form-item ant-form-item-with-help ant-form-item-has-feedback ant-form-item-has-error">
          <div role="cell" className="ant-col ant-form-item-control">
            <div className="ant-form-item-control-input">
              <div className="ant-form-item-control-input-content" style={{ position: 'relative', height: '100%' }}>
                <DynamicInput id={idDivInput} cursor={cursorPos} value={dataValue.newHTML} caseMode={caseMode} onChange={onChange} />
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
            {!!newValue && errorCompare && (
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
                    Возможно допущена ошибка
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
        </div>
      </Form.Item>
    </>
  );
};

const ComparisonComponent = connectField(Comparison);
export default ComparisonComponent;
