import React, { Component } from 'react';
import RegisterForm from './RegisterForm.jsx';


class Register extends Component {

   render() {
      return (
         <div className="auth">
            <h3 className="auth__title">Registration</h3>
            <RegisterForm onSubmit={this.handleSubmit} />
         </div>
      );
   }

   handleSubmit() {

   }

}


export default Register;