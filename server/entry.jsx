import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import reducer from 'ReduxUtils/reducer';
import { setRefreshToken, setAccessToken } from 'ReduxUtils/modules/fetch';
import { getUserByRefreshToken } from 'ReduxUtils/modules/user';

import App from 'Blocks/App.jsx';

const app = (url, context, store) => (
  <Provider store={store}>
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
);

export {
  app,
  createStore,
  reducer,
  setRefreshToken,
  setAccessToken,
  getUserByRefreshToken,
};






