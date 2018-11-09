import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import { convertTextToHtml } from 'Utils';

import styles from './text-view.module.styl';

class Block extends Component {
  constructor(props) {
    super(props);

    const {
      typed,
      last,
    } = props;

    this.text = typed + last;
  }

  render() {
    const {
      props: {
        id,
        selectedId,
        selectText,
        match: {
          url,
        },
      },
    } = this;

    let button = {
      props: {
        onClick: () => selectText(id),
      },
      text: 'Select',
    };

    if (id === selectedId) {
      button = {
        props: {
          disabled: true,
        },
        text: 'Selected',
      };
    }

    // todo: move convertTextToHtml to PureFunction
    return (
      <Fragment>
        <div styleName="actions">
          <button type="button" className="button" {...button.props}>
            {button.text}
          </button>

          <Link to={`${url}/edit`} className="button">
            Edit
          </Link>
        </div>

        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: convertTextToHtml(this.text) }} />
      </Fragment>
    );
  }
}

export default CSSModules(Block, styles);
