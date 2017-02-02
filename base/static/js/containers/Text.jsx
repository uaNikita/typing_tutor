import {connect} from 'react-redux'
import {map} from 'lodash';
import Text from '../components/Text.jsx'
import {selectText, refreshText} from '../redux/modules/text-mode'

const mapStateToProps = (state, ownProps) => {
  let textId = ownProps.params.textId;
  let text = state.textMode.entities[textId];

  return {
    id: parseInt(textId, 10),
    title: text.title,
    typed: text.typed,
    last: text.last,
    currentTextId: state.textMode.currentTextId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectText: (textId) => {
      dispatch(selectText(textId))
    },
    refreshText: (textId) => {
      dispatch(refreshText(textId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Text)
