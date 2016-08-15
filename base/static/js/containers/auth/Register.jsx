import React, {Component} from 'react'

class Register extends Component {
  render() {
    return (
      <form className="auth-form">
        <div className="auth-form__row">
          <label className="auth-form__label">Email</label>
          <input type="text" />
        </div>

        <div className="auth-form__row">
          <label className="auth-form__label">Password</label>
          <input type="password" />
        </div>

        <button className="button">Submit</button>
      </form>
    )
  }
}

export default Register