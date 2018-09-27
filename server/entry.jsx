import React from 'react';
import reducer from 'ReduxUtils/reducer';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import defaults from 'Constants/defaultState';
import { setRefreshToken, setAccessToken } from 'ReduxUtils/reducers/fetch';
import { init, getData } from 'ReduxUtils/reducers/main';

import App from 'Blocks/App';

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
  defaults,
  setRefreshToken,
  setAccessToken,
  init,
  getData,
};
