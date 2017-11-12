import React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

import Loader from '../Loader/component.jsx';

import styles from './button.module.styl';

const Button = ({
  className,
  children,
  isLoader,
  ...rest
}) => (
  <button
    className={classNames('button', className)}
    styleName={classNames('button', {
      button_loader: isLoader,
    })}
    {...rest}>
    <span styleName="content">{children}</span>
    <Loader styleName="loader" size={20} />
  </button>
);

export default CSSModules(Button, styles, {
  allowMultiple: true,
});
