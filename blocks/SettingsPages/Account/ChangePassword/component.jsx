import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import Button from 'Blocks/Button/component.jsx';
import RenderField from 'Blocks/RenderField/component.jsx';

import { validatePassword } from 'Utils/validation';

import styles from './change-password.module.styl';

class ChangePassword extends Component {
  handleSubmit = values => this.props.fetchJSON('/auth/signup', { body: values.toJS() }, true)
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
      props: {
        handleSubmit,
        submitting,
        invalid,
      },
      state: {
        submitted,
      },
    } = this;

    return (
      <form styleName="root" onSubmit={handleSubmit(this.handleSubmit)}>
        <h3 styleName="title">Change password</h3>

        <Field name="old-password" component={RenderField} type="password" label="Old password" />
        <Field name="new-password" component={RenderField} type="password" label="New password" />
        <Field name="confirm-new-password" component={RenderField} type="password" label="Confirm new password" />

        <Button
          styleName="button"
          type="submit"
          disabled={invalid}
          isLoader={submitting}>
          Update password
        </Button>

        {submitted ? 1 : ''}
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  const newPassword = values.get('new-password');
  const confirmNewPassword = values.get('confirm-new-password');

  if (newPassword !== confirmNewPassword) {
    errors['confirm-new-password'] = 'Password does not match';
  }

  return {
    ...errors,
    ...validatePassword('old-password', values.get('old-password')),
    ...validatePassword('new-password', values.get('new-password')),
    ...validatePassword('confirm-new-password', values.get('confirm-new-password')),
  };
};

export default reduxForm({
  form: 'change-password',
  validate,
})(CSSModules(ChangePassword, styles));
