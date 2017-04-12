import React, { Component } from 'react';
import RegistrationForm from '../../containers/auth/RegistrationForm.jsx';

class Registration extends Component {

   render() {
      return (
         <div className="auth">
            <h3 className="auth__title">Registration</h3>
            <RegistrationForm onSubmit={this.handleSubmit} />
         </div>
      );
   }

   handleSubmit() {

   }

}

export default Registration;
