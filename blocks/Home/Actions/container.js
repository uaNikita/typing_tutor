import { connect } from 'react-redux';
import { setHiddenChars } from 'ReduxUtils/reducers/user';
import Component from './component';

const mapStateToProps = state => ({
  showHiddenChars: state.getIn(['user', 'showHiddenChars']),
});

const mapDispatchToProps = dispatch => ({
  setHiddenChars: (...args) => dispatch(setHiddenChars(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
