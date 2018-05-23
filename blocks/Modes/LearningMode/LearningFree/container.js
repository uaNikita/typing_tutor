import { connect } from 'react-redux';

import {
  processAddLetterToFreeLetters,
  processRemoveLetterToFreeLetters,
  processSetFreeOptions,
  generateFreeLesson,
} from 'ReduxUtils/modules/modes/learning';

import LearningFree from './component.jsx';

const mapStateToProps = state => {
  const stateLearningMode = state.get('learningMode');

  return {
    maxLettersInWord: stateLearningMode.get('maxLettersInWordFree'),
    keys: state.getIn(['main', 'keys']).toJS(),
    letters: stateLearningMode.getIn(['free', 'letters']).toJS(),
  };
};

const mapDispatchToProps = dispatch => ({
  addLetter: (...args) => dispatch(processAddLetterToFreeLetters(...args)),
  removeLetter: (...args) => dispatch(processRemoveLetterToFreeLetters(...args)),
  setMaxLettersInWord: length =>
    dispatch(processSetFreeOptions({
      maxLettersInWord: length,
    })),
  generateFreeLesson: (...args) => generateFreeLesson(...args),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFree);
