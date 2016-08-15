import { connect } from 'react-redux'
import { map } from 'lodash';
import Textarea from '../components/AddTextForm.jsx'
import { addNewText } from '../actions/actions.js'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (name) => {
      dispatch(openModal(name))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Textarea)
