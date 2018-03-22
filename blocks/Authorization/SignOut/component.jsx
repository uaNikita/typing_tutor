import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignOut extends Component {
  componentDidMount = () => this.props.logOut();

  render() {
    return (
      <div className="auth">
        <p> SignOut</p>
        <Link to="/">Continue</Link>
      </div>
    );
  }
}

export default SignOut;
