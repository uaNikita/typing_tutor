import { connect } from 'react-redux';
import {
  processSetOptions,
  generateFreeLesson,
  setFreeExample,
} from 'ReduxUtils/reducers/modes/learning';

import LearningFree from './component';

const mapStateToProps = (state) => {
  const stateFree = state.getIn(['learning', 'free']);

  return {
    example: stateFree.get('example'),
    options: stateFree.get('options').toJS(),
    keys: state.getIn(['main', 'keys']).toJS(),
  };
};

const mapDispatchToProps = dispatch => ({
  updateOptions: (options) => {
    dispatch(processSetOptions({
      mode: 'free',
      options,
    }));

    const example = dispatch(generateFreeLesson());

    dispatch(setFreeExample(example));
  },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFree);
