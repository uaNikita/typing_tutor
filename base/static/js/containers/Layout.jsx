import {connect} from 'react-redux'
import Layout from '../components/Layout.jsx'

const mapStateToProps = (state) => {
  return {
    modalName: state.keyboard.modal
  }
}

export default connect(
  mapStateToProps
)(Layout)
