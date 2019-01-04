import _ from 'lodash';

import { languages, keyboards } from 'Constants/languages';

const getRandomWithPriority = obj => (
  _(obj)
    .map((v, k) => _.times(v, _.constant(parseInt(k, 10))))
    .flatten()
    .sample()
);

const generateSyllableFromLetters = (length, letters) => (
  _.times(length, () => _.sample(letters)).join('')
);

const getAvailableSyllable = (filteredSyllables, length) => {
  const available = filteredSyllables[length].filter(o => !o.used);
  let generatedSyllable = false;

  if (available.length) {
    const o = _.sample(available);
    o.used = true;
    generatedSyllable = o.syllable;
  }

  return generatedSyllable;
};

const getWord = (options) => {
  const {
    wordLength,
    syllables: filteredSyllables,
    letters,
  } = options;

  const sequence = [];
  let sum = 0;

  while (sum < wordLength) {
    const remainder = wordLength - sum;

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

  return sequence
    .map((l) => {
      let generatedSyllable = getAvailableSyllable(filteredSyllables, l);

      if (!generatedSyllable) {
        if (l === 4) {
          const syllableLength = 2;

          generatedSyllable = _
            .times(2, () => (
              getAvailableSyllable(filteredSyllables, syllableLength)
              || generateSyllableFromLetters(syllableLength, letters)
            ))
            .join('');
        }
        else {
          generatedSyllable = generateSyllableFromLetters(l, letters);
        }
      }

      return generatedSyllable;
    })
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

    const { language } = _.find(keyboards, { name: keyboard });
    const { syllables } = _.find(languages, { name: language });

    const filteredSyllables = _.cloneDeep(syllables);

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

      const word = getWord({
        wordLength,
        syllables: filteredSyllables,
        letters,
      });

      lesson += `${word} `;
    }

    lesson = lesson.slice(0, -1);

    return lesson;
  };
})();
