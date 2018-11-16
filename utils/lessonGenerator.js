import _ from 'lodash';

import keyboards from 'Constants/keyboards';
import syllables from 'Constants/syllables.json';

const getRandomWithPriority = obj => (
  _(obj)
    .map((v, k) => _.times(v, _.constant(parseInt(k, 10))))
    .flatten()
    .sample()
);

const getWord = (wordLenght, slbls) => {
  const sequence = [];
  let sum = 0;

  while (sum < wordLenght) {
    const remainder = wordLenght - sum;

    let length;

    if (remainder > 5) {
      length = getRandomWithPriority({
        2: 5,
        3: 3,
        4: 1,
      });
    }
    else if (remainder === 5) {
      length = getRandomWithPriority({
        2: 5,
        3: 3,
      });
    }
    else if (remainder === 4) {
      length = getRandomWithPriority({
        2: 5,
        4: 1,
      });
    }
    else if (remainder === 3) {
      length = 3;
    }
    else if (remainder === 2) {
      length = 2;
    }

    sequence.push(length);
    sum += length;
  }

  // todo: if syllables with current letters does not exist generate word with other logic
  return sequence
    .map(l => _.sample(slbls[l]).syllable)
    .join('');
};

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
    const filteredSyllables = _.cloneDeep(syllables[domain]);

    const regex = new RegExp(`^[${letters.join('')}]+$`);

    _.each(filteredSyllables, (v, k) => {
      filteredSyllables[k] = _(filteredSyllables[k])
        .map((q, s) => ({
          quantity: q,
          syllable: s,
        }))
        .filter(({ syllable }) => regex.test(syllable))
        .value();
    });

    while (lesson.length <= maxChars) {
      const { length } = lesson;

      let wordLength = _.random(minWordLength, maxLettersInWord);

      if (length + wordLength > maxChars) {
        wordLength = maxChars - length;

        if (wordLength < 3) {
          break;
        }
      }

      const word = getWord(wordLength, filteredSyllables);

      lesson += `${word} `;
    }

    lesson = lesson.slice(0, -1);

    return lesson;
  };
})();
