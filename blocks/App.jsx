import React, { Fragment } from 'react';
import {
  withRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Helmet } from 'react-helmet';

import GlobalMessageTransitionGroup from 'Blocks/GlobalMessageTransitionGroup/container';
import VerifyPage from 'Blocks/VerifyPage/container';
import PrivateRoute from 'Blocks/PrivateRoute/container';
import Home from 'Blocks/Home/container';
import Header from 'Blocks/Header/component.jsx';
import Modes from 'Blocks/Modes/component.jsx';
import SettingsPages from 'Blocks/SettingsPages/component.jsx';
import OptionsPages from 'Blocks/OptionsPages/component.jsx';
import Footer from 'Blocks/Footer/component.jsx';
import NotFound from 'Blocks/NotFound/component.jsx';
import Authorization from 'Blocks/Authorization/component.jsx';

const App = () => (
  <Fragment>
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        Typing tutor
      </title>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet" />
      <link href="/main.css" rel="stylesheet" />
      <script type="text/javascript" defer src="/main.js" />
    </Helmet>

    <div className="layout">
      <GlobalMessageTransitionGroup />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/verify" component={VerifyPage} />
        <Route path="/authorization" component={Authorization} />

        <Route
          path="/"
          render={() => (
            <Fragment>
              <Header />
              <Switch>
                <Route exact path="/404" component={NotFound} />
                <Route path="/mode" component={Modes} />
                <Route path="/options" component={SettingsPages} />
                <PrivateRoute path="/settings" component={OptionsPages} />
                <Redirect to="/404" />
              </Switch>
            </Fragment>
          )}
        />
      </Switch>

      <Footer />
    </div>
  </Fragment>
);


export default withRouter(App);
