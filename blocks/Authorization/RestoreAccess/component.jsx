import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';

import { validateEmail } from 'Utils/validation';
import RenderField from 'Blocks/RenderField/component.jsx';

class RestoreAccess extends Component {
  handleSubmit = () => {
    this.a = 1;
  };

  render() {
    const {
      props: {
        handleSubmit,
        isModal,
      },
    } = this;

    const state = { modal: false };

    if (isModal) {
      state.modal = true;
    }

    return (
      <form className="auth auth__form auth__form_password-reset" onSubmit={handleSubmit(this.handleSubmit)}>
        <h3 className="auth__title">Password reset</h3>

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
          <Link className="auth__link2" to={{ pathname: '/auth/login', state }}>Log in now</Link>
        </p>

      </form>
    );
  }
}

const validate = values => ({
  ...validateEmail(values.get('email')),
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = values => sleep(1000)
  .then(() => {
    let result = false;

    if (!['john', 'paul', 'george', 'ringo'].includes(values.get('email'))) {
      result = { email: 'That email does not exist' };
    }

    return result;
  });

export default reduxForm({
  form: 'restore-access',
  validate,
  asyncValidate,
  asyncBlurFields: ['email'],
})(RestoreAccess);
