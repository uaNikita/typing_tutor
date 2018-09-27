import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import URLSearchParams from 'url-search-params';

import Logo from 'Blocks/Logo/component';
import Loader from 'Blocks/Loader/component';

import styles from './verify-page.module.styl';

class VerifyPage extends Component {
  state = {
    verified: false,
  };

  componentDidMount() {
    const {
      props: {
        fetchJSON,
        setTokens,
        setData,
        init,
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
        .then((res) => {
          if (res.ok) {
            const {
              tokens,
              ...rest
            } = res.data;

            setTokens(tokens);

            setData(rest);

            init();

            this.setState({
              verified: res.data.type,
            });
          }
        });
    }
  }

  render() {
    const {
      state: {
        verified,
      },
    } = this;

    let content = <Loader key="loader" size="60" />;

    let text;

    if (verified) {
      switch (verified) {
        case 'email':
          text = 'your email was succesfully verified';
          break;

        case 'password-reset':
          text = 'you can use your new password from now';
          break;

        default:
      }

      content = (
        <p key="text" styleName="text">
          Thank you,
          <br />
          {text}
          .
          <br />
          <Link key="link" className="buttom" to="/">
            Continue
          </Link>
        </p>
      );
    }

    return (
      <Fragment>
        <div styleName="header">
          <Logo />
        </div>

        {content}
      </Fragment>
    );
  }
}

export default CSSModules(VerifyPage, styles);
