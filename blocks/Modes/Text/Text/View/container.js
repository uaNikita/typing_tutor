import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';
import { processSelectText, processRemoveText } from 'ReduxUtils/reducers/modes/text';
import Component from './component';

const mapDispatchToProps = (dispatch, ownProps) => ({
  start: () => {
    dispatch(processSelectText(ownProps.id));

    dispatch(processSetSettings({
      mode: 'text',
    }));

    ownProps.history.push('/');
  },
  del: () => {
    dispatch(processRemoveText(ownProps.id));

    ownProps.history.push('/mode/text');
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
