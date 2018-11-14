import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import Loader from 'Blocks/Loader/component';
import PureString from 'Blocks/PureString';
import GeneralModeButton from '../../GeneralModeButton/container';

import styles from './texts.module.styl';

class Block extends Component {
  shouldComponentUpdate = (nextProps) => {
    const propsToPick = ['texts', 'selectedId'];
    const pikedProps = _.pick(this.props, propsToPick);
    const pikedNextProps = _.pick(nextProps, propsToPick);

    if (_.isEqual(pikedProps, pikedNextProps)) {
      return false;
    }

    return true;
  };

  render() {
    const {
      props: {
        texts,
        selectedId,
        match: {
          url,
        },
      },
    } = this;

    let addTextLink;
    let textEls = <Loader styleName="loader" size="30" />;

    if (texts) {
      textEls = texts.map(({ id, content }) => {
        const className = classNames('text', {
          text_selected: id === selectedId,
        });

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
          <Link to={`${url}/add`}>
            Add new text
          </Link>
        );
      }
      else {
        addTextLink = <p>Your can have maximum 10 texts</p>;
      }
    }

    return (
      <Fragment>
        <div styleName="actions">
          <GeneralModeButton toMode="text" />

          {addTextLink}
        </div>

        {textEls}
      </Fragment>
    );
  }
}

export default CSSModules(Block, styles, {
  allowMultiple: true,
});


Promise.resolve(()=>{
  throw Error('qwer qwer qwre');
})
.catch((error) => {
  console.log('error', error);
});