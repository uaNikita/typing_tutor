import React, { Component } from 'react';
import { SubmissionError } from 'redux-form/immutable';

import LoginForm from '../LoginForm/container';

class Login extends Component {
  handleSubmit = values => {
    const {
      props: {
        setEmail,
        setBearerToken,
        setAccessToken,
        fetchJSON,
        closeModal,
      },
    } = this;

    return fetchJSON('/login', {
      body: values.toJS(),
    })
      .then(({ bearer, access }) => {
        setEmail(values.get('email'));
        setBearerToken(bearer);
        setAccessToken(access);
        closeModal();
      })
      .catch(data => {
        if (data.errors) {
          throw new SubmissionError(data.errors);
        }
      });
  };

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
