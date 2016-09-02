import { connect } from 'react-redux'
import { map } from 'lodash';
import TextMode from '../components/TextMode.jsx'
import { selectText, refreshText } from '../actions/actions.js'

const mapStateToProps = (state) => {

  var texts = map(state.textMode.entities, (obj, key) => {
    return {
      id: key,
      title: obj.title,
      typed: obj.typed,
      last: obj.last
    }
  })

  return {
    texts,
    currentTextId: state.currentTextId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectText: (textId) => {
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
)(TextMode)
