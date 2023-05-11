export const getCursorPosition = (parent) => {
  let selection = document.getSelection();
  let range = new Range();
  range.setStart(parent, 0);
  range.setEnd(selection.anchorNode, selection.anchorOffset);
  return range.toString().length;
};

export const setCursorPosition = (parent, position) => {
  let child = parent.firstChild;
  while (position > 0) {
    if (child != null) {
      let length = child.textContent.length;
      if (position > length) {
        position -= length;
        child = child.nextSibling;
      } else {
        if (child.nodeType == 3) return document.getSelection().collapse(child, position);
        child = child.firstChild;
      }
    } else position -= 1;
  }
};

export const genDynHTML = (text, compareText) => {
  let letterArray = [];
  let error = false;

  for (let i = 0; i < compareText.length; i++) {
    if (text[i] && text[i] === compareText[i]) {
      letterArray.push({
        letter: text[i] || '',
        value: `<span style="display: inline-block">${text[i] || ''}</span>`
      });
    } else {
      letterArray.push({
        letter: text[i] || '',
        value: `<span style="color: red; display: inline-block">${text[i] || ''}</span>`
      });
      error = true;
    }
  }

  let newHTML = '';
  let newValue = '';

  letterArray.map((item) => ((newHTML += item.value), (newValue += item.letter)));

  return {
    newHTML,
    newValue,
    newLength: letterArray.length,
    error
  };
};
