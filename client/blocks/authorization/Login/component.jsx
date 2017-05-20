import React, { Component } from 'react';
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

   handleSubmit() {

     console.log(123);
     
   }

}


export default Login;
