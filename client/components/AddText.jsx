import React, {Component} from 'react';

import AddTextForm from '../components/AddTextForm.jsx';

class AddText extends Component {

   render() {

      return (
        <div className="add-text">

           <AddTextForm
             className="settings-text__add-text-form"
             onSubmit={ this._textFormHandleSubmit.bind(this) }
           />

        </div>
      )
   }

   _textFormHandleSubmit(values) {

      const {addText, selectAddedText, goToTextList} = this.props;

      addText(values.title, values.text);

      if (values['select-text']) {

         selectAddedText();

      }

      goToTextList();

   }

}

export default AddText
