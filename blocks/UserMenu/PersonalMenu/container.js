import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Component from './component';

const mapStateToProps = (state) => {
  const userState = state.get('user');

  return {
    email: userState.get('email'),
    name: userState.get('name'),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps),
)(Component);
