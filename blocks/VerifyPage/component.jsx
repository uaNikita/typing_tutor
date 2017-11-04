import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import URLSearchParams from 'url-search-params';

import Loader from '../Loader/component.jsx';

import styles from './verify-page.module.styl';

class Block extends Component {
  state = {
    verified: false,
  }

  componentDidMount() {
    const {
      props: {
        fetchJSON,
        location: {
          search,
        },
      },
    } = this;

    const token = new URLSearchParams(search.slice(1)).get('token');

    if (token) {
      fetchJSON('/verify-token', {
        body: {
          token,
        },
      })
        .then(({ type }) => this.setState({
          verified: type,
        }))
        .catch(() => {});
    }
  }

  render() {
    const {
      state: {
        verified,
      },
    } = this;

    let text;

    switch (verified) {
      case 'email':
        text = 'your email was succesfully verified';
        break;
      case 'password-reset':
        text = 'you can use your new password from now';
        break;
    }

    const redirect = ([
      <p>
        Thank you,
        <br />
        {text}
      </p>,
      <Link className="buttom" to="/">Continue</Link>,
    ]);

    return (
      <div styleName="root">
        <Link to="/" styleName="home-link">TouchToType</Link>

        {verified ? redirect : <Loader size="60" />}
      </div>
    );
  }
}

export default CSSModules(Block, styles);
