import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Dispatch } from "../../store";

const mapDispatch = (dispatch: Dispatch) => ({
  logOut: dispatch.user.logOut
});

type LogOutProps = ReturnType<typeof mapDispatch>;

class LogOut extends Component<LogOutProps> {
  componentWillMount() {
    this.props.logOut();
  }

  render() {
    return (
      <Redirect
        to={{
          pathname: "/",
          state: { showLogOutModal: true }
        }}
      />
    );
  }
}

export default connect(
  null,
  mapDispatch
)(LogOut);
