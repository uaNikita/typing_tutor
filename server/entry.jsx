import React from 'react';
import reducer from 'ReduxUtils/reducer';
import { Provider } from 'react-redux';
import { StaticRouter, Route } from 'react-router-dom';
import { defaults, defaultsWhichCanBeOverwrittenByLS } from 'Constants/defaultState';
import languages from 'Constants/languages';
import { setRefreshToken, setAccessToken, setAnonymousToken } from 'ReduxUtils/reducers/fetch';
import { init, getData } from 'ReduxUtils/reducers/main';

import App from 'Blocks/App/container';

const app = (url, context, store) => (
  <Provider store={store}>
    <StaticRouter location={url} context={context}>
      <Route path="/" component={App} />
    </StaticRouter>
  </Provider>
);

export {
  app,
  reducer,
  defaults,
  defaultsWhichCanBeOverwrittenByLS,
  languages,
  setRefreshToken,
  setAccessToken,
  setAnonymousToken,
  init,
  getData,
};
