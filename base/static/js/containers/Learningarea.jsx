import { connect } from 'react-redux'
import Textarea from '../components/Learningarea.jsx'

const mapStateToProps = (state) => {

  return {
    lessonTyped: state.keyboard.learningLesson.typed,
    lessonLast: state.keyboard.learningLesson.last,
  }

}

export default connect(
  mapStateToProps
)(Textarea)
