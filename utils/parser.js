const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const fetch = require('isomorphic-fetch');

const requestFinishDate = 10 * 60 * 1000 + Date.now(); // 10 min from now
const requestDelay = 1 * 500; // 5 sec

// todo: create parser for words also

const languages = [
  {
    language: 'english',
    subdomain: 'en',
    regex: 'a-z',
  },
  {
    language: 'russian',
    subdomain: 'ru',
    regex: 'ёа-я',
  },
];

languages.forEach(language => {
  language.requestedURLs = [];

  language.syllables = {
    2: {},
    3: {},
    4: {},
  };

  language.nouns = {};
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
        const text = $('#mw-content-text p').text().toLowerCase();
        const characters = text.split('');
        const language = languages[idx];

        const saveSyllable = (index, lenght) => {
          const letters = characters.slice(index, index + lenght);

          if (
            letters.length === lenght
            && letters.every(c => new RegExp(`^[${language.regex}]$`).test(c))
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

        text
          .replace(new RegExp(`[^${language.regex} ]`, 'g'), '')
          .split(' ')
          .filter(w => w.length > 3)
          .forEach(w => {
            if (language.nouns[w]) {
              language.nouns[w] += 1;
            }
            else {
              language.nouns[w] = 1;
            }
          });

        characters.forEach((character, i) => (
          [2, 3, 4].forEach(current => saveSyllable(i, current))
        ));
      });

      console.log('parsed'); // eslint-disable-line no-console

      if (!repeatIfNeeded(get)) {
        console.log('Results are saved for languages:'); // eslint-disable-line no-console

        languages.forEach((o, i) => {
          const pathToLanguage = path.join(`constants/languages/${o.language}`);

          // pick only if noun is met more then 3 times
          o.nouns = _.pickBy(o.nouns, s => s > 3);
          fs.writeFileSync(
            path.join(`${pathToLanguage}/nouns.json`),
            JSON.stringify(o.nouns), 'utf8'
          );

          // pick only if sylables is met more then 2 times
          _.each(o.syllables, (obj, l) => o.syllables[l] = _.pickBy(obj, s => s > 2));
          fs.writeFileSync(
            path.join(`${pathToLanguage}/syllables.json`),
            JSON.stringify(o.syllables), 'utf8'
          );

          console.log(`${i + 1}. ${o.language}`); // eslint-disable-line no-console
        });
      }
    })
    .catch((error) => {
      console.error(error.message); // eslint-disable-line no-console

      repeatIfNeeded(get);
    })
);

get();
