import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';

import Modal from 'Blocks/Modal/container';
import VerifyPage from 'Blocks/VerifyPage/container';
import Authorization from 'Blocks/Authorization/component.jsx';
import Home from 'Blocks/Home/container';
import Settings from 'Blocks/Settings/container';
import Footer from '../Footer.jsx';

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
      location: {
        state,
      },
      history: {
        action,
      },
      lastNoModalLocation,
    } = this.props;

    const isModal = action !== 'POP' && state && state.modal;

    const layoutClass = classNames('layout', {
      layout_modal: isModal,
    });

    return (
      <div className={layoutClass}>
        <div className="layout__content">
          <Helmet key="helmet">
            <meta charSet="utf-8" />
            <title>Typing tutor</title>
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <link rel="stylesheet" type="text/css" href="/main.css" />
            <script type="text/javascript" defer src="/main.js" />
          </Helmet>

          <Switch key="switch" location={isModal ? lastNoModalLocation : location}>
            <Route path="/verify" component={VerifyPage} />
            <Route path="/auth" component={Authorization} />
            <Route path="/settings" component={Settings} />,
            <Route exact path="/" component={Home} />,
          </Switch>

          <Footer />
        </div>

        {isModal ? <Route
          key="modals"
          path="/auth"
          render={() => (
            <Modal>
              <Authorization />
            </Modal>
          )} /> : null}
      </div>
    );
  }
}

export default App;
