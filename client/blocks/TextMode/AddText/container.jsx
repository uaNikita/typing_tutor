import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { addText, selectLastText } from 'Redux/modules/text-mode';
import AddText from './component.jsx';

const mapDispatchToProps = dispatch => (
  {
    addText: (title, text) => {
      dispatch(addText(title, text));
    },
    selectAddedText: () => {
      dispatch(selectLastText());
    },
    goToTextList: () => {
      dispatch(push('/settings/text-mode'));
    },
  }
);

export default connect(
  null,
  mapDispatchToProps,
)(AddText);
