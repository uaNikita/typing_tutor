import React, { Component } from 'react';
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

   _handleSubmit() {

      fetch('/signup')
         .then(response => {
            console.log('response', response);

            return response.text();
         });

      console.log('_handleSubmit');

   }

}

export default Registration;
