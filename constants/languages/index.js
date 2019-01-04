import _ from 'lodash';

import english from './english/index';
import russian from './russian/index';

export const languages = [
  {
    name: 'english',
    ..._.pick(english, ['nouns', 'syllables']),
  },
  {
    name: 'russian',
    ..._.pick(russian, ['nouns', 'syllables']),
  },
];

export const keyboards = [
  ...english.keyboards.map(o => ({
    ...o,
    language: 'english',
  })),
  ...russian.keyboards.map(o => ({
    ...o,
    language: 'russian',
  })),
];


export default {
  languages,
  keyboards,
};
