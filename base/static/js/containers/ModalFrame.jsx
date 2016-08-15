import { connect } from 'react-redux';
import ModalFrame from '../components/ModalFrame.jsx';

const mapStateToProps = (state) => {
  console.log(state.modal, state.modalClosable)

  return {
    modalName: state.modal,
    closable: state.modalClosable
  }
}

export default connect(
  mapStateToProps
)(ModalFrame)
