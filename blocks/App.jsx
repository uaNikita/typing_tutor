import React from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Layout from 'Blocks/Layout/container';

const App = () => (
  <div>
    <Helmet>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="/main.css" />
    </Helmet>

    <Route path="/" component={Layout} />
  </div>
);

export default App;
