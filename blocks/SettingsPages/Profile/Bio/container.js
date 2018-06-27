import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';
import Component from './component';

const mapStateToProps = state => ({
  initialValues: {
    bio: state.getIn(['user', 'bio']),
  },
});

const mapDispatchToProps = dispatch => ({
  setSettings: (...args) => dispatch(processSetSettings(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
