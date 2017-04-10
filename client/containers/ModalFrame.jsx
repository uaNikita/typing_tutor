import {connect} from 'react-redux';
import ModalFrame from '../components/ModalFrame.jsx';

const mapStateToProps = (state) => {

   const stateModal = state.get('modal');
   
   return {
      modalName: stateModal.get('name'),
      closable: stateModal.get('closable')
   }

}

export default connect(
  mapStateToProps
)(ModalFrame)
