import { connect } from 'react-redux';
import ModalFrame from '../components/ModalFrame.jsx';

const mapStateToProps = (state) => {
  return {
    modalName: state.modal,
    closable: state.modalClosable
  }
}

export default connect(
  mapStateToProps
)(ModalFrame)
