import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
} from "formik";
import { iRootState } from "../../store";
import { iApi } from "../../services/Api";
import Input from "../../components/Input/Input";
import "./ResetPassword.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

type connectedProps = ReturnType<typeof mapState>;
type Props = connectedProps & { api: iApi } & RouteComponentProps & FormValues & ResetPasswordProps;

interface ResetPasswordState {
  reset_token: string;
  email: string;
}
interface ResetPasswordProps extends RouteComponentProps<MatchParams> {}

interface MatchParams {
  token: string;
}

interface FormValues {
  password: string;
  password_confirmation: string;
  general: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required"),
});

class ResetPassword extends Component<Props, ResetPasswordState> {
  handleSubmit = async (values: any, actions: FormikActions<any>) => {
    const { token } = this.props.match.params;
    const { api } = this.props

    actions.setSubmitting(true);

    const response: ApiResponse<any> = await api.passwordReset({
      reset_token: token,
      password: values.password,
    });

    actions.setSubmitting(false);

    if (!response.ok) {
      actions.setErrors({
        general: "Orgiltig länk"
      });
      return;
    }

    actions.resetForm();
    actions.setStatus(response.data.message);
    return;
  };

  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to={"/welcome"} />;
    }

    console.log(this.state);

    const onSubmit = this.handleSubmit;
    let initialValues = {
      password: "",
      password_confirmation: "",
      general: "",
      message: "",
    };

    return (
      <div className="ResetPassword columns">
        <div className="ResetPassword__Container--Img column">
          <div className="ResetPassword__Container--Left">
            <h2 className="LogIn__Brand">
							<Link to="/" className="LogIn__BrandLink LogIn__BrandLink--WhiteBg">Receptplaneraren</Link>
						</h2>
          </div>
        </div>
        <div className="ResetPassword__Container--Bg column">
          <div className="ResetPassword__Container--Right">
            <h2 className="ResetPassword__Title">Reset Password</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(
                values: FormValues,
                actions: FormikActions<FormValues>
              ) => {
                onSubmit(
                  {
                    password: values.password
                  },
                  actions
                );
              }}
              render={(formikBag: FormikProps<FormValues>) => (
                <Form>
                  {formikBag.errors.general && <p>{formikBag.errors.general}</p>}
                  {formikBag.status && <p>{formikBag.status}</p>}

                  <Input
                    name="password"
                    icon="shield-alt"
                    className=""
                    type="password"
                    placeholder="Password"
                    value={formikBag.values.password}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    error={
                      formikBag.touched.password ? formikBag.errors.password || "" : ""
                    }
                  />

                  <Input
                    name="password_confirmation"
                    icon="shield-alt"
                    className=""
                    type="password"
                    placeholder="Confirm password"
                    value={formikBag.values.password_confirmation}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    error={
                      formikBag.touched.password_confirmation
                        ? formikBag.errors.password_confirmation || ""
                        : ""
                    }
                  />

                  <div className="field">
                    <p className="control">
                      <button
                        className={`button ${formikBag.isSubmitting ? "is-loading": ""}`}
                        type="submit"
                        disabled={!formikBag.isValid}
                      >
                        Update password
                      </button>
                    </p>
                  </div>
                </Form>
              )}
            />
            <p className="ResetPassword__Info--Small"><Link to={`/login`}>Log in.</Link></p>
            <p className="ResetPassword__Info--Small"><Link to={`/register`}>Sign up.</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapState,
  null
)(ResetPassword);
