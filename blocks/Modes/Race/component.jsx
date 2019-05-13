import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import io from 'socket.io-client';
import CSSModules from 'react-css-modules';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';
import Tabs from './Tabs/component';
import Race from './Race/container';

import styles from './races.module.styl';

class Block extends Component {
  componentDidMount() {
    const {
      props: {
        socket,
        setRace,
        setSocket,
        getNewTokens,
      },
    } = this;

    if (socket) {
      socket.emit('get active race', (id => setRace(id)));
    }
    else {
      const getData = () => {
        setSocket(this.socket);

        this.socket.emit('get active race', (id => setRace(id)));
      };

      this.socket = io('/races')
        .on('error', (error) => {
          console.log(error);

          if (error === 'Token expired') {
            getNewTokens()
              .then(() => {
                this.socket = io('/races')
                  .on('registered', getData);
              });
          }
        })
        .on('registered', getData);
    }
  }

  render() {
    const {
      props: {
        location: {
          pathname,
        },
        match: {
          url,
        },
        activeRace,
      },
    } = this;

    let content = <Loader styleName="loader" size="30" />;

    if (!_.isUndefined(activeRace)) {
      let routes;

      if (activeRace) {
        const pathToRace = `${url}/race-${activeRace}`;

        if (pathname === pathToRace) {
          routes = <Route path={`${url}/race-:raceId(.{16})`} component={Race} />;
        }
        else {
          routes = <Redirect to={pathToRace} />;
        }
      }
      else if (_.isNull(activeRace)) {
        routes = [
          <Route key="race" path={`${url}/race-:raceId(.{16})`} component={Race} />,
          <Route key="tabs" path={url} component={Tabs} />,
        ];
      }

      content = (
        <Switch>
          {routes}
        </Switch>
      );
    }

    return content;
  }
}

export default CSSModules(Block, styles);
