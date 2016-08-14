import { connect } from 'react-redux'
import Textarea from '../components/Learningarea.jsx'

const mapStateToProps = (state) => {

  return {
    lessonTyped: state.learningLesson.typed,
    lessonLast: state.learningLesson.last,
  }

}

export default connect(
  mapStateToProps
)(Textarea)
