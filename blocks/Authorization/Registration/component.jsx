import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import { email as regexEmail } from 'Utils/regularExpresions';
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
    } = this.props;

    let content = (
      <form className="auth__form" onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          className="auth__row"
          name="email"
          component={RenderField}
          type="email"
          label="Email"
        />

        <button className="button" type="submit" disabled={!valid || submitting}>Sign Up</button>

        <p className="auth__hint">Already registered? <Link className="auth__link1" to={{ pathname: '/auth/login', state: { modal: true } }}>Log in now</Link></p>
      </form>
    );

    return (
      <div className="auth">
        <h3 className="auth__title">Registration</h3>
        {content}
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  const email = values.get('email');

  if (!email) {
    errors.email = 'Required';
  }
  else if (!regexEmail.test(email)) {
    errors.email = 'Email isn\'t valid';
  }

  return errors;
};

export default reduxForm({
  form: 'registration',
  validate,
  asyncBlurFields: ['email'],
})(Registration);
