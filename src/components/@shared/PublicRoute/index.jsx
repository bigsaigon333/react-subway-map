import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../../pages/Login/hooks";
import PATH from "../../../constants/path";

const PublicRoute = ({ children, redirectTo, ...rest }) => {
  const isAuthenticated = useAuth();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest}>
      {isAuthenticated ? <Redirect to={redirectTo} /> : children}
    </Route>
  );
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.oneOf(Object.values(PATH)),
};

PublicRoute.defaultProps = {
  redirectTo: PATH.STATIONS,
};

export default PublicRoute;
