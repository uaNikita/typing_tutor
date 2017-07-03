'use strict';

var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      Redux: path.resolve(__dirname, 'redux/')
    }
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],

  // Options affecting the normal modules
  module: {
    // A array of automatically applied loaders.
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: ['transform-object-rest-spread'],
          presets: ['es2015', 'react']
        }
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
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: '10000',
          mimetype: 'application/font-woff',
          name: '[name].[ext]'
        }
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: '10000',
          mimetype: 'application/font-woff',
          name: '[name].[ext]'
        }
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: '10000',
          mimetype: 'application/octet-stream',
          name: '[name].[ext]'
        }
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        query: {
          limit: '10000',
          mimetype: 'image/svg+xml',
          name: '[name].[ext]'
        }
      }
    ]
  }

};

if (isProduction) {
  config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]);
}

module.exports = config;