import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import { validateEmail } from 'Utils/validation';
import RenderField from 'Blocks/RenderField/component.jsx';

class Registration extends Component {
  handleSubmit = values => this.props.fetchJSON('/auth/signup', { body: values.toJS() }, true)
    .catch(data => {
      if (data.errors) {
        throw new SubmissionError(data.errors);
      }
    });

  render() {
    const {
      handleSubmit,
      submitting,
      valid,
      isModal,
    } = this.props;

    const state = { modal: false };

    if (isModal) {
      state.modal = true;
    }

    return (
      <div className="auth">
        <h3 className="auth__title">Registration</h3>
        <form className="auth__form" onSubmit={handleSubmit(this.handleSubmit)}>
          <Field
            className="auth__row"
            name="email"
            component={RenderField}
            type="email"
            label="Email"
          />

          <button className="button" type="submit" disabled={!valid || submitting}>Sign Up</button>

          <p className="auth__hint">Already registered? <Link className="auth__link1" to={{ pathname: '/auth/login', state }}>Log in now</Link></p>
        </form>
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
