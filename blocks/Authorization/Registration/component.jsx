import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import { validateEmail } from 'Utils/validation';
import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

class Registration extends Component {
  state = {
    submitted: false,
  };

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
      handleSubmit,
      submitting,
      invalid,
      isModal,
    } = this.props;

    const state = { modal: false };

    if (isModal) {
      state.modal = true;
    }

    let content = (
      <form className="auth__form" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          className="auth__row"
          name="email"
          component={RenderField}
          type="email"
          label="Email"
        />

        <Button type="submit" disabled={invalid} isLoader={submitting}>Sign up</Button>

        <p className="auth__hint">Already registered? <Link className="auth__link1" to={{ pathname: '/auth/login', state }}>Log in now</Link></p>
      </form>
    );

    if (this.state.submitted) {
      content = (
        <p>
          You’ve got mail, <br />
          Please click the link in the email we just sent you so we can verify your account.
        </p>
      );
    }

    return (
      <div className="auth">
        <h3 className="auth__title">Registration</h3>
        {content}
      </div>
    );
  }
}

const validate = values => ({
  ...validateEmail(values.get('email')),
});

export default reduxForm({
  form: 'registration',
  validate,
  asyncBlurFields: ['email'],
})(Registration);
