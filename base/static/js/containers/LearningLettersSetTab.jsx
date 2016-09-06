import {connect} from 'react-redux'
import {find} from 'lodash';
import LearningLettersSetTab from '../components/LearningLettersSetTab.jsx'
import {updateLessonAlphabetSize} from '../actions/learning-mode'

const mapStateToProps = (state) => {
  return {
    alphabetSize: state.learningMode.alphabetSize,
    keys: find(state.keyboard.keyboards, {'name': state.keyboard.keyboardName}).keys
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAlphabetSize: (size) => {
      dispatch(updateLessonAlphabetSize(size))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningLettersSetTab)
