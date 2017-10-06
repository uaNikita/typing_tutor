import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import URLSearchParams from 'url-search-params';

import Loader from '../Loader/component.jsx';

import styles from './verify-page.module.styl';

class Block extends Component {
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
        .then(({ type }) => {
          switch (type) {
            case 'email':
              console.log(1);
              break;
            case 'password-reset':
              console.log(2);
              break;
          }
        })
        .catch(() => {
        });
    }
  }

  render() {
    return (
      <div styleName="root">
        <Loader size="60" />
      </div>
    );
  }
}

export default CSSModules(Block, styles);
