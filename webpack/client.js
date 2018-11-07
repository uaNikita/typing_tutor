const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { root, restCssLoders } = require('./utils');

module.exports = {
  context: path.join(root),

  entry: ['@babel/polyfill', path.join(root, 'client', 'entry.jsx')],

  output: {
    path: path.join(root, 'dist'),
    filename: 'main.js'
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(root, 'static/favicon.png'),
        to: path.resolve(root, 'dist/favicon.png')
      },
      {
        from: path.resolve(root, 'static/robots.txt'),
        to: path.resolve(root, 'dist/robots.txt')
      },
      {
        from: path.resolve(root, 'static/media'),
        to: path.resolve(root, 'dist/media')
      },
      {
        from: path.resolve(root, 'static/plugins'),
        to: path.resolve(root, 'dist/plugins')
      }
    ]),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      BROWSER: true,
    }),
  ],

  // todo: optimize chunks
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          test: /\.css$/,
          name: 'main',
          chunks: 'all',
        }
      },
    },
  },

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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              import: true
            }
          },
          ...restCssLoders
        ]
      },
      {
        test: /module\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          ...restCssLoders
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
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

