import {connect} from 'react-redux'
import ForgotPas from '../../components/auth/ForgotPas.jsx'
import {openModal} from '../../actions/actions.js'

const mapStateToProps = (state) => {
  return {}
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
)(ForgotPas)
