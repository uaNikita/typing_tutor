import React, {Component} from 'react'
import generatePassword from 'password-generator';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      createPassword: false
    };
  }

  render() {
    return (
      <form className="auth__form" onSubmit={ this._onSubmit.bind(this)}>
        <div className="auth__row">
          <input className="auth__control" type="text" placeholder="Email" />
        </div>

        <div className="auth__row">
          <input
            className="auth__control"
            type="password"
            placeholder="Password"
            value={this.state.password}
            disabled={this.state.createPassword}
            onChange={this._onPasswordChange.bind(this)} />
          <label className="auth__cp">
            <input
              className="auth__cp-control"
              type="checkbox"
              checked={this.state.createPassword}
              onChange={this._onCreatePasswordChange.bind(this)} />
            Create a password for me
          </label>
        </div>

        <button className="button">Sign Up</button>

        <p className="auth__hint">Already registered? <a className="auth__link1" href onClick={ this._onLoginClick.bind(this) }>Log in now</a></p>
      </form>
    )
  }

  _onPasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  _onCreatePasswordChange() {
    let password = '';

    if (!this.state.createPassword) {
      password = generatePassword(5, false, /[\w\d]/);
    }

    this.setState({
      createPassword: !this.state.createPassword,
      password
    });

  }

  _onLoginClick(e) {
    e.preventDefault();

    this.props.openModal('Login')
  }

  _onSubmit(e) {
    e.preventDefault();

    console.log('_onSubmit');
  }
}

export default Register