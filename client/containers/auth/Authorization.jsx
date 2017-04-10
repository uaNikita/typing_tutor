import { connect } from 'react-redux';
import Authorization from '../../components/auth/Authorization.jsx';
import { openModal } from '../../redux/modules/modal';

const mapStateToProps = (state) => {

   return {
      modalName: state.getIn(['modal', 'name'])
   };

};

const mapDispatchToProps = (dispatch) => {
   return {
      openModal: (name) => {
         dispatch(openModal(name));
      }
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Authorization);