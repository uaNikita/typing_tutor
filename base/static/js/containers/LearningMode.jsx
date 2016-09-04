import {connect} from 'react-redux'
import LearningMode from '../components/LearningMode.jsx'
import {updateLessonAlphabetSize, updateLessonMaxWordLength} from '../actions/actions.js'




const mapStateToProps = (state) => {
  return {
    alphabetSize: state.learningMode.alphabetSize,
    maxWordLength: state.learningMode.maxWordLength,
    lesson: state.learningMode.lesson.typed + state.learningMode.lesson.last,
    keyboardName: state.keyboard.keyboardName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlphabetSize: (size) => {
      dispatch(updateLessonAlphabetSize(size))
    },
    setMaxWordLength: (length) => {
      dispatch(updateLessonMaxWordLength(length))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMode)
