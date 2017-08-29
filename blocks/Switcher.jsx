import React from 'react';

const Switcher = props => (
  <label className="switcher" {...props.label}>
    <input type="radio" {...props.input} />
    <span className="switcher__bg" />
    <span className="switcher__toggle" />
  </label>
);

export default Switcher;
