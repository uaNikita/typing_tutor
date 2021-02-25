import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'isomorphic-fetch';

import 'Static/plugins/fontawesome-free-5.4.1-web/css/all.min.css';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import 'rc-slider/assets/index.css';
import 'chartist/dist/chartist.css';
import 'react-day-picker/lib/style.css';

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
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
