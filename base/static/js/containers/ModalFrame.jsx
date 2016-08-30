import { connect } from 'react-redux';
import ModalFrame from '../components/ModalFrame.jsx';

const mapStateToProps = (state) => {
  return {
    modalName: state.keyboard.modal,
    closable: state.keyboard.modalClosable
  }
}

export default connect(
  mapStateToProps
)(ModalFrame)
