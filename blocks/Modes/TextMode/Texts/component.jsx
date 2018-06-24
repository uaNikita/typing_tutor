import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

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

  if (texts.length < 10) {
    addTextLink = (
      <Link to={`${url}/add-text`}>
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

  const textEls = texts.map(({ id, content }) => {
    const className = classNames('text', {
      text_selected: id === selectedId,
    });

    return (
      <Link key={id} to={`${url}/${id}`} styleName={className}>
        <p>
          {content}
        </p>
      </Link>
    );
  });

  return [
    <div key="actions" styleName="actions">
      <GeneralModeButton toMode="text" />

      {addTextLink}
    </div>,

    textEls,
  ];
};

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
