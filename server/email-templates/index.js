const _ = require('lodash');
const fs = require('fs');
const path = require('path');

let verifyEmailFn;

fs.readFile(path.resolve(__dirname, '../email-templates/verify-email.html'), 'utf8', (err, data) => {
  if (err) throw err;

  verifyEmailFn = _.template(data)
});

module.exports = {
  verifyEmailFn,
};