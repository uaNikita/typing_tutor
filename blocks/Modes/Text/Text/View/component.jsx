import React from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import PureString from 'Blocks/PureString';

import styles from './text-view.module.styl';

const Block = props => {
  const {
    start,
    refresh,
    del,
    typed,
    last,
    match: {
      url,
    },
  } = props;

  return (
    <>
      <div styleName="actions">
        <button type="button" className="button" onClick={start}>Start</button>
        <Link to={`${url}/edit`} className="button">Edit</Link>
        <button type="button" className="button" onClick={refresh}>Refresh</button>
        <button type="button" className="button" onClick={del}>Delete</button>
      </div>

      <p>
        <PureString
          styleName="typed"
          tag="span"
          string={typed}
          html
        />

        <PureString
          string={last}
          tag="span"
          html
        />
      </p>
    </>
  );
};

export default CSSModules(Block, styles);
