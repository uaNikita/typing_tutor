import React, { Component } from 'react';
import ForgotPasswordForm from '../ForgotPasswordForm/container.jsx';

class ForgotPassword extends Component {

   render() {
      return (
         <div className="auth">
            <h3 className="auth__title">Password reset</h3>
            <ForgotPasswordForm onSubmit={this.handleSubmit} />
         </div>
      );
   }

   handleSubmit() {

   }

}


export default ForgotPassword;
