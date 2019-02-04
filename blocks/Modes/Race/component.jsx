import React, { Component } from 'react';
import {
  Switch,
  Redirect,
  Route,
  NavLink,
} from 'react-router-dom';
import _ from 'lodash';

import Loader from 'Blocks/Loader/component';
import QuickStart from './QuickStart/container';
import Laps from './Laps/container';
import Race from './Race/container';

const menuLinks = [
  'Quick start',
  'Laps',
];

class Block extends Component {
  state = {
    onGoingGame: null,
  };

  componentDidMount() {
    const {
      props: {
        fetchJSON,
      },
    } = this;

    fetchJSON('/race')
      .then(({ ok, data, status }) => {
        if (ok) {
          this.setState({
            onGoingGame: data,
          });
        }
        else if (status === 400) {
          this.setState({
            onGoingGame: false,
          });
        }
      });
  }

  render() {
    const {
      props: {
        match: {
          url,
        },
      },
      state: {
        onGoingGame,
      },
    } = this;

    let content = <Loader styleName="loader" size="30" />;

    if (onGoingGame === false) {
      const links = menuLinks.map(item => (
        <NavLink
          key={item}
          className="submenu-link"
          activeClassName="submenu-link_selected"
          to={`${url}/${_.kebabCase(item)}`}
        >
          {item}
        </NavLink>
      ));

      content = (
        <div className="sub-layout">
          <nav className="sub-layout__menu">
            {links}
          </nav>
          <div className="sub-layout__content">
            <Switch>
              <Redirect exact from={url} to={`${url}/quick-start`} />
              <Route path={`${url}/quick-start`} component={QuickStart} />
              <Route path={`${url}/laps`} component={Laps} />
              <Route path={`${url}/:raceId(.+)`} component={Race} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </div>
      );
    }
    else if (_.isString(onGoingGame)) {
      content = <Redirect to={`${url}/${onGoingGame}`} />;
    }

    return content;
  }
}

export default Block;
