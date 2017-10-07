import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import generatePassword from 'password-generator';

import { email as regexEmail } from 'Utils/regularExpresions';
import RenderField from 'Blocks/RenderField/component.jsx';

class Registration extends Component {
  state = {
    password: '',
    createPassword: false,
    submitted: false,
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

  handleSubmit = values => this.props.fetchJSON('/signup', { body: values.toJS() }, true)
    .then(() => this.setState({
      submitted: true,
    }))
    .catch(data => {
      if (data.errors) {
        throw new SubmissionError(data.errors);
      }
    });

  render() {
    const {
      handleSubmit,
      submitting,
      valid,
    } = this.props;

    let content = (
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

        <p className="auth__hint">Already registered? <a className="auth__link1" href="" onClick={this.onLoginClick}>Log in now</a></p>
      </form>
    );

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

export default reduxForm({
  form: 'registration',
  validate,
  asyncBlurFields: ['email'],
})(Registration);
