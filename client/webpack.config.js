'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.WEBPACK_ENV;
var plugins = [
   new ExtractTextPlugin('[name].css'),
   new webpack.LoaderOptionsPlugin({
      options: {
         context: __dirname,
         postcss: [
            autoprefixer
         ]
      }
   })
];

if (env === 'build') {

   plugins = plugins.concat([
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

   // Options affecting the normal modules
   module: {
      // A array of automatically applied loaders.
      rules: [
         {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
               plugins: ["transform-object-rest-spread"],
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
               fallback: 'style-loader',
               use: [
                  {
                     loader: "css-loader",
                     options: {
                        url: true,
                        import: true,
                     }
                  },
                  "postcss-loader",
                  "stylus-loader"

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
            loader: "url-loader",
            query: {
               limit: "10000",
               mimetype: "application/font-woff",
               name: "[name].[ext]"
            }
         }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader",
            query: {
               limit: "10000",
               mimetype: "application/font-woff",
               name: "[name].[ext]"
            }
         }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader",
            query: {
               limit: "10000",
               mimetype: "application/octet-stream",
               name: "[name].[ext]"
            }
         }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader",
            query: {
               name: "[name].[ext]"
            }
         }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: "url-loader",
            query: {
               limit: "10000",
               mimetype: "image/svg+xml",
               name: "[name].[ext]"
            }
         }
      ]
   }

};