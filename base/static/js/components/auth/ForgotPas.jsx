import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import classNames from 'classNames';

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Required'
  }

  return errors
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
  return sleep(1000) // simulate server latency
    .then(() => {
      if (!['john', 'paul', 'george', 'ringo'].includes(values.email)) {
        return {email: 'That email does not exist'}
      }
    })
}

class RenderField extends Component {

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

    let rowClass = 'auth__row';

    if (asyncValidating) {
      rowClass = classNames(rowClass, 'async-validating')
    }

    return (
      <div className={rowClass}>
        {touched && error && <p className="error">{error}</p>}
        <input
          className="auth__control"
          {...input}
          type={type}
          placeholder={label}
        />
      </div>
    )
  }
}

class ForgotPas extends Component {
  render() {
    return (
      <form className="auth__form auth__form_password-reset">
        <Field
          name="email"
          component={RenderField}
          type="email"
          label="Email"
        />

        <div className="auth__button-wrap">
          <button className="button">Send new password</button>
        </div>

        <p className="auth__hint">
          ← <a className="auth__link2" href onClick={ this._onBackClickHandler.bind(this) }>Back</a>
        </p>
      </form>
    )
  }

  _onBackClickHandler(e) {
    e.preventDefault();

    this.props.openModal('Login')
  }
}

export default reduxForm({
  form: 'forgot-password',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(ForgotPas)