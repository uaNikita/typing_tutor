import { connect } from 'react-redux'
import Modal from '../components/Modal.jsx'
import { closeModal } from '../redux/modules/main'

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => {
      dispatch(closeModal())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal)
