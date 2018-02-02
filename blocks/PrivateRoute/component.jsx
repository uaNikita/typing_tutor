import React from 'react';

const PrivateRoute = ({ component: Component, email, ...rest }) => (
  <Route {...rest} render={props => (
    email ? <Component {...props} /> : <Redirect to="/login" />
  )} />
)

export default PrivateRoute;

