import React from "react";
import { Route, Redirect } from "react-router-dom";
import { validToken } from "../../fetchingData/api_calls";
import { getToken } from "../../utils/index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        validToken() && getToken() ? <Component {...props} /> : <Redirect to="/sign-in" />
      }
    />
  );
};

export default PrivateRoute;
