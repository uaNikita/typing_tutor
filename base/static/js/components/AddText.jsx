import React, {Component} from 'react';
import {Link} from 'react-router'

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

      console.log(this.props.history);

      this.props.addText(values.title, values.text);

   }

}

export default AddText
