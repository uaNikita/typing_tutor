import {connect} from 'react-redux'
import { push } from 'react-router-redux'
import AddText from '../components/AddText.jsx'
import {addText} from '../redux/modules/text-mode'

const mapDispatchToProps = (dispatch) => {
   return {
      addText: (title, text) => {

         dispatch(addText(title, text));

         dispatch(push('/settings/text-mode'));

      }
   }
}

export default connect(
  null,
  mapDispatchToProps
)(AddText)
