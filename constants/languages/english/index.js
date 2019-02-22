import english from './keyboards/english';
import nouns from './nouns.json';
import syllables from './syllables.json';
import racesTexts from './racesTexts.json';

export default {
  keyboards: [
    {
      name: 'english',
      keys: english,
    },
  ],
  nouns,
  syllables,
  racesTexts,
};
