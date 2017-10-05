import React from 'react';
import { Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Layout from 'Blocks/Layout/container';
import VerifyPage from 'Blocks/VerifyPage/component.jsx';

const App = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Typing tutor</title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="stylesheet" type="text/css" href="/main.css" />
      <script type="text/javascript" defer src="/main.js" />
    </Helmet>

    <Route exact path="/" component={Layout} />
    <Route path="/verify" component={VerifyPage} />
  </div>
);

export default App;
