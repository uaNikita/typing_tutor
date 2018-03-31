import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';

import { validateEmail } from 'Utils/validation';
import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

class RestoreAccess extends Component {
  state = {
    submitted: false,
  };

  handleSubmit = values =>
    this.props.fetchJSON('/auth/restore-access', {
      body: values.toJS(),
    })
      .then(res => {
        if (res === 'OK') {
          this.setState({
            submitted: true,
          });
        }
      });

  render() {
    const {
      props: {
        handleSubmit,
        submitting,
        invalid,
        isModal,
      },
      state: {
        submitted,
      }
    } = this;

    const state = { modal: false };

    if (isModal) {
      state.modal = true;
    }

    return (
      <form className="auth auth__form auth__form_password-reset" onSubmit={handleSubmit(this.handleSubmit)}>
        <h3 className="auth__title">Password reset</h3>

        {submitted ? (
          <p>
            You’ve got mail, <br />
            Please check ou your email with new password.
          </p>
        ) : [
          <Field
            key="email"
            name="email"
            component={RenderField}
            type="email"
            label="Email"
          />,

          <Button key="submit" type="submit" disabled={invalid} isLoader={submitting}>Restore access</Button>,

          <p key="log-in" className="auth__hint">
            <Link className="auth__link2" to={{ pathname: '/sign-in', state }}>Log in now</Link>
          </p>
        ]}
      </form>
    );
  }
}

const validate = values => ({
  ...validateEmail('email', values.get('email')),
});

export default reduxForm({
  form: 'restore-access',
  validate,
  asyncBlurFields: ['email'],
})(RestoreAccess);
