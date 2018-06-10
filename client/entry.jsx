import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'babel-polyfill';
import 'isomorphic-fetch';

import 'font-awesome/css/font-awesome.css';
import 'nouislider/distribute/nouislider.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import 'rc-slider/assets/index.css';

import 'Static/stylus/main.styl';

import App from 'Blocks/App/container';

import store from './store';

// for IE9+
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector;
}

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
