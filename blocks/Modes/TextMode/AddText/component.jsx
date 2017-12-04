import React, { Component } from 'react';

import AddTextForm from '../AddTextForm.jsx';

class AddText extends Component {
  textFormHandleSubmit = values => {
    const {
      addText,
      selectAddedText,
      history: {
        push,
      },
    } = this.props;

    addText(values.title, values.text);

    if (values['select-text']) {
      selectAddedText();
    }

    push('/modes/text');
  };

  render() {
    return (
      <div className="add-text">

        <AddTextForm
          className="settings-text__add-text-form"
          onSubmit={this.textFormHandleSubmit}
        />

      </div>
    );
  }
}

export default AddText;
