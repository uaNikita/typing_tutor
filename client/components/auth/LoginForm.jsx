import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form/immutable'
import classNames from 'classNames';

const validate = values => {

  let errors = {};

  if (!values.get('email')) {
    errors.email = 'Required';
  }
  if (!values.get('password')) {
    errors.password = 'Required';
  }

  return errors;

};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {

      if (!['john@test.com', 'paul@test.com', 'george@test.com', 'ringo@test.com'].includes(values.get('email'))) {
        return {email: 'That username is taken'};
      }

    });
};

class renderField extends Component {
  render() {
    const {
            input,
            label,
            type,
            meta: {
              asyncValidating,
              touched,
              error
            }
          } = this.props;

    var rowClass = 'auth__row';

    if (asyncValidating) {
      rowClass = classNames(rowClass, 'async-validating');
    }

    return (
      <div className={rowClass}>
        {touched && error && <p className="error">{error}</p>}
        <input className="auth__control" {...input} type={type} placeholder={label} />
      </div>
    );
  }
}


class LoginForm extends Component {

  render() {

    const {
            handleSubmit,
            submitting,
            valid
          } = this.props;

    return (
      <form className="auth__form" onSubmit={ handleSubmit(this._handleSubmit) }>

        <Field name="email" component={renderField} type="email" label="Email" />

        <Field name="password" component={renderField} type="password" label="Password" />
        <p className="auth__fp-wrap">
          <a className="auth__fp" href onClick={ this._onForgotClickHandler.bind(this) }>Forgot password?</a>
        </p>

        <button className="button" type="submit" disabled={!valid || submitting}>Log In</button>

        <p className="auth__hint">Not yet registered? <a className="auth__link1" href onClick={ this._onRegClickHandler.bind(this) }>Registration</a></p>
      </form>
    );
  }

  _handleSubmit() {
    console.log(1234);
  }

  _onForgotClickHandler(e) {
    e.preventDefault();

    this.props.openModal('ForgotPassword');
  }

  _onRegClickHandler(e) {
    e.preventDefault();

    this.props.openModal('Registration');
  }
}


export default reduxForm({
  form: 'login',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(LoginForm);