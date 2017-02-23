import { connect } from 'react-redux'
import Textarea from '../components/Learningarea.jsx'

const mapStateToProps = (state) => {
  return {
    lessonTyped: state.learningMode.lessonTyped,
    lessonLast: state.learningMode.lessonRest,
  }
}

export default connect(
  mapStateToProps
)(Textarea)
