import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'isomorphic-fetch';

import 'font-awesome/css/font-awesome.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import 'rc-slider/assets/index.css';
import 'chartist/dist/chartist.css';
import 'react-day-picker/lib/style.css';

import 'Static/stylus/main.styl';

import App from 'Blocks/App';

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
