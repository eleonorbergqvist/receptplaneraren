import React, { Component } from "react";
import { Link } from "react-router-dom";
import EntryForm from "../../components/EntryForm/EntryForm";
import "./LogIn.css";

class LogIn extends Component {
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
            <h2 className="login__title">Log In</h2>
            <p className="login__info--small">Don't have an account? <Link to={`/register`}>Sign up</Link>.</p>
            <EntryForm />
            <p className="login__info--small">Forgot password? Click here.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;