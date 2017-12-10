import { connect } from 'react-redux';
import Texts from './component.jsx';

const mapStateToProps = state => ({
  texts: state.getIn(['textMode', 'entities']).toJS().map(obj => ({
    textId: obj.id,
    text: obj.typed + obj.last,
  })),
});

export default connect(
  mapStateToProps,
  null,
)(Texts);
