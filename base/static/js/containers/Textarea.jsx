import {connect} from 'react-redux'
import Textarea from '../components/Textarea.jsx'

const mapStateToProps = (state) => {

   const stateTextMode = state.get('textMode');

   let text = _.find(stateTextMode.get('entities'), {
      id: stateTextMode.get('currentTextId')
   });

   return {
      typed: text.typed,
      nonTyped: text.last
   }

}

export default connect(
  mapStateToProps
)(Textarea)
