import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

import { validateField, validatePassword } from 'Utils/validation';

import styles from './delete-account.module.styl';

class DeleteAccountModal extends Component {
  handleSubmit = () => {
    this.props.fetchJSON('/profile/delete')
      .catch(data => {
        if (data.errors) {
          throw new SubmissionError(data.errors);
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
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        Are you sure you want to do this?
        <br />

        To verify, type <span styleName="delete-text">delete my account</span> below:
        <Field name="delete_my_account" component={RenderField} type="text" />

        <div styleName="confirm">
          Confirm your password:
          <Field name="confirm_new_password" component={RenderField} type="password" label="Confirm your password" />
        </div>

        <Button type="submit" disabled={invalid} isLoader={submitting}>Delete my account</Button>
      </form>
    );
  }
}


const validate = values => {
  const deleteMyAccountValue = values.get('delete_my_account');

  const errors = {
    ...validateField('delete_my_account', deleteMyAccountValue),
  };

  if (!errors.delete_my_account && deleteMyAccountValue !== 'delete my account') {
    errors.delete_my_account = 'Message is wrong';
  }

  return {
    ...errors,
    ...validatePassword('confirm_new_password', values.get('confirm_new_password')),
  };
};

export default reduxForm({
  form: 'delete-account',
  validate,
})(CSSModules(DeleteAccountModal, styles));
