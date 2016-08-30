import { connect } from 'react-redux'
import LearningMode from '../components/LearningMode.jsx'
import { setLessonAlphabetSize, setLessonMaxWordLength } from '../actions/actions.js'

const mapStateToProps = (state) => {

  return {
    alphabetSize: state.keyboard.learningAlphabetSize,
    maxWordLength: state.keyboard.learningMaxWordLength,
    lesson: state.keyboard.learningLesson.typed + state.keyboard.learningLesson.last,
    keyboardName: state.keyboard.keyboardName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlphabetSize: (alphabetSize) => {
      dispatch(setLessonAlphabetSize(alphabetSize))
    },
    setMaxWordLength: (maxWordLength) => {
      dispatch(setLessonMaxWordLength(maxWordLength))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMode)
