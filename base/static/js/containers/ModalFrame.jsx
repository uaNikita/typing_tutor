import { connect } from 'react-redux';
import ModalFrame from '../components/ModalFrame.jsx';

const mapStateToProps = (state) => {
  return {
    modalName: state.modal.name,
    closable: state.modal.closable
  }
}

export default connect(
  mapStateToProps
)(ModalFrame)
