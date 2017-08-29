import React, { Component } from 'react';

import ForgotPasswordForm from '../ForgotPasswordForm/container.jsx';

class ForgotPassword extends Component {
  handleSubmit = () => {
    this.a = 1;
  };

  render() {
    return (
      <div className="auth">
        <h3 className="auth__title">Password reset</h3>
        <ForgotPasswordForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default ForgotPassword;

