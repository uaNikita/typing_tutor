import {connect} from 'react-redux';
import TextMode from '../components/TextMode.jsx';

import {setMode} from '../redux/modules/main';
import {selectText, updateCharToType} from '../redux/modules/text-mode';

const mapStateToProps = (state) => {

   const stateTextMode = state.get('textMode');

   const texts = stateTextMode.get('entities').toJS().map(obj => {
      return {
         textId: obj.id,
         title: obj.title,
         text: obj.typed + obj.last,
      }
   });

   return {
      texts,
      currentTextId: stateTextMode.get('currentTextId'),
      mode: state.getIn(['main', 'mode'])
   }

}

const mapDispatchToProps = (dispatch) => {
   return {
      selectText: (textId) => {

         dispatch(selectText(textId));

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
