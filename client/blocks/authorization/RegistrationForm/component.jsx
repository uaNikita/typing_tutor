import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import generatePassword from 'password-generator';

import RenderField from './RenderField.jsx';
import RenderPasswordField from './RenderPasswordField.jsx';

const validate = values => {
  const errors = {};

  if (!values.get('email')) {
    errors.email = 'Required';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  }

  return errors;
};

class RegistrationForm extends Component {
  state = {
    password: '',
    createPassword: false,
  }

  onCreatePasswordChange = () => {
    let password = '';

    if (!this.state.createPassword) {
      password = generatePassword(5, false, /[\w\d]/);
    }

    this.setState({
      createPassword: !this.state.createPassword,
      password,
    });
  }

  onLoginClick = e => {
    e.preventDefault();

    this.props.openModal('Login');
  }

  passwordChange = () => {
    if (this.state.createPassword) {
      this.setState({
        createPassword: false,
        password: '',
      });
    }
  }

  render() {
    const {
      handleSubmit,
      submitting,
      valid,
    } = this.props;

    return (
      <form className="auth__form" onSubmit={handleSubmit}>
        <Field
          name="email"
          component={RenderField}
          type="email"
          label="Email"
        />

        <Field
          name="password"
          component={RenderPasswordField}
          type="password"
          label="Password"
          generatedPassword={this.state.password}
          onPasswordChange={this.passwordChange}
        />

        <label className="auth__cp">
          <input
            className="auth__cp-control"
            type="checkbox"
            checked={this.state.createPassword}
            onChange={this.onCreatePasswordChange} />
          Create a password for me
        </label>

        <button className="button" type="submit" disabled={!valid || submitting}>Sign Up</button>

        <p className="auth__hint">Already registered? <a className="auth__link1" href onClick={this.onLoginClick}>Log in now</a></p>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  validate,
  // asyncValidate,
  // asyncBlurFields: ['email']
})(RegistrationForm);
