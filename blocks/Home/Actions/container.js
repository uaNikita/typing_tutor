import { connect } from 'react-redux';
import { setHiddenChars } from 'ReduxUtils/reducers/user';
import Component from './component';

const mapStateToProps = state => ({
  hiddenChars: state.getIn(['user', 'hiddenChars']),
});

const mapDispatchToProps = dispatch => ({
  setHiddenChars: (...args) => dispatch(setHiddenChars(...args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
