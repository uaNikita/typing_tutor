import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Layout from 'Blocks/Layout/container';
import VerifyPage from 'Blocks/VerifyPage/container';
import Authorization from 'Blocks/Authorization/component';

class App extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );

    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Typing tutor</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/main.css" />
          <script type="text/javascript" defer src="/main.js" />
        </Helmet>

        <Switch location={isModal ? this.previousLocation : location}>
          <Route path="/verify" component={VerifyPage} />
          <Route path="/" component={Layout} />
        </Switch>

        {isModal ?
          <Switch location={isModal ? this.previousLocation : location}>
            <Route path='/auth/' component={Authorization} />
          </Switch>
          : null}
      </div>
    );
  }
}

export default App;
