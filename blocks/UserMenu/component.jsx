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

  handleLogout = e => {
    e.preventDefault();

    this.props.logout();
  };

  render() {
    const { email, name } = this.props;

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
          {name || email} - <a href="" onClick={this.handleLogout}>Log out</a>
        </div>
      );
    }

    return content;
  }
}

export default UserMenu;
