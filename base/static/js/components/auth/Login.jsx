import React, {Component} from 'react'

class Login extends Component {

  render() {
    const {openModal} = this.props;

    return (
      <form className="auth__form">
        <div className="auth__row">
          <input className="auth__control" type="text" placeholder="Email" />
        </div>

        <div className="auth__row">
          <input className="auth__control" type="password" placeholder="Password" />
          <p className="auth__fp-wrap">
            <a className="auth__fp" href onClick={ this._onForgotClickHandler.bind(this) }>Forgot password?</a>
          </p>
        </div>

        <button className="button">Log In</button>

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
}

export default Login