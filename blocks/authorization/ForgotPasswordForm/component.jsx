import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';

import RenderField from 'Blocks/RenderField/component.jsx';

const validate = values => {
  const errors = {};

  if (!values.get('email')) {
    errors.email = 'Required';
  }

  return errors;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = values => sleep(1000)
  .then(() => {
    let result = false;

    if (!['john', 'paul', 'george', 'ringo'].includes(values.get('email'))) {
      result = { email: 'That email does not exist' };
    }

    return result;
  });

class ForgotPasswordForm extends Component {
  onBackClickHandler = e => {
    e.preventDefault();

    this.props.openModal('Login');
  };

  render() {
    return (
      <form className="auth__form auth__form_password-reset">
        <Field
          name="email"
          component={RenderField}
          type="email"
          label="Email"
        />

        <div className="auth__button-wrap">
          <button className="button">Send new password</button>
        </div>

        <p className="auth__hint">
          ← <a className="auth__link2" href onClick={this.onBackClickHandler}>Back</a>
        </p>
      </form>
    );
  }
}

export default reduxForm({
  form: 'forgot-password',
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(ForgotPasswordForm);
