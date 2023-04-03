import { useState, useEffect } from 'react';
import { TextField } from 'uniforms-antd';
import { connectField } from 'uniforms';
import { getCursorPosition, setCursorPosition, genDynHTML } from '../libs/comparisonFunctions';

const Comparison = ({ valueToCompare, maxLength, ...props }) => {
  const { label } = { ...props };
  const [newValue, setNewValue] = useState();

  let divId = 'testId'; // fixme

  useEffect(() => {
    const inputDiv = document.getElementById(divId);
    inputDiv.addEventListener(
      'input',
      function (e) {
        const text = e.target.innerText;
        if (text.trim() === '') return (e.target.innerHTML = '');

        // rules
        if (maxLength && text.length > maxLength) {
          const { newHTML, newLength } = genDynHTML(text.substr(0, maxLength), valueToCompare);
          e.target.innerHTML = newHTML;
          return setCursorPosition(inputDiv, newLength);
        }

        const pos = getCursorPosition(inputDiv);
        const { newHTML, newValue, newLength } = genDynHTML(text, valueToCompare);
        e.target.innerHTML = newHTML;
        setCursorPosition(inputDiv, pos === newLength ? newLength : pos);

        setNewValue(newValue);

        inputDiv.focus();
      },
      false
    );
  }, []);

  // fixme css style
  return (
    <div className="ant-row ant-form-item">
      <div className="ant-col ant-form-item-label">
        <label>{label}</label>
      </div>
      <div className="ant-col ant-form-item-control">
        <div className="ant-form-item-control-input">
          <div contentEditable="true" className="ant-input" id={divId}></div>
        </div>
      </div>

      <TextField {...props} name="" hidden label={false} value={newValue} />
    </div>
  );
};

const ComparisonComponent = connectField(Comparison);
export default ComparisonComponent;

{
  /* <div>
      <div className="ant-col ant-form-item-label">Название</div>
      <div contentEditable="true" className="ant-input" id={divId}></div>
      <TextField value={newValue} {...props} name="" />
    </div> */
}
