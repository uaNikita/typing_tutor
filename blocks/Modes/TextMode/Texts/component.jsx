import React from 'react';
import { Link } from 'react-router-dom';

import ModeButton from '../../ModeButton/container';

import styles from './texts.module.styl';

const Texts = props => {
  const {
    texts,
    match: {
      url,
    },
  } = props;

  let addTextLink;

  if (texts.length < 10) {
    addTextLink = <Link to={`${url}/add-text`}>Add new text</Link>;
  }
  else {
    addTextLink = <p>Your can have maximum 10 texts</p>;
  }

  const textEls = texts.map(({ textId, title, text }) => (
    <Link key={textId} to={`${url}/${textId}`} title={title} className={styles.text}>{text}</Link>
  ));

  return [
    <div key="actions" className={styles.actions}>
      <ModeButton to="text" />

      {addTextLink}
    </div>,

    textEls,
  ];
};

export default Texts;
