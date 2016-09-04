import {connect} from 'react-redux'
import Login from '../../components/auth/Login.jsx'
import {openModal} from '../../actions/main'

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
)(Login)




