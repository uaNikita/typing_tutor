import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import GlobalMessageTransitionGroup from 'Blocks/GlobalMessageTransitionGroup/container';
import VerifyPage from 'Blocks/VerifyPage/container';
import PrivateRoute from 'Blocks/PrivateRoute/container';
import Home from 'Blocks/Home/container';
import Header from 'Blocks/Header/component';
import Modes from 'Blocks/Modes/component';
import SettingsPages from 'Blocks/SettingsPages/component';
import OptionsPages from 'Blocks/OptionsPages/component';
import StatisticPage from 'Blocks/StatisticPage/container';
import Footer from 'Blocks/Footer/component';
import NotFound from 'Blocks/NotFound/component';
import Authorization from 'Blocks/Authorization/component';

import { tempLocalStorage } from 'Utils';

class Block extends Component {
  componentDidMount() {
    const {
      props: {
        setTextState,
      },
    } = this;

    const state = tempLocalStorage.get();

    if (state.text) {
      setTextState(state.text);
    }
  }

  render() {
    return (
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
                  <Route path="/options" component={OptionsPages} />
                  <Route path="/statistic" component={StatisticPage} />
                  <PrivateRoute path="/settings" component={SettingsPages} />
                  <Redirect to="/404" />
                </Switch>
              </Fragment>
            )}
          />
        </Switch>

        <Footer />
      </Fragment>
    );
  }
}

export default Block;

432
