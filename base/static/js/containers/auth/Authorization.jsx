import { connect } from 'react-redux'
import Authorization from '../../components/auth/Authorization.jsx'
import { openModal } from '../../actions/main'

const mapStateToProps = (state) => {
  return {
    modalName: state.modal.name
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
