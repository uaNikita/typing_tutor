import React from 'react';
import { withRouter } from 'react-router-dom';

import './modal.styl';

const Modal = ({ children, nonCloseable, onClose }) => {
  const props = {};

  if (!nonCloseable) {
    props.onClick = onClose;
  }

  return (
    <div className="modal">
      <div className="modal__overlay" {...props} />
      <div className="modal__content">
        <button className="modal__close fa fa-times" {...props} />
        {children}
      </div>
    </div>
  );
};

export default withRouter(Modal);
