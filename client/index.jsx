import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'font-awesome/css/font-awesome.css';
import 'nouislider/distribute/nouislider.css';

// initialize perfect-scrollbar for $ in all project;
import 'perfect-scrollbar/dist/css/perfect-scrollbar.css';
import 'perfect-scrollbar/jquery';

import 'babel-polyfill';
import 'whatwg-fetch';

import Layout from 'Blocks/Layout/container.jsx';

import store from './store';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Layout} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
