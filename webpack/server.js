const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(__dirname, 'server', 'entry.jsx'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'compiledServer.js',
    libraryTarget: 'umd'
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
        exclude: /node_modules/
      },
      {
        test: /^((?!module).)+styl$/,
        use: 'null-loader'
      },
      {
        test: /module\.styl$/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer(),
              ]
            },
          },
          'stylus-loader',
        ]
      },
      {
        test: /\.(css|woff|woff2|ttf|eot|jpg|png|svg)$/,
        use: 'null-loader'
      },
    ]
  }
};
