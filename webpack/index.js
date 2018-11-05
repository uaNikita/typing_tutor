'use strict';

const common = require('./webpack/common');
const client = require('./webpack/client');
const server = require('./webpack/server');
const watch = require('./webpack/watch');

module.exports = mode => {
  const clientConfig = [common, client];
  const serverConfig = [common, server];

  if (mode === 'production') {
    clientConfig.push(watch);
    serverConfig.push(watch);
  }

  return [
    _.merge(...clientConfig),
    _.merge(...serverConfig),
  ];
};
