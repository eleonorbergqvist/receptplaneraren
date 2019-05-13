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
      <div className="LogIn columns">
        <div className="LogIn__Container--Img column">
          <div className="LogIn__Container--Left">
            <h2 className="LogIn__Brand LogIn__Brand">
							<Link to="/" className="LogIn__BrandLink LogIn__BrandLink--WhiteBg">Receptplaneraren</Link>
						</h2>
          </div>
        </div>
        <div className="LogIn__Container--Bg column">
          <div className="LogIn__Container--Right">
            <h2 className="LogIn__Title">Log In</h2>
            <p className="LogIn__Info--Small">
              Don't have an account? <Link to={`/register`}>Sign up</Link>.
            </p>
            <LoginForm onSubmit={this.handleSubmit} />
            <p className="LogIn__Info--Small">Forgot password? <Link to={`/password/create`}>Click here.</Link></p>
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
