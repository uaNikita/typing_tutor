import { connect } from 'react-redux'
import Authorization from '../../components/auth/Authorization.jsx'
import { openModal } from '../../actions/actions.js'

const mapStateToProps = (state) => {
  return {
    modalName: state.keyboard.modal
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
)(Authorization)
