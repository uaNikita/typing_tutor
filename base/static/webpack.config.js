'use strict';

var webpack           = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
   context: __dirname,

   // The entry point for the bundle.
   entry: './webpack-entry',

   // Options affecting the output.
   output: {
      path: __dirname + '/build',
      // The filename of the entry chunk as relative path inside the output.path directory.
      filename: '[name].js'
   },

   watch: true,

   watchOptions: {
      aggregateTimeout: 100
   },

   devtool: 'source-map',

   plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.UglifyJsPlugin({
         compressor: {
            warnings: false
         }
      }),
      new ExtractTextPlugin("[name].css")
   ],

   // Options affecting the normal modules
   module: {

      // A array of automatically applied loaders.
      loaders: [
         {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('style', 'css?sourceMap!autoprefixer?{browsers:["> 3%"]}!stylus?sourceMap')
         },
         {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
         }
      ]

   }

};