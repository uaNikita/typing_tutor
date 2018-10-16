import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import Loader from 'Blocks/Loader/component';
import ContentToType from 'Blocks/ContentToType/component';
import GeneralModeButton from '../../GeneralModeButton/container';

import styles from './texts.module.styl';

const Block = (props) => {
  const {
    texts,
    selectedId,
    match: {
      url,
    },
  } = props;

  let addTextLink;
  let textEls = <Loader size="30" />;

  if (texts) {
    textEls = texts.map(({ id, content }) => {
      const className = classNames('text', {
        text_selected: id === selectedId,
      });

      return (
        <Link key={id} to={`${url}/${id}`} styleName={className}>
          <p>
            <ContentToType>
              {content}
            </ContentToType>
          </p>
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
      addTextLink = (
        <p>
          Your can have maximum 10 texts
        </p>
      );
    }
  }

  return (
    <Fragment>
      <div styleName="actions">
        <GeneralModeButton toMode="text" />

        {addTextLink}
      </div>

      <div styleName="texts">
        {textEls}
      </div>
    </Fragment>
  );
};

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
