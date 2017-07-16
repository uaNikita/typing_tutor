import React, { Component } from 'react';

import AddTextForm from '../AddTextForm.jsx';

class AddText extends Component {
  textFormHandleSubmit = values => {
    const { addText, selectAddedText, goToTextList } = this.props;

    addText(values.title, values.text);

    if (values['select-text']) {
      selectAddedText();
    }

    goToTextList();
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
