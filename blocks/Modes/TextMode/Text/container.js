import { connect } from 'react-redux';
import Component from './component';

const mapStateToProps = (state, { match }) => {
  const id = parseInt(match.params.textId, 10);

  const text = state.getIn(['text', 'entities'])
    .filter(obj => obj.get('id') === id)
    .get(0);

  return text
    ? { text: { ...text.toJS() } }
    : {};
};

export default connect(
  mapStateToProps,
)(Component);
