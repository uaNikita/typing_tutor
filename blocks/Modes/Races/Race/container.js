import { connect } from 'react-redux';

import { getNewTokens } from 'ReduxUtils/reducers/fetch';
import { processSetSettings } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapStateToProps = state => ({
  keyboard: state.getIn(['user', 'keyboard']),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getNewTokens: (...args) => dispatch(getNewTokens(...args)),
  start: () => {
    dispatch(processSetSettings({
      mode: 'game',
    }));

    ownProps.history.push('/');
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
