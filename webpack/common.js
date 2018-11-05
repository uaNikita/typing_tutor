module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
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
};
