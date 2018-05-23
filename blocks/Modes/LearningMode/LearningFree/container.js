import { connect } from 'react-redux';

import {
  processAddLetterToFreeLetters,
  processRemoveLetterToFreeLetters,
  processSetMaxLettersInWordFree,
  refreshFreeLesson,
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

    dispatch(refreshFreeLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
  removeLetter: letter => {
    dispatch(processRemoveLetterToFreeLetters(letter));

    dispatch(refreshFreeLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
  setMaxLettersInWord: length => {
    dispatch(processSetMaxLettersInWordFree(length));

    dispatch(refreshFreeLesson());

    dispatch(updateCurrentLessonFromCurrentMode());

    dispatch(updateCharToType());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearningFree);
