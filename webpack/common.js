const path = require('path');
const { root } = require('./utils');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      ReduxUtils: path.resolve(root, 'redux/'),
      Blocks: path.resolve(root, 'blocks/'),
      Static: path.resolve(root, 'static/'),
      Constants: path.resolve(root, 'constants/'),
      Utils: path.resolve(root, 'utils/'),
      Client: path.resolve(root, 'client/'),
      Server: path.resolve(root, 'server/'),
    }
  },
};
