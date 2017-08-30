import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter, Route } from 'react-router'

import reducer from 'ReduxUtils/reducer'

import Layout from 'Blocks/Layout/container.jsx';

const store = createStore(reducer);

const app = (url, context) => (
  <Provider store={store}>
    <StaticRouter location={url} context={context}>
      <Route path="/" component={Layout} />
    </StaticRouter>
  </Provider>
)

export { store, app };






