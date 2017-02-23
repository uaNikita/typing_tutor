import {connect} from 'react-redux'
import Textarea from '../components/Textarea.jsx'

const mapStateToProps = (state) => {

   let text = _.find(state.textMode.entities, {
      id: state.textMode.currentTextId
   });

   return {
      typed: text.typed,
      nonTyped: text.last
   }

}

export default connect(
  mapStateToProps
)(Textarea)
