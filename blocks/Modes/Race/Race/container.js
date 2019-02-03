import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapStateToProps = state => ({
  accessToken: state.getIn(['fetch', 'accessToken']),
  keyboard: state.getIn(['user', 'keyboard']),
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
