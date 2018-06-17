import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

import { validateEmail } from 'Utils/validation';
import RenderField from 'Blocks/RenderField/component.jsx';
import Button from 'Blocks/Button/component.jsx';

class SignUp extends Component {
  state = {
    submitted: false,
  };

  handleSubmit = values =>
    this.props.fetchJSON('/auth/signup', { body: values.toJS() }, true)
      .then(res => {
        if (res.ok) {
          this.setState({
            submitted: true,
          });
        }
        else if (res.data.errors) {
          throw new SubmissionError(res.data.errors);
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
      },
    } = this;

    const state = { modal: false };

    if (isModal) {
      state.modal = true;
    }

    return (
      <div className="auth">
        <h3 className="auth__title">Registration</h3>

        {submitted ? (
          <p>
            You’ve got mail, <br />
            Please click the link in the email we just sent you so we can verify your account.
          </p>
        ) : (
          <form className="auth__form" onSubmit={handleSubmit(this.handleSubmit)}>
            <Field
              className="auth__row"
              name="email"
              component={RenderField}
              type="email"
              label="Email"
            />

            <Button type="submit" disabled={invalid} isLoader={submitting}>Sign up</Button>

            <p className="auth__hint">
              Already registered? <Link className="auth__link1" to="/authorization/sign-in">Log in now</Link>
            </p>
          </form>
        )}
      </div>
    );
  }
}

const validate = values => ({
  ...validateEmail('email', values.get('email')),
});

export default reduxForm({
  form: 'sign-up',
  validate,
  asyncBlurFields: ['email'],
})(SignUp);
