require('font-awesome/css/font-awesome.css');
require('nouislider/distribute/nouislider.css');
require('perfect-scrollbar/dist/css/perfect-scrollbar.css');

require('./stylus/main.styl');

import ReactDOM from 'react-dom';
import React from 'react';
import App from './containers/App.jsx';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
