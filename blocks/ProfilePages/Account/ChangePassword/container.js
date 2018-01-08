import { connect } from 'react-redux';

import { typeChar } from 'ReduxUtils/modules/main';
import Component from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    hits: stateMain.get('hits'),
  };
};

const mapDispatchToProps = dispatch => ({
  typeChar(char) {
    dispatch(typeChar(char));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
