import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserMenu extends Component {
  handleLogIn = e => {
    e.preventDefault();

    this.props.openModal('Login');
  };

  handleSignUp = e => {
    e.preventDefault();

    this.props.openModal('Registration');
  };

  render() {
    const {
      email,
      name,
      logout,
    } = this.props;

    let content = (
      <div>
        <Link to={{ pathname: '/auth/login', state: { modal: true } }}>Log In</Link>
        {' or '}
        <Link to={{ pathname: '/auth/registration', state: { modal: true } }}>Sign Up</Link>
      </div>
    );

    if (email) {
      content = (
        <div className="user-menu">
          {name || email} - <button onClick={logout}>Log out</button>
        </div>
      );
    }

    return content;
  }
}

export default UserMenu;
