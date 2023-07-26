import { setCursorPosition } from '../libs/dynamicInput';
import { useEffect } from 'react';

const DynamicInput = ({ id, cursor, value, ...props }) => {
  let valueHTML = '';
  if (value) {
    value.map((el) => {
      valueHTML += `<span style="display: inline-block;${el.style}">${el.letter}</span>`;
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
        id={id}
        {...props}></div>
    </>
  );
};

export default DynamicInput;
