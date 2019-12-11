const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const fetch = require('isomorphic-fetch');

const requestFinishDate = 10 * 60 * 1000 + Date.now(); // 10 min from now
const requestDelay = 1 * 500; // 5 sec

const languages = [
  {
    subdomain: 'en',
    regex: /^[a-z]$/,
  },
  {
    subdomain: 'ru',
    regex: /^[ёа-я]$/,
  },
];
const requestedUrls = {};
const syllables = {};
_.each(languages, ({ subdomain }) => {
  requestedUrls[subdomain] = [];

  syllables[subdomain] = {
    2: {},
    3: {},
    4: {},
  };
});

const repeatIfNeeded = func => {
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
    .then(htmls => {
      htmls.forEach((html, idx) => {
        const $ = cheerio.load(html);
        const characters = $('#mw-content-text p').text().split('');
        const { regex, subdomain } = languages[idx];

        const saveSyllable = (index, lenght) => {
          const letters = characters.slice(index, index + lenght);

          if (
            letters.length === lenght
            && letters.every(c => regex.test(c))
          ) {
            const data = syllables[subdomain][lenght];
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
        const pathToJSON = path.join('constants/syllables.json');

        // pick only if sylables is met more then 2 times
        _.each(syllables, domain => {
          _.each(domain, (obj, l) => {
            const domainRef = domain;

            domainRef[l] = _.pickBy(obj, s => s > 2);
          });
        });

        fs.writeFileSync(pathToJSON, JSON.stringify(syllables), 'utf8');

        console.log(`result is saved in '${pathToJSON}'`); // eslint-disable-line no-console
      }
    })
    .catch(error => {
      console.error(error.message); // eslint-disable-line no-console

      repeatIfNeeded(get);
    })
);

get();
