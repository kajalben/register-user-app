import React from "react";
import { decodeToken } from "../utils/auth";
import { Route, Redirect } from "react-router-dom";

// Check user authentification and redicrect to dashboard
const ProtectedRoute = ({ component: Component, path, onLogout }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        decodeToken ? (
          <Component onLogout={onLogout} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
