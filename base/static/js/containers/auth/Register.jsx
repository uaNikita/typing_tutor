import {connect} from 'react-redux'
import Register from '../../components/auth/Register.jsx'
import {openModal} from '../../redux/modules/main'

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
)(Register)
