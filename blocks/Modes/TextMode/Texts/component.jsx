import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';
import PureString from 'Blocks/PureString';

import styles from './texts.module.styl';

const Block = (props) => {
  const {
    texts,
    selectedId,
    start,
    match: {
      url,
    },
  } = props;

  let addTextLink;
  let textEls = <Loader styleName="loader" size="30" />;

  if (texts) {
    textEls = texts.map(({ id, content }) => {
      let className = 'text';

      if (_.isNumber(selectedId)) {
        className = classNames(className, {
          text_selected: id === selectedId,
        });
      }

      return (
        <Link key={id} to={`${url}/${id}`} styleName={className}>
          <PureString
            string={content}
            tag="p"
            html
          />
        </Link>
      );
    });

    if (texts.length < 10) {
      addTextLink = (
        <Link to={`${url}/add`}>Add new text</Link>
      );
    }
    else {
      addTextLink = <p>Your can have maximum 10 texts</p>;
    }
  }

  return (
    <Fragment>
      <div styleName="actions">
        <p>
          {_.isNumber(selectedId) && (
            <Fragment>
              <button
                type="button"
                className="button"
                styleName="button"
                onClick={start}
              >
                Start
              </button>
              typing last selected text
            </Fragment>
          )}

        </p>

        {addTextLink}
      </div>

      {textEls}
    </Fragment>
  );
};

export default CSSModules(Block, styles, {
  allowMultiple: true,
});
