const _ = require('lodash');

const common = require('./common');
const client = require('./client');
const server = require('./server');
const watch = require('./watch');

module.exports = mode => {
  const clientConfig = [{}, common, client];
  const serverConfig = [{}, common, server];

  if (mode === 'development') {
    clientConfig.push(watch);
    serverConfig.push(watch);
  }

  return [
    _.merge(...clientConfig),
    _.merge(...serverConfig),
  ];
};
