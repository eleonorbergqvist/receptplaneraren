import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";
import { iApi } from "../../services/Api";
import { iRootState, Dispatch } from "../../store"
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import "./Register.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null,
})

const mapDispatch = (dispatch: Dispatch) => ({
  setToken: dispatch.user.setToken,
})

type connectedProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>
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
      let errors = response.data
      if (response.status === 404) {
        errors = { general: "Service not available, please try again" }
      }

      if (response.status === 500) {
        errors = { general: "Service not available, please try again" }
      }

      if(!errors) {
        errors = { general: "Service not available, please try again" }
      }

      actions.setErrors(errors);
      return;
    }

    this.props.setToken(response.data.access_token);
  }

  render() {
    if (this.props.user.access_token) {
      return <Redirect to={"/welcome"} />
    }

    return (
      <div className="Register columns">
        <div className="Register__Container--img column">
          <div className="Register__Container--Left">
            <h2 className="Register__Brand">
							<Link to="/" className="Register__BrandLink Register__BrandLink--WhiteBg">Receptplaneraren</Link>
            </h2>
          </div>
        </div>
        <div className="Register__Container--Bg column">
          <div className="Register__Container--Right">
            <h2 className="Register__Title">Sign Up</h2>
            <RegisterForm onSubmit={this.handleSubmit} />
            <p className="Register__Info--Small">Already have an account? <Link to={`/login`}>Log in.</Link>.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapState, mapDispatch)(Register);
