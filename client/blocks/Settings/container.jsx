import {connect} from 'react-redux';
import Settings from '../Settings/component.jsx';

const mapStateToProps = (state) => {

   return {
      mode: state.getIn(['main', 'mode'])
   }

}

export default connect(
  mapStateToProps
)(Settings)
