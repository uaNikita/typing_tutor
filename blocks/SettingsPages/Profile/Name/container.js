import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';
import Component from './component.jsx';

const mapStateToProps = state => ({
  initialValues: {
    name: state.getIn(['user', 'name']),
  },
});

const mapDispatchToProps = dispatch => ({
  setSettings: (...args) => dispatch(processSetSettings(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
