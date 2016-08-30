import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import classNames from 'classNames';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }

  return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values) => {
  return sleep(1000)
    .then(() => {
      if (!['test@test.test'].includes(values.email)) {
        throw {
          email: 'That email is taken'
        }
      }
    })
}

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
      rowClass = classNames(rowClass, 'async-validating')
    }

    return (
      <div className={rowClass}>
        {touched && error && <p className="error">{error}</p>}
        <input className="auth__control" {...input} type={type} placeholder={label} />
      </div>
    )
  }
}

class Login extends Component {

  render() {
    const {pristine, submitting} = this.props

    console.log(pristine, submitting);

    return (
      <form className="auth__form" onSubmit={ this._onSubmit.bind(this) }>

        <Field name="email" component={renderField} type="text" label="Email" />

        <Field name="password" component={renderField} type="password" label="Password" />
        <p className="auth__fp-wrap">
          <a className="auth__fp" href onClick={ this._onForgotClickHandler.bind(this) }>Forgot password?</a>
        </p>
        {pristine}
        {submitting}
        <button className="button" type="submit" disabled={pristine || submitting}>Log In</button>

        <p className="auth__hint">Not yet registered? <a className="auth__link1" href onClick={ this._onRegClickHandler.bind(this) }>Registration</a></p>
      </form>
    )
  }

  _onForgotClickHandler(e) {
    e.preventDefault();

    this.props.openModal('ForgotPassword')
  }

  _onRegClickHandler(e) {
    e.preventDefault();

    this.props.openModal('Registration')
  }

  _onSubmit(e) {
    e.preventDefault();

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    return sleep(1000)
      .then(() => {

        console.log('_onSubmit');
      })
  }
}


export default reduxForm({
  form: 'simple',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(Login)
