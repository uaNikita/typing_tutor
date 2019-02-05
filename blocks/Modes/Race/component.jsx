import React, { Component, Fragment } from 'react';
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
            console.log('data', data);

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
        location:{
          pathname,
        },
        match,
        match: {
          url,
        },
        activeRace,
      },
    } = this;

    let content = <Loader styleName="loader" size="30" />;

    // todo: find intelligent solution
    if (activeRace === false) {
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
        <Fragment>
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
        </Fragment>
      );
    }
    else {
      const pathToRace = `${url}/${activeRace}`;

      if (activeRace && pathname !== pathToRace) {
        content = <Redirect to={pathToRace} />;
      }
    }

    return (
      <div className="sub-layout">
        {content}
      </div>
    );
  }
}

export default Block;
