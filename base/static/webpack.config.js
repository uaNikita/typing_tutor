'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,

  // The entry point for the bundle.
  entry: './webpack-entry.jsx',

  // Options affecting the output.
  output: {
    path: path.join(__dirname, 'build'),
    // The filename of the entry chunk as relative path inside the output.path directory.
    filename: '[name].js'
  },

  watch: true,

  watchOptions: {
    aggregateTimeout: 100
  },

  // devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // 'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //    compressor: {
    //       warnings: false
    //    }
    // }),
    new ExtractTextPlugin("[name].css")
  ],

  // Options affecting the resolving of modules.
  resolve: {
    // An array of directory names to be resolved to the current directory as well as its ancestors, and searched for modules.
    modulesDirectories: ['node_modules'],
    // An array of extensions that should be used to resolve modules.
    extensions: ['', '.js']
  },

  // Like resolve but for loaders.
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    // It describes alternatives for the module name that are tried.
    moduleTemplates: ['*-loader'],
    extention: ['', '.js']
  },

  // Options affecting the normal modules
  module: {

    // A array of automatically applied loaders.
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:["> 3%"]}!stylus')
        // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer?{browsers:["> 3%"]}!stylus?sourceMap')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }
    ]

  }

};