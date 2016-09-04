import { connect } from 'react-redux'
import Textarea from '../components/Learningarea.jsx'

const mapStateToProps = (state) => {
  return {
    lessonTyped: state.learningMode.lesson.typed,
    lessonLast: state.learningMode.lesson.last,
  }
}

export default connect(
  mapStateToProps
)(Textarea)
