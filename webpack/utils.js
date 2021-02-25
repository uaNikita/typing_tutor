const path = require('path');

module.exports = {
  root: path.join(__dirname, '..'),

  restCssLoaders: [
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'stylus-loader',
  ],
};
