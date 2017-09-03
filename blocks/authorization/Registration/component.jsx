import React, { Component } from 'react';
import { SubmissionError } from 'redux-form/immutable';
import { requestJSON } from 'Utils/requestAPI';

import RegistrationForm from '../RegistrationForm/container';

class Registration extends Component {
  handleSubmit = values => {
    const { setEmail, setBearerToken, setAccessToken } = this.props;

    return requestJSON('/signup', {
      body: values.toJS(),
    })
      .then(data => {
        setEmail(data.email);
        setBearerToken(data.tokens.refresh);
        setAccessToken(data.tokens.access);
      })
      .catch(data => {
        throw new SubmissionError(data.errors);
      });
  };

  render() {
    return (
      <div className="auth">
        <h3 className="auth__title">Registration</h3>
        <RegistrationForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Registration;
