import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

class Login extends Component {
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
          <Link
            to={{ pathname: '/auth/restore-access', state: { modal: true } }}
            className="auth__fp">Restore access?</Link>
        </p>

        <Button type="submit" disabled={invalid} isLoader={submitting}>Log In</Button>

        <p className="auth__hint">
          Not yet registered? <Link to={{ pathname: '/auth/registration', state: { modal: true } }} className="auth__link1">Registration</Link>
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
  asyncBlurFields: ['email'],
})(Login);
