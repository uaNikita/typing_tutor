import React from 'react';
import { withRouter } from 'react-router-dom';

import './modal.styl';

const Modal = ({ children, onClose }) => (
  <div className="modal">
    <div className="modal__overlay" onClick={onClose} />
    <div className="modal__content">
      <button className="modal__close fa fa-times" onClick={onClose} />
      {children}
    </div>
  </div>
);

export default withRouter(Modal);
