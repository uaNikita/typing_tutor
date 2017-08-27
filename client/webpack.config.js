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

  // The entry point for the bundle.
  entry: './entry.jsx',

  // Options affecting the output.
  output: {
    path: path.join(__dirname, 'dist'),
    // The filename of the entry chunk as relative path inside the output.path directory.
    filename: 'main.js'
  },

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: isProduction ? 'source-map' : 'eval',

  resolve: {
    alias: {
      Blocks: path.resolve(__dirname, 'blocks/'),
      Redux: path.resolve(__dirname, 'redux/'),
      Utils: path.resolve(__dirname, 'utils/')
    }
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
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
        loader: 'babel-loader',
        exclude: /node_modules/
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