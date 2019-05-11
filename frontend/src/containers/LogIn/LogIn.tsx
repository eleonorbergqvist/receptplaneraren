import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";
import { iApi } from "../../services/Api";

import LoginForm, { OnSubmitValues } from "../../components/LoginForm/LoginForm";
import "./LogIn.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({
  setToken: dispatch.user.setToken
});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type LogInProps = connectedProps & { api: iApi }

class LogIn extends Component<LogInProps> {
  handleSubmit = async (values: OnSubmitValues, actions: FormikActions<any>) => {
    const { api } = this.props

    actions.setSubmitting(true);

    const response: ApiResponse<any> = await api.logIn({
      email: values.email,
      password: values.password
    });

    actions.setSubmitting(false);

    if (!response.ok) {
      actions.setErrors({
        general: "Incorrect username/password"
      });
      return;
    }

    this.props.setToken(response.data.access_token);
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to={"/welcome"} />;
    }

    return (
      <div className="login columns">
        <div className="login__container--img column">
          <div className="login__container--left">
            <h2 className="login__brand">
							<Link to="/" className="login__brand-link">Receptplaneraren</Link>
						</h2>
          </div>
        </div>
        <div className="login__container--bg column">
          <div className="login__container--right">
            <h2 className="login__title">Log In</h2>
            <p className="login__info--small">
              Don't have an account? <Link to={`/register`}>Sign up</Link>.
            </p>
            <LoginForm onSubmit={this.handleSubmit} />
            <p className="login__info--small">Forgot password? <Link to={`/password/create`}>Click here.</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch,
)(LogIn);
