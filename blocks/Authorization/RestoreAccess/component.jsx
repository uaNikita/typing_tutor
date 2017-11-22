import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';

import { validateEmail } from 'Utils/validation';
import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

class RestoreAccess extends Component {
  handleSubmit = values => {
    const {
      props: {
        fetchJSON,
      },
    } = this;

    return fetchJSON('/auth/restore-access', {
      body: values.toJS(),
    });
  };

  render() {
    const {
      props: {
        handleSubmit,
        submitting,
        invalid,
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
          <Button type="submit" disabled={invalid} isLoader={submitting}>Restore access</Button>
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

export default reduxForm({
  form: 'restore-access',
  validate,
  asyncBlurFields: ['email'],
})(RestoreAccess);
