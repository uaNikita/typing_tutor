import {forEach} from 'lodash';

export function getIdsFromChar(keys, char) {
  let charsToType = [];

  keys.forEach(obj => {

    // check if it upper case letter
    if (obj.shiftKey === char) {
      charsToType.push(obj.id);

      if (obj.hand === 'left') {
        charsToType.push('Right Shift');
      } else if (obj.hand === 'right') {
        charsToType.push('Left Shift');
      }

    } else if (obj.key === char) {
      charsToType.push(obj.id)
    }

  });

  return charsToType;
}

export function sliceChar(chars, idChars) {
  let newChars = chars.slice();

  forEach(idChars, id => {
    let index = newChars.indexOf(id);

    if (index + 1) {
      newChars = [
        ...newChars.slice(0, index),
        ...newChars.slice(index + 1)
      ]
    }

  });

  return newChars;
}