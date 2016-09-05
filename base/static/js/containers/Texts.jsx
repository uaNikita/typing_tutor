import { connect } from 'react-redux'
import { map } from 'lodash';
import TextMode from '../components/TextMode.jsx'
import { selectText, refreshText } from '../actions/text-mode'

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
    currentTextId: state.textMode.currentTextId
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    onSelectText: (textId) => {
      console.log('onSelectText');
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
