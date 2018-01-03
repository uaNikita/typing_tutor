import { connect } from 'react-redux';

import Component from './component.jsx';

const mapStateToProps = state => {
  const stateMain = state.get('main');

  return {
    hits: stateMain.get('successTypes'),
    errors: stateMain.get('errorTypes'),
  };
};

export default connect(
  mapStateToProps,
)(Component);
