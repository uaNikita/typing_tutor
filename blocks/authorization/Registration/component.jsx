import React, { Component } from 'react';
import { SubmissionError } from 'redux-form/immutable';

import RegistrationForm from '../RegistrationForm/container';

class Registration extends Component {
  state = {
    submitted: false,
  };

  handleSubmit = values => this.props.fetchJSON('/signup', {
    body: values.toJS(),
  }, true)
    .then(() => this.setState({
      submitted: true,
    }))
    .catch(data => {
      if (data.errors) {
        throw new SubmissionError(data.errors);
      }
    });

  render() {
    let content = <RegistrationForm onSubmit={this.handleSubmit} />;

    if (this.state.submitted) {
      content = 'Email was sent';
    }

    return (
      <div className="auth">
        <h3 className="auth__title">Registration</h3>
        {content}
      </div>
    );
  }
}

export default Registration;
