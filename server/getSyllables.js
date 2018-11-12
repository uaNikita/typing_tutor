// todo: create service to get syllables frequency
const _ = require('lodash');
const cheerio = require('cheerio');
const fetch = require('isomorphic-fetch');

const requestFinishDate = 10 * 60 * 1000 + Date.now(); // 5 min from now
const requestDelay = 2 * 1000; // 5 sec
const requestedUrls = [];
const syllables = [];

console.time('duration');

const get = () =>
  fetch('https://en.wikipedia.org/wiki/Special:Random')
    .then(function (response) {
      if (response.ok) {
        console.log(`url - \'${response.url}\'`);

        if (requestedUrls.includes(response.url)) {
          return get();
        }
        else {
          requestedUrls.push(response.url);

          return response.text();
        }
      }

      throw new Error('Bad response from server');
    })
    .then(data => {
      const $ = cheerio.load(data);
      const characters = $('#mw-content-text p').text().split('');

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

      console.log(syllables);
      console.log('-----------------------------------------');

      if ((Date.now() + requestDelay) <= requestFinishDate) {
        setTimeout(get, requestDelay);
      }
      else {
        console.timeEnd('duration');
        // todo: save to js file
      }

      // console.log('syllables', syllables);
    });

get();
