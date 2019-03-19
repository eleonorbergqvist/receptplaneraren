import React, { Component } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

class Register extends Component {
  render() {
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
              <RegisterForm />
              <p className="login__info--small">Already have an account? <Link to={`/login`}>Log in.</Link>.</p>
            </div>
          </div>
        </div>
      );
    }
}

export default Register;