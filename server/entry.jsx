import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router'

import store from 'Utils/store';
import App from 'Blocks/App.jsx';

const app = (url, context) => (
  <Provider store={store}>
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  </Provider>
)

export { store, app };






