const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const exp = {};

const getPathToTmpl = name => path.join(__dirname, '../email-templates', `${name}.html`);

fs.readFile(getPathToTmpl('registration'), 'utf8', (err, data) => {
  if (err) throw err;

  exp.registration = _.template(data);
});

fs.readFile(getPathToTmpl('restore-access'), 'utf8', (err, data) => {
  if (err) throw err;

  exp.restoreAccess = _.template(data);
});


fs.readFile(getPathToTmpl('verify-email'), 'utf8', (err, data) => {
  if (err) throw err;

  exp.verifyEmail = _.template(data);
});

module.exports = exp;
