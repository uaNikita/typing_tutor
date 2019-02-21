import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';
import { processSelectText, processRefreshText, processRemoveText } from 'ReduxUtils/reducers/modes/text';
import Component from './component';

const mapDispatchToProps = (dispatch, ownProps) => ({
  start: () => {
    dispatch(processSelectText(ownProps.id));

    dispatch(processSetSettings({
      mode: 'text',
    }));

    ownProps.history.push('/');
  },
  refresh: () => dispatch(processRefreshText(ownProps.id)),
  del: () => {
    dispatch(processRemoveText(ownProps.id));

    ownProps.history.push('/mode/text');
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
