import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapStateToProps = state => ({
  keyboard: state.getIn(['user', 'keyboard']),
  socket: state.getIn(['race', 'socket']),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
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
