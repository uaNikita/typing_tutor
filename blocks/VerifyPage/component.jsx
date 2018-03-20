import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import URLSearchParams from 'url-search-params';

import Loader from '../Loader/component.jsx';

import styles from './verify-page.module.styl';

class VerifyPage extends Component {
  state = {
    verified: false,
  };

  componentDidMount() {
    const {
      props: {
        fetchJSON,
        setAllWithAuth,
        location: {
          search,
        },
      },
    } = this;

    const token = new URLSearchParams(search.slice(1)).get('token');

    if (token) {
      fetchJSON('/auth/verify-token', {
        body: {
          token,
        },
      })
        .then(data => {
          setAllWithAuth(data);

          this.setState({
            verified: data.type,
          });
        })
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

    let content = <Loader key="loader" size="60" />;

    if (verified) {
      switch (verified) {
        case 'email':
          text = 'your email was succesfully verified';
          break;
        case 'password-reset':
          text = 'you can use your new password from now';
          break;
      }

      content = ([
        <p key="text" styleName="text">
          Thank you,
          <br />
          {text}
        </p>,
        <Link key="link" className="buttom" to="/">Continue</Link>,
      ]);
    }

    return (
      <div styleName="root">
        <Link key="home-link" to="/" styleName="home-link">TouchToType</Link>

        {content}
      </div>
    );
  }
}

export default CSSModules(VerifyPage, styles);
