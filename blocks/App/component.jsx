import React, { Component } from 'react';
import _ from 'lodash';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import GlobalMessageTransitionGroup from 'Blocks/GlobalMessageTransitionGroup/container';
import VerifyPage from 'Blocks/VerifyPage/container';
import PrivateRoute from 'Blocks/PrivateRoute/container';
import Home from 'Blocks/Home/component';
import Header from 'Blocks/Header/component';
import Modes from 'Blocks/Modes/component';
import SettingsPages from 'Blocks/SettingsPages/component';
import OptionsPages from 'Blocks/OptionsPages/component';
import StatisticPage from 'Blocks/StatisticPage/container';
import Footer from 'Blocks/Footer/component';
import NotFound from 'Blocks/NotFound/component';
import Authorization from 'Blocks/Authorization/component';
import Help from 'Blocks/Help/component';

import { defaultsWhichCanBeOverwrittenByLS as defaultsFromLS } from 'Constants/defaultState';
import { tempLocalStorage } from 'Utils';

class Block extends Component {
  componentDidMount() {
    const {
      props: {
        setUserState,
        setTextState,
      },
    } = this;

    const state = tempLocalStorage.get();

    if (!_.isEmpty(state)) {
      let {
        user,
        text,
      } = defaultsFromLS;

      if (state.user) {
        user = _.assign(user, state.user);
      }
      setUserState(user);

      if (state.text) {
        text = _.assign(text, state.text);
      }

      setTextState(text);
    }
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Typing tutor</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link href="//fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet" />
          <link href="/main.css" rel="stylesheet" />
          <link href="/vendors~main.css" rel="stylesheet" />
          <script type="text/javascript" defer src="/vendors.js" />
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
              <>
                <Header />
                <Switch>
                  <Route path="/404" component={NotFound} />
                  <Route path="/options" component={OptionsPages} />
                  <Route path="/statistic" component={StatisticPage} />
                  <Route path="/help" component={Help} />
                  <PrivateRoute path="/settings" component={SettingsPages} />
                  <Route component={Modes} />
                </Switch>
              </>
            )}
          />
        </Switch>

        <Footer />
      </>
    );
  }
}

export default Block;
