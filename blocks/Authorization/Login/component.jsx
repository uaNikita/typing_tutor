import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import { validateEmail, validatePassword } from 'Utils/validation';
import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

class Login extends Component {
  state = {
    accountIsNotActive: false,
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

    return fetchJSON('/auth/login', {
      body: values.toJS(),
    })
      .then(({ email, refresh, access }) => {
        setEmail(email);
        setRefreshToken(refresh);
        setAccessToken(access);
      })
      .catch(data => {
        if (data.status === 403) {
          this.setState({
            accountIsNotActive: true,
          });
        }

        if (data.errors) {
          throw new SubmissionError(data.errors);
        }
      });
  };

  handleSendVerifyLink = () => {
    console.log('handleSendVerifyLink');
  };

  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
      isModal,
    } = this.props;

    const state = { modal: false };

    if (isModal) {
      state.modal = true;
    }

    let content = (
      <form className="auth__form" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field className="auth__row" name="email" component={RenderField} type="email" label="Email" />

        <Field className="auth__row" name="password" component={RenderField} type="password" label="Password" />

        <p className="auth__fp-wrap">
          <Link
            to={{ pathname: '/auth/restore-access', state }}
            className="auth__fp">Restore access?</Link>
        </p>

        <Button type="submit" disabled={invalid} isLoader={submitting}>Log In</Button>

        <p className="auth__hint">
          Not yet registered? <Link to={{ pathname: '/auth/registration', state }} className="auth__link1">Registration</Link>
        </p>
      </form>
    );

    if (this.state.accountIsNotActive) {
      content = [
        <p key="email-not-verified">Your account email is not verified, <br />
          Please click the link bellow and we will send you a link to verify email.</p>,
        <button key="verify-link" className="button" onClick={this.handleSendVerifyLink}>Send verify link</button>,
      ];
    }

    return (
      <div className="auth">
        <h3 className="auth__title">Log In</h3>

        {content}
      </div>
    );
  }
}

const validate = values => ({
  ...validateEmail(values.get('email')),
  ...validatePassword(values.get('password')),
});

export default reduxForm({
  form: 'login',
  validate,
})(Login);
