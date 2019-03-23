import React, { Component } from "react";

export interface RegisterFormProps { onSubmit: any };
export interface RegisterFormState {
  user_name: string;
  email: string;
  password: string;
};

class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value
    } as { 
      [K in keyof RegisterFormState]: RegisterFormState[K] 
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { 
      user_name,
      email,
      password,
    } = this.state;

    this.props.onSubmit({
      user_name,
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
              type="text" 
              placeholder="User Name" 
              name="user_name" 
              onChange={this.handleChange} 
              />
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
            <input 
              className="input" 
              type="email" 
              placeholder="Email" 
              name="email" 
              onChange={this.handleChange} 
              />
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
            <input className="input" type="password" placeholder="Password" name="password" onChange={this.handleChange}  />
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