import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import Button from 'Blocks/Button/component.jsx';
import RenderField from 'Blocks/RenderField/component.jsx';

import { validatePassword } from 'Utils/validation';

import styles from './change-password.module.styl';

class Block extends Component {
  handleSubmit = values => {
    const {
      props: {
        fetchJSON,
        setGlobalMessage,
        reset,
      },
    } = this;

    const body = values.toJS();

    delete body.confirm_new_password;

    return fetchJSON('/user/change-password', { body })
      .then(res => {
        if (res.ok) {
          setGlobalMessage('Password was changed');

          reset();

          // remove focus from fields
          window.focus();
        }
        else if (res.data.errors) {
          throw new SubmissionError(res.data.errors);
        }
      });
  };

  render() {
    const {
      props: {
        handleSubmit,
        submitting,
        invalid,
      },
    } = this;

    return (
      <form styleName="root" onSubmit={handleSubmit(this.handleSubmit)}>
        <h3 styleName="title">Change password</h3>

        <Field
          name="old_password"
          component={RenderField}
          type="password"
          label="Old password" />

        <Field
          name="new_password"
          component={RenderField}
          type="password"
          label="New password" />

        <Field
          name="confirm_new_password"
          component={RenderField}
          type="password"
          label="Confirm new password" />

        <Button
          styleName="button"
          type="submit"
          disabled={invalid}
          isLoader={submitting}>
          Update password
        </Button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  const newPassword = values.get('new_password');
  const confirmNewPassword = values.get('confirm_new_password');

  if (newPassword !== confirmNewPassword) {
    errors.confirm_new_password = 'Password does not match';
  }

  return {
    ...errors,
    ...validatePassword('old_password', values.get('old_password')),
    ...validatePassword('new_password', values.get('new_password')),
    ...validatePassword('confirm_new_password', values.get('confirm_new_password')),
  };
};

export default reduxForm({
  form: 'change-password',
  validate,
})(CSSModules(Block, styles));
