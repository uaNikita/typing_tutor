import React from 'react';

const Footer = (props) => (
  <label className="switcher">
     <input type="radio" {...props}/>
     <span className="switcher__bg"></span>
     <span className="switcher__toggle"></span>
  </label>
);

export default Footer