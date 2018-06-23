import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, email, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      email
        ? <Component {...props} />
        : <Redirect to="/sign-in" />
    )
    } />
);

export default PrivateRoute;
