import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'
import reducer from 'ReduxUtils/reducer';

import App from 'Blocks/App.jsx';

const app = (url, context, store) => (
  <Provider store={store}>
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
)

export { app, createStore, reducer };






