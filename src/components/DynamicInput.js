import { setCursorPosition } from '../libs/dynamicInput';
import { useEffect } from 'react';

const DynamicInput = ({ id, cursor, value, onChange, caseMode, ...props }) => {
  let valueHTML = '';
  const casedText = (text) => {
    if (caseMode === 'upperCase') {
      return text.toUpperCase();
    }
    if (caseMode === 'lowerCase') {
      return text.toLowerCase();
    }
    return text;
  };

  if (value) {
    value.map((el) => {
      valueHTML += `<span style="display: inline-block;${el.style || ''}">${casedText(
        el.letter
      )}</span>`;
    });
  }

  useEffect(() => {
    const element = document.getElementById(id);
    element.innerHTML = valueHTML;
    setTimeout(() => setCursorPosition(element, cursor), 0);
  });

  return (
    <>
      <div
        contentEditable="true"
        suppressContentEditableWarning="true"
        dangerouslySetInnerHTML={{ __html: valueHTML }}
        className="ant-input"
        style={{ height: '100%' }}
        id={id}
        onInput={(e) => {
          onChange(e.currentTarget.textContent);
        }}
        {...props}></div>
    </>
  );
};

export default DynamicInput;
