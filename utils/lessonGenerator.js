import _ from 'lodash';

import keyboards from 'Constants/keyboards';
import syllables from 'Constants/syllables.json';

const getRandomWithPriority = obj => (
  _(obj)
    .map((v, k) => _.times(v, _.constant(parseInt(k, 10))))
    .flatten()
    .sample()
);

const getSyllablesLenght = (wordLength) => {
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

  return sequence;
};

const getSyllables = (options) => {
  const {
    syllablesLenght,
    domain,
    letters,
  } = options;

  const s = syllables[domain];

  console.log('s', s);
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
    const filteredSyllables = syllables[domain];

    console.log('letters', letters);
    
    _.each(filteredSyllables, (v,k)=>{
      filteredSyllables[k] = _.pickBy(v, s => s > 3000)
    });

    console.log(filteredSyllables);

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

      const syllablesLenght = getSyllablesLenght(wordLength);
      
      // const syllables = getSyllables({
      //   syllablesLenght,
      //   domain,
      //   letters,
      // });

      // console.log('syllables', wordLength, syllablesLenght);

      _.times(wordLength, addLetter);
    }

    lesson = lesson.slice(0, -1);

    return lesson;
  };
})();
