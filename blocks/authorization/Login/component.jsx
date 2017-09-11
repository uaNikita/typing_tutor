import React, { Component } from 'react';
import { SubmissionError } from 'redux-form/immutable';

import { fetchJSON } from 'Utils/requestAPI';
import LoginForm from '../LoginForm/container';

class Login extends Component {
  handleSubmit = values => fetchJSON('/login', {
    body: values.toJS(),
  })
    .then(() => {
      console.log(12345);
    })
    .catch(data => {
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
