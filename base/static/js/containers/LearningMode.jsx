import {connect} from 'react-redux'
import LearningMode from '../components/LearningMode.jsx'
import {
  setLessonMaxWordLength,
  updateLesson,
  setLearningMode
} from '../actions/learning-mode'

const mapStateToProps = (state) => {
  return {
    maxWordLength: state.learningMode.maxWordLength,
    lesson: state.learningMode.lesson.typed + state.learningMode.lesson.last,
    mode: state.learningMode.mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMaxWordLength: (length) => {
      dispatch(setLessonMaxWordLength(length));

      dispatch(updateLesson());
    },
    setLearningMode: (mode) => {
      dispatch(setLearningMode(mode))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMode)
