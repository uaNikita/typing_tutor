import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';

import Component from './component';

const mapDispatchToProps = (dispatch, ownProps) => ({
  start: () => {
    dispatch(processSetSettings({
      mode: 'game',
    }));

    ownProps.history.push('/');
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
