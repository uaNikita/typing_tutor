import { connect } from 'react-redux';

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
  }
);

export default connect(
  null,
  mapDispatchToProps,
)(AddText);
