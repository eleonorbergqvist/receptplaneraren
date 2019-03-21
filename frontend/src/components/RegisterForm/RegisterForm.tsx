import React, { Component } from "react";
import {create, ApiResponse, ApisauceInstance} from 'apisauce';

class RegisterForm extends Component {

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const data = event.target;
    console.log(data);

    const api: ApisauceInstance = create({
      baseURL: 'http://localhost:8000/api',
      headers: {"Content-Type": "application/json"}
    });

    api.post('/register', { 'user_name': 'Laban', 'email': 'laaaa@la.la', 'password': '1234'})
    .then((res: ApiResponse<any>) => {
        console.log(res.data);
        sessionStorage.setItem('jwtToken', res.data.access_token);
    });
  }


  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="text" placeholder="User Name" name="user_name"/>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input className="input" type="email" placeholder="Email" name="email"/>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Password" name="password" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" type="password" placeholder="Confirm password" name="confirm_password"/>
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <div className="control">
            <label className="register__text--small  checkbox">
              <input type="checkbox" />
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success">
              Sign Up
            </button>
          </p>
        </div>
      </form>
    );
  }
}

export default RegisterForm;