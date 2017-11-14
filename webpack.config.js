'use strict';

var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProduction = process.env.WEBPACK_ENV === 'production' ? true : false;

const commonConfig = {
  resolve: {
    alias: {
      ReduxUtils: path.resolve(__dirname, 'redux/'),
      Blocks: path.resolve(__dirname, 'blocks/'),
      Static: path.resolve(__dirname, 'static/'),
      Constants: path.resolve(__dirname, 'constants/'),
      Utils: path.resolve(__dirname, 'utils/'),
      Client: path.resolve(__dirname, 'client/'),
      Server: path.resolve(__dirname, 'server/'),
    }
  },

  watchOptions: {
    aggregateTimeout: 100
  }
};

const restCssLoders = [
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
];

let clientConfig = {
  context: path.join(__dirname),

  entry: path.join(__dirname, 'client', 'entry.jsx'),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },

  devtool: isProduction ? 'source-map' : 'eval',

  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'static/favicon.png'),
      to: path.resolve(__dirname, 'dist/favicon.png')
    }]),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      BROWSER: true,
    }),
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
        test: /^((?!module).)+styl/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                url: true,
                import: true
              }
            },
            ...restCssLoders
          ]
        })
      },
      {
        test: /module\.styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            ...restCssLoders
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
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
              query: {
                mozjpeg: {
                  progressive: true,
                },
              }
            }
          }
        ]
      }
    ]
  }
};

const nodeExternals = require('webpack-node-externals');

let serverConfig = {
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
          ...restCssLoders
        ]
      },
      {
        test: /\.(css|woff|woff2|ttf|eot|jpg|png|svg)$/,
        use: 'null-loader'
      },
    ]
  }
};

if (isProduction) {
  const productionPlugins = [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ];

  clientConfig.plugins = clientConfig.plugins.concat(productionPlugins);
  serverConfig.plugins = serverConfig.plugins.concat(productionPlugins);
}

module.exports = [
  _.merge({}, commonConfig, clientConfig),
  _.merge({}, commonConfig, serverConfig)
];
