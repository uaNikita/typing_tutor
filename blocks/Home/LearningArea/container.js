import { connect } from 'react-redux';
import { refreshCurrentLesson, updateCharToType } from 'ReduxUtils/reducers/modes/learning';

import Textarea from './component';

const mapStateToProps = (state) => {
  const stateLesson = state.getIn(['learning', 'lesson']);

  return {
    typed: stateLesson.get('typed'),
    rest: stateLesson.get('rest'),
  };
};

const mapDispatchToProps = dispatch => ({
  refreshInitialData: () => {
    dispatch(refreshCurrentLesson());
    dispatch(updateCharToType());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Textarea);
