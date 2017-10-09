import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Layout from 'Blocks/Layout/container';
import VerifyPage from 'Blocks/VerifyPage/container';
import Authorization from 'Blocks/Authorization/component.jsx';

class App extends Component {
  componentWillMount() {
    const { location, setLastNoModalLocation } = this.props;

    setLastNoModalLocation(location);
  }

  componentWillReceiveProps() {
    const { location, setLastNoModalLocation } = this.props;

    if (!location.state || !location.state.modal) {
      setLastNoModalLocation(location);
    }
  }

  render() {
    const {
      location,
      lastNoModalLocation,
    } = this.props;

    const isModal = location.state && location.state.modal;

    return [
      <Helmet key="helmet">
        <meta charSet="utf-8" />
        <title>Typing tutor</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" type="text/css" href="/main.css" />
        <script type="text/javascript" defer src="/main.js" />
      </Helmet>,

      <Switch key="switch" location={isModal ? lastNoModalLocation : location}>
        <Route path="/verify" component={VerifyPage} />
        <Route path="/" component={Layout} />
      </Switch>,

      isModal ? <Route key="modals" path="/auth/" component={Authorization} /> : null,
    ];
  }
}

export default App;
