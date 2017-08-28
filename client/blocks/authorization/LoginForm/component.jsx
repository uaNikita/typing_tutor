import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from 'Blocks/RenderField/component.jsx';

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

class LoginForm extends Component {
  onForgotClickHandler = e => {
    e.preventDefault();

    this.props.openModal('ForgotPassword');
  };

  onRegClickHandler = e => {
    e.preventDefault();

    this.props.openModal('Registration');
  };

  render() {
    const {
      handleSubmit,
      submitting,
      valid,
    } = this.props;

    return (
      <form className="auth__form" onSubmit={handleSubmit}>

        <Field className="auth__row" name="email" component={RenderField} type="email" label="Email" />

        <Field className="auth__row" name="password" component={RenderField} type="password" label="Password" />

        <p className="auth__fp-wrap">
          <a className="auth__fp" href onClick={this.onForgotClickHandler}>Forgot password?</a>
        </p>

        <button className="button" type="submit" disabled={!valid || submitting}>Log In</button>

        <p className="auth__hint">
          Not yet registered? <a className="auth__link1" href onClick={this.onRegClickHandler}>Registration</a>
        </p>
      </form>
    );
  }
}


export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
