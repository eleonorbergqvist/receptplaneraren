import React, { Component } from "react";
import "./LoginForm.css";

export interface LoginFormProps { onSubmit: any };
export interface LoginFormState {
  email: string;
  password: string;
};

class LoginForm extends Component<LoginFormProps, LoginFormState> {

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    } as { 
      [K in keyof LoginFormState]: LoginFormState[K] 
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { 
      email,
      password,
    } = this.state;

    this.props.onSubmit({
      email,
      password,
    });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input               
              className="input" 
              type="email" 
              placeholder="Email" 
              name="email" 
              onChange={this.handleChange}  />
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
            <input 
              className="input" 
              type="password" 
              placeholder="Password" 
              name="password"
              onChange={this.handleChange}
              />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button className="button is-success">
              Login
            </button>
          </p>
        </div>
      </form>
    );
  }
}

export default LoginForm;