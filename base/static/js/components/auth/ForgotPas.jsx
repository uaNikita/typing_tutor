import React, {Component} from 'react'

class ForgotPas extends Component {
  render() {
    return (
      <form className="auth__form">
        <div className="auth__row">
          <input className="auth__control" type="text" placeholder="Email" />
        </div>

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

export default ForgotPas