import React, { Component } from 'react';
import { SubmissionError } from 'redux-form/immutable';
import LoginForm from '../LoginForm/container';

class Login extends Component {
  handleSubmit = values => fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values.toJS()),
  })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        throw new SubmissionError(data.errors);
      }
    });

  render() {
    return (
      <div className="auth">
        <h3 className="auth__title">Log In</h3>
        <LoginForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Login;
