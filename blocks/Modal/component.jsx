import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import './modal.styl';

const Modal = ({ children, nonCloseable, onClose, className }) => {
  const props = {};
  let closeButton = null;

  if (!nonCloseable) {
    props.onClick = onClose;
    closeButton = <button type="button" className="modal__close fa fa-times" {...props} />;
  }

  return (
    <div className={classNames('modal', className)}>
      <div className="modal__overlay" {...props} />
      <div className="modal__content">
        {closeButton}
        {children}
      </div>
    </div>
  );
};

export default withRouter(Modal);
