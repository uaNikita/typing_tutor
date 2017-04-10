import { connect } from 'react-redux'
import Modal from '../components/Modal.jsx'
import { closeModal } from '../redux/modules/modal'

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(closeModal())
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Modal)
