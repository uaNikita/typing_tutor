import { connect } from 'react-redux';
import Layout from './component.jsx';

const mapStateToProps = state => (
  {
    modalName: state.getIn(['modal', 'name']),
  }
);

export default connect(
  mapStateToProps,
)(Layout);
