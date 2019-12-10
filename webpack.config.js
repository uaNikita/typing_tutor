const webpack = require('./webpack');

module.exports = (env, argv) => webpack(argv.mode);
