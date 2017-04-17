import React, { Component } from 'react';
import $ from 'jquery';
import RegistrationForm from '../../containers/auth/RegistrationForm.jsx';

class Registration extends Component {

   render() {
      return (
         <div className="auth">
            <h3 className="auth__title">Registration</h3>
            <RegistrationForm onSubmit={this._handleSubmit} />
         </div>
      );
   }

   _handleSubmit(values) {

      // fetch('/auth/signup', {
      //    method: 'POST',
      //    body: values.toJS()
      // })
      //    .then(response => {
      //       return response.text();
      //    })
      //    .then(json => {
      //       console.log('json', json);
      //    });

      console.log('_handleSubmit');

      $.ajax({
         method: 'POST',
         url: '/auth/signup',
         data: values.toJS()
      })
         .done(function() {
            console.log('Data Saved');
         });


   }

}

export default Registration;
