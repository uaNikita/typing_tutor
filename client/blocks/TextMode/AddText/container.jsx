import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import AddText from './component.jsx'
import {addText, selectLastText} from 'Redux/modules/text-mode'

const mapDispatchToProps = (dispatch) => {
   return {
      addText: (title, text) => {

         dispatch(addText(title, text));

      },
      selectAddedText: () => {

         dispatch(selectLastText());

      },
      goToTextList: () => {

         dispatch(push('/settings/text-mode'));

      }
   }
}

export default connect(
  null,
  mapDispatchToProps
)(AddText)
