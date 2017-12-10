import React from 'react';
import classNames from 'classnames';

import styles from './text.module.styl';

const Text = props => {
  const {
    id,
    typed,
    last,
    selectedId,
    refreshText,
    selectText,
  } = props;

  let refresh;

  if (typed) {
    refresh = <button onClick={() => refreshText(id)} className={classNames('fa fa-refresh', styles.reload)} />;
  }

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

  return [
    <div key="actions" className={styles.actions}>
      <button className="button" {...button.props}>{button.text}</button>

      {refresh}
    </div>,
    <span key="typed" className={styles.typed}>{typed}</span>,
    last,
  ];
};

export default Text;
