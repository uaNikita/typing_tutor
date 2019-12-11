const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  root: path.join(__dirname, '..'),

  restCssLoders: [
    {
      loader: 'postcss-loader',
      options: {
        plugins: [
          autoprefixer(),
        ],
      },
    },
    'stylus-loader',
  ],
};
