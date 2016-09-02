import {connect} from 'react-redux'
import Layout from '../components/Layout.jsx'

const mapStateToProps = (state) => {
  return {
    modalName: state.modal.name
  }
}

export default connect(
  mapStateToProps
)(Layout)
