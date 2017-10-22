import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import Modal from 'Blocks/Modal/container';
import VerifyPage from 'Blocks/VerifyPage/container';
import Authorization from 'Blocks/Authorization/component.jsx';
import Home from 'Blocks/Home/container';
import Settings from 'Blocks/Settings/container';
import Footer from 'Blocks/Footer/component.jsx';

class App extends Component {
  state = {
    lastNoModalLocation: this.props.lastNoModalLocation,
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
      setLastNoModalLocation,
      setIsModal,
    } = nextProps;

    let isModal = false;

    if (action !== 'POP' && location.state && location.state.modal) {
      isModal = true;
    }
    else {
      setLastNoModalLocation(location);

      this.setState({
        lastNoModalLocation: location,
      });
    }

    setIsModal(isModal);

    this.setState({ isModal });
  }

  render() {
    const {
      props: {
        location,
      },
      state: {
        lastNoModalLocation,
        isModal,
      },
    } = this;

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

        <TransitionGroup>
          {isModal ? <CSSTransition
            key={location.key}
            classNames="modal"
            timeout={250}>
            <Route
              location={location}
              path="/auth"
              render={() => (
                <Modal>
                  <Authorization />
                </Modal>
              )} />
          </CSSTransition> : null}
        </TransitionGroup>
      </div>
    );
  }
}

export default App;
