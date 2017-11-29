import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import CSSModules from 'react-css-modules';

import RenderField from 'Blocks/RenderField/component.jsx';
import ModalSimple from 'Blocks/ModalSimple.jsx';

import { validatePassword } from 'Utils/validation';

import styles from './delete-account.module.styl';

class DeleteAccount extends Component {
  state = {
    modal: false,
  };

  handleClickButton = () => {
    this.setState({
      modal: true,
    });
  };

  handlerCloseModal = () => {
    this.setState({
      modal: false,
    });
  };

  render() {
    const {
      state: {
        modal,
      },
    } = this;

    return (
      <div>
        <h3 styleName="title">Delete Account</h3>

        <button className="button" onClick={this.handleClickButton}>Delete account</button>

        <ModalSimple active={modal} onClose={this.handlerCloseModal}>
          Are you sure you want to do this?

          To verify, type delete my account below:
          <Field name="delete-my-account" component={RenderField} type="text" />

          Confirm your password:
          <Field name="confirm-new-password" component={RenderField} type="password" label="Confirm your password" />
        </ModalSimple>
      </div>
    );
  }
}


const validate = values => {
  const errors = {};

  return {
    ...errors,
    ...validatePassword('confirm-new-password', values.get('confirm-new-password')),
  };
};

export default reduxForm({
  form: 'delete-account',
  validate,
})(CSSModules(DeleteAccount, styles));
