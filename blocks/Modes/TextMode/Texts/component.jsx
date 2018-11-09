import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import { convertTextToHtml } from 'Utils';

import Loader from 'Blocks/Loader/component';
import GeneralModeButton from '../../GeneralModeButton/container';

import styles from './texts.module.styl';

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
        texts,
        selectedId,
        match: {
          url,
        },
      },
    } = this;

    let addTextLink;
    let textEls = <Loader styleName="loader" size="30" />;

    if (texts) {
      textEls = texts.map(({ id, content }) => {
        const className = classNames('text', {
          text_selected: id === selectedId,
        });

        // todo move convertTextToHtml to somewhere
        return (
          <Link key={id} to={`${url}/${id}`} styleName={className}>
            {/* eslint-disable-next-line react/no-danger */}
            <p dangerouslySetInnerHTML={{ __html: convertTextToHtml(content) }} />
          </Link>
        );
      });

      if (texts.length < 10) {
        addTextLink = (
          <Link to={`${url}/add`}>
            Add new text
          </Link>
        );
      }
      else {
        addTextLink = <p>Your can have maximum 10 texts</p>;
      }
    }

    return (
      <Fragment>
        <div styleName="actions">
          <GeneralModeButton toMode="text" />

          {addTextLink}
        </div>

        {textEls}
      </Fragment>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
