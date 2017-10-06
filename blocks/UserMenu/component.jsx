import React, { Component } from 'react';

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
        <a href="" onClick={this.handleLogIn}>Log In</a> or <a href="" onClick={this.handleSignUp}>Sign Up</a>
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
