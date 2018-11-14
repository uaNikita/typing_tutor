const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const fetch = require('isomorphic-fetch');

const requestFinishDate = 0.1 * 60 * 1000 + Date.now(); // 10 min from now
const requestDelay = 1 * 500; // 5 sec

const languages = [
  {
    subdomain: 'en',
    regex: '[a-z]',
  },
  {
    subdomain: 'ru',
    regex: '[ёа-я]',
  },
];
const requestedUrls = {};
const syllables = [];
_.each(languages, ({ subdomain }) => {
  requestedUrls[subdomain] = [];

  syllables.push({
    language: subdomain,
    data: {
      2: {},
      3: {},
      4: {},
    },
  });
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
          const requestedLanguageUrls = requestedUrls[languages[i].subdomain];

          if (requestedLanguageUrls.includes(response.url)) {
            throw new Error('URL already was requested');
          }

          console.log(`url - '${response.url}'`); // eslint-disable-line no-console

          requestedLanguageUrls.push(response.url);

          return response.text();
        }

        throw new Error('Bad response from server');
      }))
    ))
    .then((htmls) => {
      htmls.forEach((html, idx) => {
        const $ = cheerio.load(html);
        const characters = $('#mw-content-text p').text().split('');
        const { regex, subdomain } = languages[idx];

        const obj = _.find(syllables, {
          language: subdomain,
        });

        const saveSyllable = (index, lenght) => {
          const letters = characters.slice(index, index + lenght).join('');

          if (letters.length === lenght) {
            const data = obj.data[lenght];

            if (new RegExp(`^${regex}{${lenght}}$`).test(letters)) {
              if (data[letters]) {
                data[letters] += 1;
              }
              else {
                data[letters] = 1;
              }
            }
          }
        };

        characters.forEach((character, i) => (
          [2, 3, 4].forEach(current => saveSyllable(i, current))
        ));
      });

      console.log('parsed'); // eslint-disable-line no-console

      if (!repeatIfNeeded(get)) {
        const pathToJSON = path.join('constants/syllables.json');

        // todo: remove syllables with 1 iteration
        const syllablesJSON = syllables.reduce((a, b) => {
          const result = a;

          result[b.language] = b.data;

          return result;
        }, {});

        fs.writeFileSync(pathToJSON, JSON.stringify(syllablesJSON), 'utf8');

        console.log(`result is saved in '${pathToJSON}'`); // eslint-disable-line no-console
      }
    })
    .catch((error) => {
      console.error(error); // eslint-disable-line no-console

      repeatIfNeeded(get);
    })
);

get();
