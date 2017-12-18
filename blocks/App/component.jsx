import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import _ from 'lodash';

import GlobalMessageTransitionGroup from 'Blocks/GlobalMessageTransitionGroup/container';
import Modal from 'Blocks/Modal/component.jsx';
import VerifyPage from 'Blocks/VerifyPage/container';
import Home from 'Blocks/Home/container';
import Header from 'Blocks/Header/component.jsx';
import Modes from 'Blocks/Modes/component.jsx';
import ProfilePages from 'Blocks/ProfilePages/component.jsx';
import SettingsPages from 'Blocks/SettingsPages/component.jsx';
import Footer from 'Blocks/Footer/component.jsx';
import authorizationRoutes from 'Blocks/Authorization/routes';

const modalsRoutes = [
  ...authorizationRoutes,
];

class App extends Component {
  state = {
    isModal: this.props.isModal,
  };

  componentDidMount() {
    const { location, setLastNoModalLocation } = this.props;

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

    return [
      <Helmet key="helmet">
        <meta charSet="utf-8" />
        <title>Typing tutor</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="stylesheet" type="text/css" href="/main.css" />
        <script type="text/javascript" defer src="/main.js" />
      </Helmet>,

      <div key="layout" className={layoutClass}>
        <GlobalMessageTransitionGroup />

        <Switch key="content">
          <Route path="/verify" component={VerifyPage} />

          <Route
            path="/"
            render={() => (
              <div className="layout__content">
                <Switch key="switch" location={isModal ? lastNoModalLocation : location}>
                  {modalsRoutes.map(({ path, component }) => <Route key={path} path={path} component={component} />)}
                  <Route exact path="/" component={Home} />
                  <Route
                    path="/"
                    render={() => [
                      <Header key="header" />,
                      <Switch key="switch">
                        <Route key="modes" path="/modes" component={Modes} />
                        <Route key="settings" path="/settings" component={SettingsPages} />
                        <Route key="profile" path="/profile" component={ProfilePages} />
                      </Switch>,
                    ]} />
                </Switch>

                <Footer />
              </div>
            )} />
        </Switch>

        <TransitionGroup>{modal}</TransitionGroup>
      </div>,
    ];
  }
}

export default withRouter(App);
