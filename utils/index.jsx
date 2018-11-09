import Immutable from 'immutable';
import _ from 'lodash';

import tempCookie from 'Utils/tempCookie';
import tempLocalStorage from 'Utils/tempLocalStorage';

export {
  tempCookie,
  tempLocalStorage,
};

export const getIdsFromCharacter = (keys, сharacter) => {
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
};

export const sliceChar = (chars, idChars) => {
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
};

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

export const getFingersSet = (keys) => {
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
};

export const normalizeString = (string) => {
  let result = encodeURIComponent(string);

  result = result.replace(/%0D/g, '%0A');

  return decodeURIComponent(result);
};

export const closestEl = (el, selector) => {
  let closest = el;

  // traverse parents
  while (closest) {
    if (closest && closest.matches(selector)) {
      break;
    }

    closest = closest.parentElement;
  }

  return closest;
};


const defaultKeysType = {
  row: 'middle',
  type: 'letter',
};

export const getDefaultFingersSetSize = keys => (
  _(keys)
    .filter(defaultKeysType)
    .map(o => ({
      finger: o.finger,
      hand: o.hand,
    }))
    .uniqWith(_.isEqual)
    .value()
    .length
);

export const getDefaultFreeLetters = keys => (
  _(keys)
    .filter(defaultKeysType)
    .map(obj => obj.key)
    .value()
);

export const convertListsToSets = (() => {
  const setsPath = [
    ['main', 'pressedKeys'],
    ['main', 'pressedWrongKeys'],
    ['learning', 'free', 'options', 'letters'],
  ];

  return stateToConvert => (
    setsPath.reduce(
      (state, path) => (
        state.setIn(path, Immutable.Set(state.getIn(path)))
      ),
      stateToConvert,
    )
  );
})();

export const getHiddenCharacters = string => (
  string
    .split('')
    .map((char) => {
      let transformedChar = char;

      switch (char) {
        // space
        case ' ':
          transformedChar = '<span class="space">&middot;</span><span class="separator"></span>';

          break;

        // enter
        case '\n':
          transformedChar = '<span class="enter">↵</span><br />';

          break;

        default:
      }

      return transformedChar;
    })
);

export const convertTextToHtml = string => (
  string
    .replace(/\n/g, '<br />')
);
