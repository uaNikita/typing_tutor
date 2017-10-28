import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'font-awesome/css/font-awesome.css';
import 'nouislider/distribute/nouislider.css';

// initialize perfect-scrollbar for $ in all project;
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import 'perfect-scrollbar/jquery';

import 'Static/stylus/main.styl';

import 'babel-polyfill';
import 'isomorphic-fetch';

import App from 'Blocks/App.jsx';

import store from './store';

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
