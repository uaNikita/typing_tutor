import { connect } from 'react-redux'
import { map } from 'lodash';
import Textarea from '../components/AddTextForm.jsx'
import { addNewText } from '../actions/actions.js'


const mapStateToProps = (state) => {

  var texts = map(state.textEntities, (obj, key) => {
    return {
      id: key,
      title: obj.title,
      text: obj.typed + obj.last,
    }
  })

  return {
    texts,
    currentTextId: state.currentTextId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (title, text) => {
      dispatch(addNewText(title, text))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Textarea)
