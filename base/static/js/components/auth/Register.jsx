import React, {Component} from 'react'

class Register extends Component {
  render() {
    return (
      <form className="auth">
        <div className="auth__row">
          <label className="auth__label">Email</label>
          <input type="text" />
        </div>

        <div className="auth__row">
          <label className="auth__label">Password</label>
          <input type="password" />
        </div>

        <button className="button">Submit</button>
      </form>
    )
  }
}

export default Register