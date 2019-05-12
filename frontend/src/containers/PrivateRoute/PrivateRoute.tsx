import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { iRootState } from "../../store";

const mapState = (state: iRootState) => {
  return {
    authenticated: (state.user && state.user.access_token !== null)
  };
};

type connectedProps = ReturnType<typeof mapState>
type Props = connectedProps & { path: string, component: any }

const PrivateRoute = ({ component: Component, authenticated, ...rest }: Props) => {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default connect(mapState)(PrivateRoute);
