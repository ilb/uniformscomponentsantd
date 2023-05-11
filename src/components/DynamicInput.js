import { setCursorPosition } from '../libs/dynamicInput';

const DynamicInput = ({ id, cursor, value, ...props }) => {
  if (typeof window !== 'undefined') {
    const element = document.getElementById(id);
    element.innerHTML = value;
    setTimeout(() => setCursorPosition(element, cursor), 0);
  }

  return (
    <>
      <div
        contentEditable="true"
        suppressContentEditableWarning="true"
        dangerouslySetInnerHTML={{ __html: value }}
        className="ant-input"
        id={id}
        {...props}></div>
    </>
  );
};

export default DynamicInput;
