import React, {Component} from 'react'

class Login extends Component {
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
          <p className=""><a href>Forgot password?</a></p>
        </div>

        <button className="button">Submit</button>
      </form>
    )
  }
}

export default Login