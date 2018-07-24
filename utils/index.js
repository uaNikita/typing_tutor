import _ from 'lodash';

export function getIdsFromCharacter(keys, сharacter) {
  const charsToType = [];

  keys.forEach((obj) => {
    // check if it upper case letter
    if (obj.shiftKey === сharacter) {
      charsToType.push(obj.id);

      if (obj.hand === 'left') {
        charsToType.push('Right Shift');
      }
      else if (obj.hand === 'right') {
        charsToType.push('Left Shift');
      }
    }
    else if (obj.key === сharacter) {
      charsToType.push(obj.id);
    }
  });

  return charsToType;
}

export function sliceChar(chars, idChars) {
  let newChars = chars.slice();

  _.forEach(idChars, (id) => {
    const index = newChars.indexOf(id);

    if (index + 1) {
      newChars = [
        ...newChars.slice(0, index),
        ...newChars.slice(index + 1),
      ];
    }
  });

  return newChars;
}

export const generateLesson = (() => {
  const minWordLength = 3;
  const maxChars = 50;

  return (maxLettersInWord, letters) => {
    let lesson = '';

    if (maxLettersInWord && !_.isEmpty(letters)) {
      let wordLength;

      const addLetter = () => {
        lesson += letters[_.random(0, letters.length - 1)];
      };

      while (lesson.length <= maxChars) {
        wordLength = _.random(minWordLength, maxLettersInWord);

        if (lesson.length + wordLength > maxChars) {
          wordLength = maxChars - lesson.length;

          if (wordLength < 3) {
            break;
          }
        }

        _.times(wordLength, addLetter);

        lesson += ' ';
      }

      lesson = lesson.slice(0, -1);
    }

    return lesson;
  };
})();

export function getFingersSet(keys) {
  const fingers = ['index', 'middle', 'ring', 'pinky'];
  const rows = ['middle', 'top', 'bottom'];
  const hands = ['left', 'right'];

  const lettersSet = [];

  rows.forEach((row) => {
    fingers.forEach((finger) => {
      hands.forEach((hand) => {
        const keysArr = _.filter(keys, {
          row,
          finger,
          hand,
          type: 'letter',
        }).map(obj => obj.key);

        if (keysArr.length) {
          lettersSet.push(keysArr);
        }
      });
    });
  });

  return lettersSet;
}

export const normalizeString = (string) => {
  let result = encodeURIComponent(string);

  result = result.replace(/%0D/g, '%0A');

  return decodeURIComponent(result);
};
