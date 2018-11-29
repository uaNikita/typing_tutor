import { connect } from 'react-redux';

import { processSetSettings } from 'ReduxUtils/reducers/user';
import { processSelectText } from 'ReduxUtils/reducers/modes/text';
import Component from './component';

const mapDispatchToProps = (dispatch, ownProps) => ({
  start: () => {
    dispatch(processSelectText(ownProps.id));

    dispatch(processSetSettings({
      mode: 'text',
    }));

    ownProps.history.push('/');
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(Component);
