import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { connect } from "react-redux";
import {create, ApiResponse, ApisauceInstance} from 'apisauce';

import { iRootState, Dispatch } from "../../store"

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

  handleSubmit = (values: any): void => {
    const api: ApisauceInstance = create({
      baseURL: 'http://localhost:8000/api',
      headers: {"Content-Type": "application/json"}
    });

    api.post('/register', { 
      'user_name': values.user_name, 
      'email': values.email, 
      'password': values.password,
    })
    .then((res: ApiResponse<any>) => {
        this.props.setToken(res.data.access_token);
    });
  }
  
  render() {
    if (this.props.user) {
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