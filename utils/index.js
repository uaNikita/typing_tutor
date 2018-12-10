import Immutable from 'immutable';
import _ from 'lodash';

import tempCookie from './tempCookie';
import tempLocalStorage from './tempLocalStorage';
import generateLesson from './generateLesson';

export {
  tempCookie,
  tempLocalStorage,
  generateLesson,
};

export const getIdsFromCharacter = (keys, сharacter) => {
  const charsToType = [];

  keys.forEach((obj) => {
    if (obj.key === сharacter) {
      charsToType.push(obj.id);
    }
    else if (obj.shiftKey === сharacter) {
      charsToType.push(obj.id);

      if (obj.hand === 'left') {
        charsToType.push('Right Shift');
      }
      else if (obj.hand === 'right') {
        charsToType.push('Left Shift');
      }
    }
  });

  return charsToType;
};

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

export const normalizeString = string => (
  string.replace(/\r/g, '\n')
);

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
    ['syllable', 'free', 'options', 'letters'],
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
    .replace(/ /g, '<span class="space">&middot;</span><span class="separator"></span>')
    .replace(/\n/g, '<span class="enter">↵</span><br />')
);

export const convertTextToHtml = string => (
  string
    .replace(/\n/g, '<br />')
);
