import {connect} from 'react-redux';
import {map} from 'lodash';
import TextMode from '../components/TextMode.jsx';

import {selectText, refreshText} from '../redux/modules/text-mode';
import {setMode} from '../redux/modules/main';

const mapStateToProps = (state) => {
  var texts = map(state.textMode.entities, (obj, key) => {
    let text = obj.typed + obj.last;

    return {
      textId: key,
      title: obj.title,
      text: text.substring(0, 230),
    }
  })

  return {
    texts,
    currentTextId: state.textMode.currentTextId,
    mode: state.main.mode
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectText: (textId) => {
      dispatch(selectText(textId))
    },
    setMode: (mode) => {
      dispatch(setMode(mode))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextMode)
