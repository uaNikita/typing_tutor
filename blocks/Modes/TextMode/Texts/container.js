import { connect } from 'react-redux';
import Texts from './component.jsx';

const mapStateToProps = state => ({
  texts: state.getIn(['text', 'entities']).toJS().map(obj => ({
    id: obj.id,
    content: obj.typed + obj.last,
  })),
  selectedId: state.getIn(['text', 'selectedId']),
});

export default connect(
  mapStateToProps,
  null,
)(Texts);
