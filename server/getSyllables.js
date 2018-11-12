// todo: create service to get syllables frequency
const _ = require('lodash');
const cheerio = require('cheerio');

console.log('fetch');

fetch('https://en.wikipedia.org/wiki/Cost_of_electricity_by_source')
  .then(function (response) {
    if (response.ok) {
      return response.text();
    }

    throw new Error("Bad response from server");
  })
  .then(function (data) {
    const $ = cheerio.load(data);

    const characters = $('#mw-content-text p').text().split('');

    const syllables = [];

    characters.forEach((character, i) => {

      const nextCharacter = characters[i + 1];

      if (nextCharacter) {
        const syllable = (character + nextCharacter).toLowerCase();


        if (/^[a-z]{2}$/.test(syllable)) {
          const obj = _.find(syllables, { syllable });

          if (obj) {
            obj.count += 1;
          }
          else {
            syllables.push({
              syllable,
              count: 1,
            });
          }
        }
      }
    });

    console.log('syllables', syllables);
  });
