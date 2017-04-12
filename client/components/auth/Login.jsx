import React, { Component } from 'react';
import LoginForm from './LoginForm.jsx';

class Login extends Component {

   render() {
      return (
         <div className="auth">
            <h3 className="auth__title">Log In</h3>
            <LoginForm onSubmit={this.handleSubmit} />
         </div>
      );
   }

   handleSubmit() {

   }

}


export default Login;