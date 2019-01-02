const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const fetch = require('isomorphic-fetch');

// const requestFinishDate = 10 * 60 * 1000 + Date.now(); // 10 min from now
const requestFinishDate = 5 * 1000 + Date.now();
const requestDelay = 1 * 500; // 5 sec

// todo: create parser for words also

const languages = [
  {
    language: 'english',
    subdomain: 'en',
    regex: /^[a-z]$/,
  },
  {
    language: 'russian',
    subdomain: 'ru',
    regex: /^[ёа-я]$/,
  },
];

languages.forEach(language => {
  language.requestedURLs = [];

  language.syllables = {
    2: {},
    3: {},
    4: {},
  };
});

const repeatIfNeeded = (func) => {
  let result = false;

  if ((Date.now() + requestDelay) <= requestFinishDate) {
    setTimeout(func, requestDelay);

    result = true;
  }

  return result;
};

const get = () => (
  Promise
    .all(languages.map(({ subdomain }) => (
      fetch(`https://${subdomain}.wikipedia.org/wiki/Special:Random`)
    )))
    .then(responses => (
      Promise.all(responses.map((response, i) => {
        if (response.ok) {
          if (languages[i].requestedURLs.includes(response.url)) {
            throw new Error('URL already was requested');
          }

          console.log(`url - '${response.url}'`); // eslint-disable-line no-console

          languages[i].requestedURLs.push(response.url);

          return response.text();
        }

        throw new Error('Bad response from server');
      }))
    ))
    .then((htmls) => {
      htmls.forEach((html, idx) => {
        const $ = cheerio.load(html);
        const characters = $('#mw-content-text p').text().split('');
        const language = languages[idx];

        const saveSyllable = (index, lenght) => {
          const letters = characters.slice(index, index + lenght);

          if (
            letters.length === lenght
            && letters.every(c => language.regex.test(c))
          ) {
            const data = language.syllables[lenght];
            const key = letters.join('');

            if (data[key]) {
              data[key] += 1;
            }
            else {
              data[key] = 1;
            }
          }
        };

        characters.forEach((character, i) => (
          [2, 3, 4].forEach(current => saveSyllable(i, current))
        ));
      });

      console.log('parsed'); // eslint-disable-line no-console

      if (!repeatIfNeeded(get)) {

        console.log('Results are saved:'); // eslint-disable-line no-console

        languages.forEach(({ syllables, language }, i) => {
          // pick only if sylables is met more then 2 times
          _.each(syllables, (obj, l) => {
            syllables[l] = _.pickBy(obj, s => s > 2);
          });

          const pathToJSON = path.join(`constants/languages/${language}/syllables.json`);

          fs.writeFileSync(pathToJSON, JSON.stringify(syllables), 'utf8');

          console.log(`${i + 1}. for '${language}' in '${pathToJSON}'`); // eslint-disable-line no-console
        });
      }
    })
    .catch((error) => {
      console.error(error.message); // eslint-disable-line no-console

      repeatIfNeeded(get);
    })
);

get();
