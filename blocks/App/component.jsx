import React, { Component, Fragment } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import _ from 'lodash';

import ls from 'Utils/ls';

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
        setMode,
        setStatistic,
        setTextState,
        location,
        setLastNoModalLocation,
        email,
        init,
      },
    } = this;

    setLastNoModalLocation(location);

    // update state from localStorage if needed
    const touchToType = ls.get('touchToType');

    if (!email) {
      if (!_.isEmpty(touchToType)) {
        const {
          mode,
          statistic,
          modes,
        } = touchToType;

        if (mode) {
          setMode(mode);
        }

        if (statistic) {
          setStatistic(statistic);
        }

        if (modes) {
          const {
            text,
          } = modes;

          if (text) {
            setTextState(text);
          }
        }
      }

      init();
    }
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

          <Switch key="content">
            <Route path="/verify" component={VerifyPage} />

            <Route
              path="/"
              render={() => (
                <div className="layout__content">
                  <Switch location={isModal ? lastNoModalLocation : location}>
                    {modalsRoutes.map(({ path, component }) => <Route key={path} path={path} component={component} />)}
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

          <TransitionGroup>{modal}</TransitionGroup>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(App);
