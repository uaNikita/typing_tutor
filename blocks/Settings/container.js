import { connect } from 'react-redux';
import Settings from '../Settings/component.jsx';

const mapStateToProps = state => (
  {
    mode: state.getIn(['main', 'mode']),
  }
);

export default connect(
  mapStateToProps,
)(Settings);

