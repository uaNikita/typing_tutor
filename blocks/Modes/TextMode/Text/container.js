import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = (state, { match }) => ({
  entities: state.getIn(['text', 'entities']),
  id: parseInt(match.params.textId, 10),
});

export default connect(
  mapStateToProps,
)(Component);
