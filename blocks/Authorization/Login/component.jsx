import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

class Login extends Component {
  onForgotClickHandler = e => {
    e.preventDefault();

    this.props.openModal('ForgotPassword');
  };

  onRegClickHandler = e => {
    e.preventDefault();

    this.props.openModal('Registration');
  };

  handleSubmit = values => {
    const {
      props: {
        setEmail,
        setRefreshToken,
        setAccessToken,
        fetchJSON,
      },
    } = this;

    return fetchJSON('/login', {
      body: values.toJS(),
    })
      .then(({ email, refresh, access }) => {
        setEmail(email);
        setRefreshToken(refresh);
        setAccessToken(access);
      })
      .catch(data => {
        if (data.errors) {
          throw new SubmissionError(data.errors);
        }
      });
  };

  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
    } = this.props;

    return (
      <form className="auth auth__form" onSubmit={handleSubmit}>
        <h3 className="auth__title">Log In</h3>

        <Field className="auth__row" name="email" component={RenderField} type="email" label="Email" />

        <Field className="auth__row" name="password" component={RenderField} type="password" label="Password" />

        <p className="auth__fp-wrap">
          <a className="auth__fp" href="" onClick={this.onForgotClickHandler}>Forgot password?</a>
        </p>

        <Button type="submit" disabled={invalid} isLoader={submitting}>Log In</Button>

        <p className="auth__hint">
          Not yet registered? <a className="auth__link1" href="" onClick={this.onRegClickHandler}>Registration</a>
        </p>
      </form>
    );
  }
}

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

export default reduxForm({
  form: 'login',
  validate,
})(Login);
