import React, {Component} from 'react'

class ForgotPas extends Component {
  render() {
    return (
      <form className="auth">
        <div className="auth__row">
          <label className="auth__label">Email</label>
          <input type="text" />
        </div>

        <button className="button">Submit</button>
      </form>
    )
  }
}

export default ForgotPas