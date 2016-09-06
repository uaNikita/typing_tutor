import {connect} from 'react-redux'
import {map} from 'lodash';
import Text from '../components/Text.jsx'
import {refreshText} from '../actions/text-mode'

const mapStateToProps = (state, ownProps) => {
  let textId = ownProps.params.textId;
  let text = state.textMode.entities[textId];

  return {
    id: textId,
    title: text.title,
    typed: text.typed,
    last: text.last
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    refreshText: (textId) => {
      dispatch(refreshText(textId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Text)
