const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const { root, restCssLoaders } = require('./utils');

module.exports = {
  entry: path.join(root, 'server', 'entry.jsx'),

  output: {
    path: path.join(root, 'dist'),
    filename: 'compiledServer.js',
    libraryTarget: 'umd',
  },

  plugins: [
    new webpack.DefinePlugin({
      BROWSER: false,
    }),
  ],

  target: 'node',

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /^((?!module).)+styl$/,
        use: 'null-loader',
      },
      {
        test: /module\.styl$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportOnlyLocals: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
            },
          },
          ...restCssLoaders,
        ],
      },
      {
        test: /\.(css|woff|woff2|ttf|eot|jpg|png|svg)$/,
        use: 'null-loader',
      },
    ],
  },
};
