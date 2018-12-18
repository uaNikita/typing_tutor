import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = (state, { match }) => {
  const entities = state.getIn(['text', 'entities']);
  const id = parseInt(match.params.textId, 10);
  let text;

  if (entities) {
    text = entities
      .filter(obj => obj.get('id') === id)
      .get(0);

    if (text) {
      text = text.toJS();
    }
  }

  return {
    entities,
    text,
  };
};

export default connect(
  mapStateToProps,
)(Component);
