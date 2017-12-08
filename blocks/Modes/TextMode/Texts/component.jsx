import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CSSModules from 'react-css-modules';

import ModeButton from '../../ModeButton/container';

import styles from './texts.module.styl';

const Texts = props => {
  const {
    texts,
    currentTextId,
    selectText,
    match: {
      url,
    },
  } = props;

  let addTextLink;

  if (texts.length < 10) {
    addTextLink = <Link to={`${url}/add-text`}>Add new text</Link>;
  }

  const textEls = texts.map(({ textId, title, text }) => {
    const textProps = {
      key: textId,
      title,
      styleName: 'text',
    };

    if (textId === currentTextId) {
      textProps.styleName = classNames(textProps.styleName, 'text_selected');
    }
    else {
      textProps.onClick = () => selectText(textId);
    }

    return (
      <div {...textProps}>
        <h3 styleName="text-title">
          <Link to={`${url}/${textId}`}>{title}</Link>
        </h3>

        <div styleName="text-content">
          {text}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div styleName="actions">
        <ModeButton to="text" />

        {addTextLink}
      </div>

      <div styleName="texts">
        {textEls}
      </div>
    </div>
  );
};

export default CSSModules(Texts, styles, {
  allowMultiple: true,
});
