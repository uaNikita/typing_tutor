import React, { Component } from 'react';
import { SubmissionError } from 'redux-form/immutable';
import RegistrationForm from '../RegistrationForm/container.jsx';

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

      return fetch('/auth/signup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(values.toJS())
      })
         .then(response => {
            // throw new SubmissionError({
            //    email: 'User does not exist'
            // });

            return response.json();
         }).then(data => {

            console.log('data', data, typeof data);

         });

   }

}

export default Registration;
