import store from './../store';
import {find, forEach, filter, random, times, concat} from 'lodash';

export function getIdsFromCharacter(keys, сharacter) {
   let charsToType = [];

   keys.forEach(obj => {

      // check if it upper case letter
      if (obj.shiftKey === сharacter) {
         charsToType.push(obj.id);

         if (obj.hand === 'left') {
            charsToType.push('Right Shift');
         } else if (obj.hand === 'right') {
            charsToType.push('Left Shift');
         }

      } else if (obj.key === сharacter) {
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

export const generateLesson = (() => {
   let minWordLength = 3;
   let maxChars = 50;

   return (maxWordLength, letters) => {
      let lesson = '';
      let wordLength;

      while (lesson.length <= maxChars) {
         wordLength = random(minWordLength, maxWordLength);

         if (lesson.length + wordLength > maxChars) {
            wordLength = maxChars - lesson.length;

            if (wordLength < 3) {
               break;
            }
         }

         times(wordLength, function () {
            let idxLetter = random(0, letters.length - 1);

            lesson += letters[idxLetter];
         });

         lesson += ' ';

      }

      lesson = lesson.slice(0, -1)

      return lesson;
   }
})();

export function getFingersSet() {
   let state = store.getState();

   let keys = find(state.main.keyboards, {'name': state.main.keyboard}).keys;
   var fingers = ['index', 'middle', 'ring', 'pinky'];
   var rows = ['middle', 'top', 'bottom'];
   var hands = ['left', 'right'];

   let lettersSet = [];

   rows.forEach(row => {

      fingers.forEach(finger => {

         hands.forEach(hand => {

            let keysArr = filter(keys, {
               row   : row,
               finger: finger,
               hand  : hand,
               type  : 'letter'
            }).map(obj=> {
               return obj.key;
            });

            if (keysArr.length) {
               lettersSet.push(keysArr);
            }

         });

      });

   });

   return lettersSet;

}