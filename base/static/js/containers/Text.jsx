import {connect} from 'react-redux'
import _ from 'lodash';
import Text from '../components/Text.jsx'
import {selectText, refreshText} from '../redux/modules/text-mode'

const mapStateToProps = (state, ownProps) => {

   const id = ownProps.params.textId;

   let text = _.find(state.textMode.entities, {
      id
   });

   console.log(id, text);

   return {
      id,
      title: text.title,
      typed: text.typed,
      last: text.last,
      currentTextId: state.textMode.currentTextId
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
