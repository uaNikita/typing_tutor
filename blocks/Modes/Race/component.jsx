import React, { Component } from 'react';
import {
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';
import Tabs from './Tabs/component';
import Race from './Race/container';

class Block extends Component {
  componentDidMount() {
    const {
      props: {
        email,
        fetchJSON,
        setRace,
      },
    } = this;

    if (email) {
      fetchJSON('/race', {
        method: 'GET',
      })
        .then(({ ok, data, status }) => {
          if (ok) {
            setRace(data);
          }
          else if (status === 400) {
            setRace(false);
          }
        });
    }
    else {
      setRace(false);
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

    if (!_.isNull(activeRace)) {
      const routes = [
        <Route key="race" path={`${url}/race-:raceId(.{15})`} component={Race} />,
      ];

      if (activeRace) {
        const pathToRace = `${url}/race-${activeRace}`;

        if (pathname === pathToRace) {
          routes.push(<Redirect key="404" to="/404" />);
        }
        else {
          routes.push(<Redirect key="race-redirect" to={pathToRace} />);
        }
      }
      else if (activeRace === false) {
        routes.push(<Route key="tabs" path="/" component={Tabs} />);
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

export default Block;
