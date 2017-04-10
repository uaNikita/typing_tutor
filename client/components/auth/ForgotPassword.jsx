import React, { Component } from 'react';
import ForgotPasForm from './ForgotPasForm.jsx';

class ForgotPas extends Component {

   render() {
      return (
         <div className="auth">
            <h3 className="auth__title">Password reset</h3>
            <ForgotPasForm onSubmit={this.handleSubmit} />
         </div>
      );
   }

   handleSubmit() {

   }

}


export default ForgotPas;