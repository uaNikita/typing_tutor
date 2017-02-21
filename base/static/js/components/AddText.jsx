import React, {Component} from 'react';
import {Link} from 'react-router'

import AddTextForm from '../containers/AddTextForm.jsx';

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

   _textFormHandleSubmit() {
      console.log(234);
   }

}

export default AddText
