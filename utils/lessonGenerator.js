import _ from 'lodash';

import keyboards from 'Constants/keyboards';

export default (() => {
  const minWordLength = 3;
  const maxChars = 50;

  return (options) => {
    const {
      keyboard,
      maxLettersInWord,
      letters,
    } = options;

    let lesson = '';

    const { domain } = _.find(keyboards, { name: keyboard });
    console.log(domain);

    const lastIndex = letters.length - 1;
    const addLetter = () => {
      lesson += letters[_.random(0, lastIndex)];
    };

    while (lesson.length <= maxChars) {
      const { length } = lesson;

      let wordLength = _.random(minWordLength, maxLettersInWord);

      if (length + wordLength > maxChars) {
        wordLength = maxChars - length;

        if (wordLength < 3) {
          break;
        }
      }

      _.times(wordLength, addLetter);
    }

    lesson = lesson.slice(0, -1);

    return lesson;
  };
})();
