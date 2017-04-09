import {connect} from 'react-redux';
import Settings from '../components/Settings.jsx';

const mapStateToProps = (state) => {

   return {
      mode: state.getIn(['main', 'mode'])
   }

}

export default connect(
  mapStateToProps
)(Settings)
