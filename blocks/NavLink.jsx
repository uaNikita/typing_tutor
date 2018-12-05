import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';

const Block = (props) => {
  const {
    children,
    location: {
      pathname,
    },
    className,
    activeClassName,
    to,
  } = props;

  return new RegExp(`^${to}`).test(pathname)
    ? <span className={classNames(className, activeClassName)}>{children}</span>
    : <Link className={className} to={to}>{children}</Link>;
};

export default withRouter(Block);
