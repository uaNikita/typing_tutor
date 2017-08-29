'use strict';

var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var isProduction = process.env.WEBPACK_ENV === 'production' ? true : false;

let config = {
  context: path.join(__dirname),

  entry: path.join(__dirname, 'client', 'index.jsx'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: isProduction ? 'source-map' : 'eval',

  resolve: {
    alias: {
      ReduxUtils: path.resolve(__dirname, 'redux/'),
      Blocks: path.resolve(__dirname, 'blocks/'),
      Static: path.resolve(__dirname, 'static/'),
      Utils: path.resolve(__dirname, 'utils/'),
      Client: path.resolve(__dirname, 'client/'),
      Server: path.resolve(__dirname, 'server/'),
    }
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      BROWSER: true,
    }),
    isProduction ? () => {} : new OpenBrowserPlugin({ url: 'http://localhost:5550' }),
    isProduction ? new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }) : () => {},
    isProduction ? new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }) : () => {},
  ],

  // Options affecting the normal modules
  module: {
    // A array of automatically applied loaders.
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                import: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  autoprefixer()
                ]
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          outputPath: './fonts/',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './images/',
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;