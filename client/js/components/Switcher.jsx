import React from 'react';

const Footer = (props) => (
  <label className="switcher" {...props.label}>
     <input type="radio" {...props.input} />
     <span className="switcher__bg"></span>
     <span className="switcher__toggle"></span>
  </label>
);

export default Footer