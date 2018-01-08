import { connect } from 'react-redux';

import Component from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    startTypingTime: stateMain.get('startTypingTime'),
    hits: stateMain.get('hits'),
    errors: stateMain.get('typos'),
  };
};

export default connect(
  mapStateToProps,
)(Component);
