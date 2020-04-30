import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { AppContext } from '../AppContext';
import Loader from './Loader';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AppContext);

  return user.id ? (
    <Route {...rest} render={(props) => <Component {...props} />} />
  ) : (
    <Route {...rest} render={() => (user.fetching ? <Loader /> : <Redirect to="/login" />)} />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

ProtectedRoute.defaulProps = {
  component: null,
};

export default ProtectedRoute;
