import { connect } from 'react-redux';

import {
  processAddLetterToFreeLetters,
  processRemoveLetterToFreeLetters,
  processSetMaxLettersInWordFree,
  updateFreeLesson,
  updateCurrentLessonFromCurrentMode,
  updateCharToType,
} from 'ReduxUtils/modules/modes/learning';

import LearningFree from './component.jsx';

const mapStateToProps = state => {
  const stateLearningMode = state.get('learningMode');

  return {
    maxLettersInWord: stateLearningMode.get('maxLettersInWordFree'),
    keys: state.getIn(['main', 'keys']).toJS(),
    letters: stateLearningMode.get('lettersFree').toJS(),
    lesson: stateLearningMode.get('lessonFree'),
  };
};

const mapDispatchToProps = dispatch => ({
  addLetter: letter => {
    dispatch(processAddLetterToFreeLetters(letter));

    dispatch(updateFreeLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
  removeLetter: letter => {
    dispatch(processRemoveLetterToFreeLetters(letter));

    dispatch(updateFreeLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
  setMaxLettersInWord: length => {
    dispatch(processSetMaxLettersInWordFree(length));

    dispatch(updateFreeLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFree);
