import { connect } from 'react-redux';
import Texts from './component';

const mapStateToProps = (state) => {
  const entities = state.getIn(['text', 'entities']);
  let texts;

  if (entities) {
    texts = entities.toJS().map(obj => ({
      id: obj.id,
      content: obj.typed + obj.last,
    }));
  }

  return ({
    texts,
    selectedId: state.getIn(['text', 'selectedId']),
  });
};

export default connect(
  mapStateToProps,
  null,
)(Texts);
