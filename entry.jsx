import 'font-awesome/css/font-awesome.css';
import 'nouislider/distribute/nouislider.css';

// initialize perfect-scrollbar for $ in all project;
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import 'perfect-scrollbar/jquery';

// fetch polyfill
import 'whatwg-fetch';

import ReactDOM from 'react-dom';
import React from 'react';
import App from './blocks/App.jsx';

import './stylus/main.styl';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
