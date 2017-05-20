import {connect} from 'react-redux'
import _ from 'lodash';
import Text from './component.jsx'
import {selectText, refreshText} from 'Redux/modules/text-mode'

const mapStateToProps = (state, ownProps) => {

   const id = ownProps.params.textId;

   const stateTextMode = state.get('textMode');

   const text = stateTextMode.get('entities').filter(obj => obj.get('id') === id).get(0);

   return {
      id,
      title: text.get('title'),
      typed: text.get('typed'),
      last: text.get('last'),
      currentTextId: stateTextMode.get('currentTextId')
   };

};

const mapDispatchToProps = (dispatch) => {

   return {

      selectText: (textId) => {

         dispatch(selectText(textId));

      },
      refreshText: (textId) => {

         dispatch(refreshText(textId));

      }

   };

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Text)
