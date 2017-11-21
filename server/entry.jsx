import React from 'react';
import reducer from 'ReduxUtils/reducer';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { setRefreshToken, setAccessToken } from 'ReduxUtils/modules/fetch';
import { requestAllData } from 'ReduxUtils/modules/main';

import App from 'Blocks/App/container';

const app = (url, context, store) => (
  <Provider store={store}>
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
);

export {
  app,
  reducer,
  setRefreshToken,
  setAccessToken,
  requestAllData,
};






