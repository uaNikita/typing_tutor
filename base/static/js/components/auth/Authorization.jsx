import React, {Component} from 'react'
import Login from '../../containers/auth/Login.jsx';
import Register from '../../containers/auth/Register.jsx';
import ForgotPas from '../../containers/auth/ForgotPas.jsx';

class Authorization extends Component {

  render() {
    let title = '';
    let content = '';

    switch (this.props.modalName) {
      case 'Login':
        title = 'Log In'
        content = <Login onSubmit={this._onSubmit.bind(this)} />
        break;
      case 'Registration':
        title = 'Registration';
        content = <Register />
        console.log(Register);
        break;
      case 'ForgotPassword':
        title = 'Password reset';
        content = <ForgotPas />
        break;
    }

    return (
      <div className="auth">
        <h3 className="auth__title">{title}</h3>
        {content}
      </div>
    )
  }

  _onTabClickHandler(tab, e) {
    e.preventDefault();

    this.props.openModal(tab);
  }


  _onSubmit() {

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


    return sleep(1000)


  }
}

export default Authorization