import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { connect } from "react-redux";
import Api from "../../services/Api";

import { iRootState, Dispatch } from "../../store"
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";

const mapState = (state: iRootState) => ({
  user: state.user,
})

const mapDispatch = (dispatch: Dispatch) => ({
  setToken: dispatch.user.setToken,
})

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
// to include additional typings
// use `type Props = connectedProps & { ...additionalTypings }
type Props = connectedProps


class Register extends Component<Props> {
   handleSubmit = async (values: any, actions: FormikActions<any>) => {
    const api = Api.create();
    const response: ApiResponse<any> = await api.register({
      "user_name": values.user_name, 
      "email": values.email, 
      "password": values.password,
    })

    if (!response.ok) {
      alert("ERROR");
      console.log(response.originalError);
      console.log(response.problem);
      // TODO: add error handling
    }
    alert("SUCCESS");
    this.props.setToken(response.data.access_token);
  }
  
  render() {
    console.log(this.props.user);

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