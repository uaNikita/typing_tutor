import React, { Component } from 'react';
import { SubmissionError } from 'redux-form/immutable';
import LoginForm from '../LoginForm/container.jsx';

class Login extends Component {

   render() {
      return (
         <div className="auth">
            <h3 className="auth__title">Log In</h3>
            <LoginForm onSubmit={this.handleSubmit} />
         </div>
      );
   }

   handleSubmit(values) {

      return fetch('/auth/login', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(values.toJS())
      })
         .then(response => response.json())
         .then(data => {

            console.log('data', data);

            if (data.errors) {
               throw new SubmissionError(data.errors);
            }

         });
     
   }

}


export default Login;
