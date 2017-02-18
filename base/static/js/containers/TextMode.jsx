import {connect} from 'react-redux';
import {map} from 'lodash';
import TextMode from '../components/TextMode.jsx';

import {setMode} from '../redux/modules/main';
import {selectText, updateCharToType} from '../redux/modules/text-mode';

const mapStateToProps = (state) => {

   const texts = map(state.textMode.entities, (obj, key) => {
      return {
         textId: key,
         title: obj.title,
         text: obj.typed + obj.last,
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

         dispatch(setMode(mode));

         dispatch(updateCharToType());

      }
   }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextMode)
