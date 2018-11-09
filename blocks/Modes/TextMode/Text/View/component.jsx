import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import { convertTextToHtml } from 'Utils';

import styles from './text-view.module.styl';

const Block = (props) => {
  const {
    id,
    typed,
    last,
    selectedId,
    selectText,
    match: {
      url,
    },
  } = props;

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

  const text = typed + last;

  return (
    <Fragment>
      <div styleName="actions">
        <button type="button" className="button" {...button.props}>
          {button.text}
        </button>

        <Link to={`${url}/edit`} className="button">
          Edit
        </Link>
      </div>

      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: convertTextToHtml(text) }} />
    </Fragment>
  );
};

export default CSSModules(Block, styles);
