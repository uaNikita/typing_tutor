import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Layout from 'Blocks/Layout/container';
import VerifyPage from 'Blocks/VerifyPage/container';
import Authorization from 'Blocks/Authorization/component.jsx';

class App extends Component {
  componentWillUpdate(nextProps) {
    const { location } = this.props;

    // set previousLocation if props.location is not modal
    if (nextProps.history.action !== 'POP' && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location;
    }

    this.isModal = nextProps.location.state && nextProps.location.state.modal && this.previousLocation !== nextProps.location;

    this.location = this.isModal ? this.previousLocation : nextProps.location;
  }

  location = this.props.location;

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Typing tutor</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/main.css" />
          <script type="text/javascript" defer src="/main.js" />
        </Helmet>

        <Switch location={this.location}>
          <Route path="/verify" component={VerifyPage} />
          <Route path="/" component={Layout} />
        </Switch>

        {this.isModal ? <Route path="/auth/" component={Authorization} /> : null}
      </div>
    );
  }
}

export default withRouter(App);
