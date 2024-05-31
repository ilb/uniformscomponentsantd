/* eslint-disable no-undef, consistent-return, no-param-reassign -- Отключаем eslint no-undef, consistent-return, no-param-reassign */
/**
 * @param {HTMLElement} parent
 * @returns {number} - Cursor position
 */
export const getCursorPosition = parent => {
  const selection = document.getSelection();
  const range = new Range();

  range.setStart(parent, 0);
  range.setEnd(selection.anchorNode, selection.anchorOffset);
  return range.toString().length;
};

/**
 * @param {HTMLElement} parent
 * @param {number} position
 * @returns {void}
 */
export const setCursorPosition = (parent, position) => {
  let child = parent.firstChild;

  while (position > 0) {
    if (child !== null) {
      const length = child.textContent.length;

      if (position > length) {
        position -= length;
        child = child.nextSibling;
      } else {
        if (child.nodeType === 3) {
          return document.getSelection().collapse(child, position);
        }
        child = child.firstChild;
      }
    } else {
      position -= 1;
    }
  }
};


/**
 * @param {string} text
 * @param {string} compareText
 * @returns {Object} - Object with newHTML, newValue, newLength, error
 */
export const genDynHTML = (text, compareText) => {
  const letterArray = [];
  let error = false;

  for (let i = 0; i < text.length; i++) {
    if (text[i] && text[i] === compareText[i]) {
      letterArray.push({
        letter: text[i] || "",
      });
    } else {
      letterArray.push({
        letter: text[i] || "",
        style: "color: orange;font-weight: bold",
      });
      error = true;
    }
  }
  let newValue = "";

  letterArray.map(item => (newValue += item.letter));

  return {
    newHTML: letterArray,
    newValue,
    newLength: letterArray.length,
    error,
  };
};
/* eslint-enable no-undef, consistent-return, no-param-reassign -- Возвращаем eslint no-undef, consistent-return, no-param-reassign */
