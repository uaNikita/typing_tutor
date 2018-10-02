import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import RenderField from 'Blocks/RenderField/component';
import Button from 'Blocks/Button/component';

import { validateField, validatePassword } from 'Utils/validation';

import styles from './delete-account.module.styl';

class DeleteAccountModal extends Component {
  handleSubmit = (values) => {
    const {
      props: {
        history: {
          push,
        },
        logOut,
        fetchJSON,
        setGlobalMessage,
      },
    } = this;

    const body = values.toJS();

    delete body.deleteMyAccount;

    return fetchJSON('/user/delete', { body })
      .then((res) => {
        if (res.ok) {
          logOut();

          push('/');

          setGlobalMessage('Accound was deleted');
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
        <p styleName="title">Are you sure you want to do this?</p>

        <Field
          name="deleteMyAccount"
          component={RenderField}
          type="text"
          label={'To verify, type "delete my account"'}
        />

        <Field
          name="confirmNewPassword"
          component={RenderField}
          type="password"
          label="Confirm your password"
        />

        <Button type="submit" disabled={invalid} isLoader={submitting}>
          Delete my account
        </Button>
      </form>
    );
  }
}


const validate = (values) => {
  const deleteMyAccountValue = values.get('deleteMyAccount');

  const errors = {
    ...validateField('deleteMyAccount', deleteMyAccountValue),
  };

  if (!errors.deleteMyAccount && deleteMyAccountValue !== 'delete my account') {
    errors.deleteMyAccount = 'Message is wrong';
  }

  return {
    ...errors,
    ...validatePassword('confirmNewPassword', values.get('confirmNewPassword')),
  };
};

export default reduxForm({
  form: 'delete-account',
  validate,
})(withRouter(CSSModules(DeleteAccountModal, styles)));
