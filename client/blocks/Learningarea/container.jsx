import {connect} from 'react-redux'
import Textarea from '../Learningarea/component.jsx'

const mapStateToProps = (state) => {

   const stateLearningMode = state.get('learningMode');

   return {
      lessonTyped: stateLearningMode.get('lessonTyped'),
      lessonLast: stateLearningMode.get('lessonRest'),
   }

}

export default connect(
  mapStateToProps
)(Textarea)
