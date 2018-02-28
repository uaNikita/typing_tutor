const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const exp = {};

fs.readFile(path.resolve(__dirname, '../email-templates/registration.html'), 'utf8', (err, data) => {
  if (err) throw err;

  exp.registrationFn = _.template(data);
});

fs.readFile(path.resolve(__dirname, '../email-templates/restore-access.html'), 'utf8', (err, data) => {
  if (err) throw err;

  exp.restoreAccessFn = _.template(data);
});


fs.readFile(path.resolve(__dirname, '../email-templates/verify-email.html'), 'utf8', (err, data) => {
  if (err) throw err;

  exp.verifyEmailFn = _.template(data);
});

module.exports = exp;
