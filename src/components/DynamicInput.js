/* eslint-disable n/no-missing-import -- Отключаем eslint no-unused-vars и n/no-missing-import */
import { useEffect } from "react";

import { setCursorPosition } from "../libs/dynamicInput";

/**
 * @param {Object} root0
 * @param {string} root0.id
 * @param {number} root0.cursor
 * @param {Array} root0.value
 * @param {Function} root0.onChange
 * @param {string} root0.caseMode
 * @returns {JSX.Element}
 */
const DynamicInput = ({ id, cursor, value, onChange, caseMode, ...props }) => {
  let valueHTML = "";
  /**
   * @param {string} text
   * @returns {string}
   */
  const casedText = text => {
    if (caseMode === "upperCase") {
      return text.toUpperCase();
    }
    if (caseMode === "lowerCase") {
      return text.toLowerCase();
    }
    return text;
  };

  /* eslint-disable array-callback-return, no-undef -- Отключаем eslint array-callback-return и no-undef */
  if (value) {
    value.map(el => {
      valueHTML += `<span style="display: inline-block;${el.style || ""}">${casedText(
        el.letter,
      )}</span>`;
    });
  }

  useEffect(() => {
    const element = document.getElementById(id);

    element.innerHTML = valueHTML;
    setTimeout(() => setCursorPosition(element, cursor), 0);
  });
  /* eslint-enable array-callback-return, no-undef -- Возвращаем eslint array-callback-return и no-undef */

  return (
    <>
      <div
        contentEditable="true"
        suppressContentEditableWarning="true"
        dangerouslySetInnerHTML={{ __html: valueHTML }}
        className="ant-input"
        style={{ height: "100%" }}
        id={id}
        onInput={e => {
          const text = e.currentTarget.textContent;

          if (props?.maxLength < text.length || props?.maxlength < text.length) {
            e.preventDefault();
            return;
          }
          onChange(casedText(text));
        }}
        {...props}></div>
    </>
  );
};

export default DynamicInput;
/* eslint-enable n/no-missing-import -- Возвращаем eslint no-unused-vars и n/no-missing-import */
