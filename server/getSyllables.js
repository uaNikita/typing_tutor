const _ = require('lodash');
const fs = require('fs');
const cheerio = require('cheerio');
const fetch = require('isomorphic-fetch');

const requestFinishDate = 10 * 60 * 1000 + Date.now(); // 10 min from now
const requestDelay = 1 * 1000; // 5 sec
const requestedUrls = [];
const syllables = [];

console.time('duration');

const get = () =>
  fetch('https://en.wikipedia.org/wiki/Special:Random')
    .then(function(response) {
      if (response.ok) {
        if (requestedUrls.includes(response.url)) {
          get();

          throw new Error('URL already was requested');
        }
        else {
          console.log(`url - \'${response.url}\'`);

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
      
      console.log('parsed');

      if ((Date.now() + requestDelay) <= requestFinishDate) {
        setTimeout(get, requestDelay);
      }
      else {
        fs.writeFile('constants/syllables.json', JSON.stringify(syllables), 'utf8');
        
        console.log('result is saved in \'constants/myjsonfile.json\'');
      }
    });

get();
