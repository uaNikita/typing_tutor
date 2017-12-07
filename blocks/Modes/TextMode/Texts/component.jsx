import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import ModeButton from '../../ModeButton/container';
import Text from './Text.jsx';

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

  const textEls = texts.map(obj => {
    const clsN = 'settings-text__text';
    const { textId } = obj;

    const textProps = {
      id: textId,
      title: obj.title,
      className: clsN,
      text: obj.text,
    };

    if (textId === currentTextId) {
      textProps.className = classNames(textProps.className, 'settings-text__text_selected');
    }
    else {
      textProps.onClick = selectText;
    }

    return (
      <Text key={textId} {...textProps} />
    );
  });

  return (
    <div className="settings-text">
      <div className="settings-text__actions">
        <ModeButton to="text" />

        {addTextLink}
      </div>

      <div className="settings-text__texts">
        {textEls}
      </div>
    </div>
  );
};

export default Texts;
