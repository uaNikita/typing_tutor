import React, { Component, Fragment } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import _ from 'lodash';

import GlobalMessageTransitionGroup from 'Blocks/GlobalMessageTransitionGroup/container';
import Modal from 'Blocks/Modal/component.jsx';
import VerifyPage from 'Blocks/VerifyPage/container';
import PrivateRoute from 'Blocks/PrivateRoute/container';
import Home from 'Blocks/Home/container';
import Header from 'Blocks/Header/component.jsx';
import Modes from 'Blocks/Modes/component.jsx';
import ProfilePages from 'Blocks/ProfilePages/component.jsx';
import SettingsPages from 'Blocks/SettingsPages/component.jsx';
import Footer from 'Blocks/Footer/component.jsx';
import NotFound from 'Blocks/NotFound/component.jsx';
import authorizationRoutes from 'Blocks/Authorization/routes';
import SignIn from 'Blocks/Authorization/SignIn/container';
import SignUp from 'Blocks/Authorization/SignUp/container';
import RestoreAccess from 'Blocks/Authorization/RestoreAccess/container';
import SignOut from 'Blocks/Authorization/SignOut/container';

const modalsRoutes = [
  ...authorizationRoutes,
];

class App extends Component {
  state = {
    isModal: this.props.isModal,
  };

  componentDidMount() {
    const {
      props: {
        location,
        setLastNoModalLocation,
      },
    } = this;

    setLastNoModalLocation(location);
  }

  componentWillReceiveProps(nextProps) {
    const {
      location,
      history: {
        action,
      },
      isModal: currentIsModal,
      setLastNoModalLocation,
      setIsModal,
    } = nextProps;

    let isModal = false;

    if (action !== 'POP' && location.state && location.state.modal) {
      isModal = true;
    }
    else {
      setLastNoModalLocation(location);
    }

    if (currentIsModal !== isModal) {
      setIsModal(isModal);

      this.setState({ isModal });
    }
  }

  handlerClose = () => {
    const {
      props: {
        history: {
          replace,
        },
        lastNoModalLocation,
      },
    } = this;

    replace(lastNoModalLocation.pathname);
  };

  render() {
    const {
      props: {
        location,
        lastNoModalLocation,
      },
      state: {
        isModal,
      },
    } = this;

    const layoutClass = classNames('layout', {
      layout_modal: isModal,
    });

    let modal = null;

    if (isModal) {
      const {
        path,
        component,
        nonCloseable,
      } = _.find(modalsRoutes, { path: location.pathname });

      const modalProps = { nonCloseable };

      if (!nonCloseable) {
        modalProps.onClose = this.handlerClose;
      }

      modal = (
        <CSSTransition key={location.key} classNames="modal" timeout={250}>
          <Modal {...modalProps}>
            <Route location={location} path={path} component={component} />
          </Modal>
        </CSSTransition>
      );
    }

    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Typing tutor</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700,700i&amp;subset=latin-ext" rel="stylesheet" />
          <link href="/main.css" rel="stylesheet" />
          <script type="text/javascript" defer src="/main.js" />
        </Helmet>

        <div className={layoutClass}>
          <GlobalMessageTransitionGroup />

          <Switch>
            <Route path="/verify" component={VerifyPage} />

            <Route
              path="/"
              render={() => (
                <div className="layout__content">
                  <Switch>
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/sign-up" component={SignUp} />
                    <Route path="/restore-access" component={RestoreAccess} />
                    <Route path="/sign-out" component={SignOut} />

                    <Route exact path="/" component={Home} />
                    <Route
                      path="/"
                      render={() => (
                        <Fragment>
                          <Header />
                          <Switch>
                            <Route exact path="/404" component={NotFound} />
                            <Route path="/modes" component={Modes} />
                            <Route path="/settings" component={SettingsPages} />
                            <PrivateRoute path="/profile" component={ProfilePages} />
                            <Redirect to="/404" />
                          </Switch>
                        </Fragment>
                      )} />
                  </Switch>

                  <Footer />
                </div>
              )} />
          </Switch>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(App);
