import React from 'react';
import { withRouter } from 'react-router-dom';

import './modal.styl';

const Modal = ({ children, nonCloseable, onClose }) => {
  const props = {};
  let closeButton = null;

  if (!nonCloseable) {
    props.onClick = onClose;
    closeButton = <button className="modal__close fa fa-times" {...props} />;
  }

  return (
    <div className="modal">
      <div className="modal__overlay" {...props} />
      <div className="modal__content">
        {closeButton}
        {children}
      </div>
    </div>
  );
};

export default withRouter(Modal);
