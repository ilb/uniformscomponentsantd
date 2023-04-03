import { useState, useEffect } from 'react';
import { TextField } from 'uniforms-antd';
import { connectField } from 'uniforms';
import { getCursorPosition, setCursorPosition, genDynHTML } from '../libs/comparisonFunctions';

const Comparison = ({ value, valueToCompare, getValue, ...props }) => {
  const { id, label, error } = { ...props };
  const [newValue, setNewValue] = useState(value);
  const baseData = genDynHTML(value, valueToCompare);
  const [errorCompare, setErrorCompare] = useState(baseData.error);
  const idDiv = valueToCompare + '-div'; // fixme?

  useEffect(() => {
    const inputDiv = document.getElementById(idDiv);
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
          e.target.innerHTML = newHTML;
          getValue(newValue);
          setErrorCompare(error);
          return setCursorPosition(inputDiv, pos > newLength ? newLength : pos);
        }

        const pos = getCursorPosition(inputDiv);
        const { newHTML, newValue, newLength, error } = genDynHTML(text, valueToCompare);
        e.target.innerHTML = newHTML;

        getValue(newValue);
        setCursorPosition(inputDiv, pos === newLength ? newLength : pos);

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
              <div
                contentEditable="true"
                suppressContentEditableWarning="true"
                dangerouslySetInnerHTML={{ __html: baseData.newHTML }}
                className={
                  error
                    ? 'ant-input-affix-wrapper ant-input-affix-wrapper-status-error'
                    : 'ant-input'
                }
                id={idDiv}></div>
              {error && (
                <span
                  className="ant-input-suffix"
                  style={{ position: 'absolute', right: '12px', top: '5px' }}>
                  <span className="ant-form-item-feedback-icon ant-form-item-feedback-icon-error">
                    <span
                      role="img"
                      aria-label="close-circle"
                      className="anticon anticon-close-circle">
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="close-circle"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true">
                        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
                      </svg>
                    </span>
                  </span>
                </span>
              )}
            </div>
          </div>
          <div className="ant-form-item-explain ant-form-item-explain-connected">
            {(error || errorCompare) && (
              <div role="alert" className="ant-form-item-explain-error">
                {error?.message || valueToCompare || 'Ошибка'}
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
