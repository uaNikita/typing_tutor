import { connect } from 'react-redux'
import Modal from '../Modal/component.jsx'
import { closeModal } from 'Redux/modules/modal'

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
