'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.WEBPACK_ENV;
var plugins = [new ExtractTextPlugin('[name].css')];

if (env === 'build') {

   plugins.push(new webpack.DefinePlugin({
      'process.env': {
         'NODE_ENV': JSON.stringify('production')
      }
   }));

   plugins.push(new webpack.NoErrorsPlugin());

   plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
         warnings: false
      }
   }));

}

module.exports = {
   context: path.join(__dirname),

   // The entry point for the bundle.
   entry: './entry.jsx',

   // Options affecting the output.
   output: {
      path: path.join(__dirname, 'build'),
      // The filename of the entry chunk as relative path inside the output.path directory.
      filename: '[name].js'
   },

   watchOptions: {
      aggregateTimeout: 100
   },

   plugins: plugins,

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
               plugins: ['lodash'],
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('style', 'css?-url&-import!postcss!stylus')
         },
         {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
         }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
               limit: "10000",
               mimetype: "application/font-woff",
               name: "[name].[ext]"
            }
         }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
               limit: "10000",
               mimetype: "application/font-woff",
               name: "[name].[ext]"
            }
         }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
               limit: "10000",
               mimetype: "application/octet-stream",
               name: "[name].[ext]"
            }
         }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file",
            query: {
               name: "[name].[ext]"
            }
         }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url",
            query: {
               limit: "10000",
               mimetype: "image/svg+xml",
               name: "[name].[ext]"
            }
         }
      ]
   },

   postcss: function () {
      return [autoprefixer({
         browsers: ['> 3%']
      })];
   }

};