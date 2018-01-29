import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import RenderField from 'Blocks/RenderField/component.jsx';
import ModalSimple from 'Blocks/ModalSimple.jsx';
import Button from 'Blocks/Button/component.jsx';

import { validateField, validatePassword } from 'Utils/validation';

import styles from './delete-account.module.styl';

class DeleteAccount extends Component {
  state = {
    modal: false,
  };

  handleClickButton = () => this.setState({
    modal: true,
  });

  handlerCloseModal = () => this.setState({
    modal: false,
  });

  handleSubmit = () => {

  };

  render() {
    const {
      props: {
        handleSubmit,
        submitting,
        invalid,
      },
      state: {
        modal,
      },
    } = this;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <h3 styleName="title">Delete Account</h3>

        <button className="button" styleName="button" onClick={this.handleClickButton}>Delete account</button>

        <ModalSimple active={modal} onClose={this.handlerCloseModal} >
          Are you sure you want to do this?
          <br />

          To verify, type <span styleName="delete-text">delete my account</span> below:
          <Field name="delete-my-account" component={RenderField} type="text" />

          <div styleName="confirm">
            Confirm your password:
            <Field name="confirm-new-password" component={RenderField} type="password" label="Confirm your password" />
          </div>

          <Button type="submit" disabled={invalid} isLoader={submitting}>Delete my account</Button>
        </ModalSimple>
      </form>
    );
  }
}


const validate = values => {
  const deleteMyAccountValue = values.get('delete-my-account');

  const errors = {
    ...validateField('delete-my-account', deleteMyAccountValue),
  };

  if (!errors['delete-my-account'] && deleteMyAccountValue !== 'delete my account') {
    errors['delete-my-account'] = 'Message is wrong';
  }

  return {
    ...errors,
    ...validatePassword('confirm-new-password', values.get('confirm-new-password')),
  };
};

export default reduxForm({
  form: 'delete-account',
  validate,
})(CSSModules(DeleteAccount, styles));
