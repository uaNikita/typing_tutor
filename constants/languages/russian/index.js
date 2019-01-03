import russian from './keyboards/russian';
import russianTypewriter from './keyboards/russianTypewriter';
import nouns from './nouns.json';
import syllables from './syllables.json';

export default {
  keyboards: [
    {
      name: 'russian',
      keys: russian,
    },
    {
      name: 'russianTypewriter',
      keys: russianTypewriter,
    },
  ],
  nouns,
  syllables,
};
