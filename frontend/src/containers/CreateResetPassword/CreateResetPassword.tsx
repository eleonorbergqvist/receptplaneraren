import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { iRootState } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
} from "formik";
import Input from "../../components/Input/Input";
import * as Yup from "yup";
import { iApi } from "../../services/Api";
import "./CreateResetPassword.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

type connectedProps = ReturnType<typeof mapState>;
type Props = connectedProps & { api: iApi }

interface iFormValues {
  email: string;
  general: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
});

class CreateResetPassword extends Component<Props> {
  handleSubmit = async (values: any, actions: FormikActions<any>) => {
    const { api } = this.props

    actions.setSubmitting(true);

    const response: ApiResponse<any> = await api.passwordCreate({
      email: values.email,
    });

    actions.setSubmitting(false);

    if (!response.ok) {
      actions.setErrors({
        general: "Ogiltig email"
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

    const onSubmit = this.handleSubmit;
    let initialValues = {
      email: "",
      general: "",
      message: "",
    };

    return (
      <div className="login columns">
        <div className="CreateResetPassword__Container--Img column">
          <div className="CreateResetPassword__Container--left">
            <h2 className="CreateResetPassword__Brand CreateResetPassword__Brand">
							<Link to="/" className="CreateResetPassword__BrandLink CreateResetPassword__BrandLink--WhiteBg">Receptplaneraren</Link>
						</h2>
          </div>
        </div>
        <div className="CreateResetPassword__Container--Bg column">
          <div className="CreateResetPassword__Container--Right">
            <h2 className="CreateResetPassword__title">Create password reset</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(
                values: iFormValues,
                actions: FormikActions<iFormValues>
              ) => {
                onSubmit(
                  {
                    email: values.email
                  },
                  actions
                );
              }}
              render={(formikBag: FormikProps<iFormValues>) => (
                <Form>
                  {formikBag.errors.general && <p>{formikBag.errors.general}</p>}
                  {formikBag.status && <p>{formikBag.status}</p>}
                  <Input
                    name="email"
                    icon="envelope"
                    className=""
                    type="email"
                    placeholder="Email"
                    value={formikBag.values.email}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    error={
                      formikBag.touched.email ? formikBag.errors.email || "" : ""
                    }
                  />

                  <div className="field">
                    <p className="control">
                      <button
                        className="button"
                        type="submit"
                        disabled={!formikBag.isValid}
                      >
                        Reset password
                      </button>
                    </p>
                  </div>
                </Form>
              )}
            />
            <p className="CreateResetPassword__Info--Small"><Link to={`/login`}>Log in.</Link></p>
            <p className="CreateResetPassword__Info--Small"><Link to={`/register`}>Sign up.</Link></p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapState,
  null
)(CreateResetPassword);
