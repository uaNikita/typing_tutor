const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const restCssLoders = [
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoprefixer(),
      ]
    },
  },
  'stylus-loader'
];

module.exports = {
  context: path.join(__dirname),

  entry: ['@babel/polyfill', path.join(__dirname, 'client', 'entry.jsx')],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'static/favicon.png'),
        to: path.resolve(__dirname, 'dist/favicon.png')
      },
      {
        from: path.resolve(__dirname, 'static/robots.txt'),
        to: path.resolve(__dirname, 'dist/robots.txt')
      },
      {
        from: path.resolve(__dirname, 'static/media'),
        to: path.resolve(__dirname, 'dist/media')
      },
      {
        from: path.resolve(__dirname, 'static/plugins'),
        to: path.resolve(__dirname, 'dist/plugins')
      }
    ]),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      BROWSER: true,
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'main',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
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

