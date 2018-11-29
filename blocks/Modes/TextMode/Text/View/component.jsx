import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import PureString from 'Blocks/PureString';

import styles from './text-view.module.styl';

const Block = (props) => {
  const {
    start,
    typed,
    last,
    match: {
      url,
    },
  } = props;

  return (
    <Fragment>
      <div styleName="actions">
        <button
          type="button"
          className="button"
          onClick={start}
        >
          Start
        </button>

        <Link to={`${url}/edit`} className="button">Edit</Link>
      </div>

      <PureString
        string={typed + last}
        tag="p"
        html
      />
    </Fragment>
  );
};

export default CSSModules(Block, styles);
