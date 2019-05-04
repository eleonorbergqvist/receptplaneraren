import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";
import { iApi } from "../../services/Api";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { iRootState, Dispatch } from "../../store"

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null,
})

const mapDispatch = (dispatch: Dispatch) => ({
  setToken: dispatch.user.setToken,
})

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
// to include additional typings
type Props = connectedProps & { api: iApi}

class Register extends Component<Props> {
   handleSubmit = async (values: any, actions: FormikActions<any>) => {
    const { api } = this.props

    actions.setSubmitting(true);

    const response: ApiResponse<any> = await api.register({
      "user_name": values.user_name,
      "email": values.email,
      "password": values.password,
    })

    actions.setSubmitting(false);

    if (!response.ok) {
      // TODO: Add support for general errors (such as 401 etc)
      actions.setErrors(response.data);
      return;
    }

    this.props.setToken(response.data.access_token);
  }

  render() {
    if (this.props.user.access_token) {
      return <Redirect to={"/welcome"} />
    }

    return (
      <div className="login columns">
        <div className="login__container--img column">
          <div className="login__container--left">
            <h2 className="login__brand">Receptplaneraren</h2>
          </div>
        </div>
        <div className="login__container--bg column">
          <div className="login__container--right">
            <h2 className="login__title">Sign Up</h2>
            <RegisterForm onSubmit={this.handleSubmit} />
            <p className="login__info--small">Already have an account? <Link to={`/login`}>Log in.</Link>.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(Register);
