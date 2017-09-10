import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import generatePassword from 'password-generator';

import { email as regexEmail } from 'Utils/regularExpresions';
import { fetchJSON } from 'Utils/requestAPI';
import RenderField from 'Blocks/RenderField/component.jsx';

const asyncValidate = values => fetchJSON('check-email', {
  body: {
    email: values.get('email'),
  },
})
  .then(() => {})
  .catch(({ errors }) => {
    if (errors) {
      throw errors;
    }
  });

const validate = values => {
  const errors = {};

  const email = values.get('email');

  if (!email) {
    errors.email = 'Required';
  }
  else if (!regexEmail.test(email)) {
    errors.email = 'Email isn\'t valid';
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
  };

  onCreatePasswordChange = () => {
    let password = '';

    if (!this.state.createPassword) {
      password = generatePassword(5, false, /[\w\d]/);
    }

    this.props.array.insert('password', 0, password);

    this.setState({
      createPassword: !this.state.createPassword,
      password,
    });
  };

  onLoginClick = e => {
    e.preventDefault();

    this.props.openModal('Login');
  };

  passwordChange = () => {
    if (this.state.createPassword) {
      this.setState({
        createPassword: false,
        password: '',
      });
    }
  };

  render() {
    const {
      handleSubmit,
      submitting,
      valid,
    } = this.props;

    return (
      <form className="auth__form" onSubmit={handleSubmit}>
        <Field
          className="auth__row"
          name="email"
          component={RenderField}
          type="email"
          label="Email"
        />

        <Field
          className="auth__row"
          name="password"
          component={RenderField}
          type="text"
          label="Password"
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
  asyncValidate,
  asyncBlurFields: ['email'],
})(RegistrationForm);
