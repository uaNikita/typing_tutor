import React, { Fragment } from 'react';
import classNames from 'classnames';

import styles from './text.module.styl';

const Text = (props) => {
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
    refresh = (
      <button
        type="button"
        onClick={() => refreshText(id)}
        className={classNames('fa fa-refresh', styles.reload)}
      />
    );
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

  return (
    <Fragment>
      <div className={styles.actions}>
        <button type="button" className="button" {...button.props}>
          {button.text}
        </button>

        {refresh}
      </div>
      <span className={styles.typed}>
        {typed}
      </span>
      {last}
    </Fragment>
  );
};

export default Text;
