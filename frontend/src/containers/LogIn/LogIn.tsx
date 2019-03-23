import React, { Component } from "react";
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import {create, ApiResponse, ApisauceInstance} from 'apisauce';

import LoginForm from "../../components/LoginForm/LoginForm";
import "./LogIn.css";


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

class LogIn extends Component<Props> {

  handleSubmit = (values: any): void => {
    const api: ApisauceInstance = create({
      baseURL: 'http://localhost:8000/api',
      headers: {"Content-Type": "application/json"}
    });

    api.post('/login', { 
      'email': values.email, 
      'password': values.password,
    })
    .then((res: ApiResponse<any>) => {
        console.log(res.data)
        this.props.setToken(res.data.access_token);
    });
  }

  render() {
    if (this.props.user) {
      return <Redirect to={"/welcome"} />
    }

    console.log(this.props);
    return (
      <div className="login columns">
        <div className="login__container--img column">
          <div className="login__container--left">
            <h2 className="login__brand">Receptplaneraren</h2>
          </div>
        </div>
        <div className="login__container--bg column">
          <div className="login__container--right">
            <h2 className="login__title">Log In</h2>
            <p className="login__info--small">Don't have an account? <Link to={`/register`}>Sign up</Link>.</p>
            <LoginForm onSubmit={this.handleSubmit} />
            <p className="login__info--small">Forgot password? Click here.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(LogIn);