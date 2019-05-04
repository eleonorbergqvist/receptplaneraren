import React, { Component } from "react";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
} from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";
import "./LoginForm.css";

export interface LoginFormProps {
  onSubmit: any;
}
export interface LoginFormState {
  email: string;
  password: string;
}

interface iFormValues {
  email: string;
  password: string;
  general: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
});
class LoginForm extends Component<LoginFormProps, LoginFormState> {
  render() {
    const onSubmit = this.props.onSubmit;
    let initialValues = {
      email: "",
      password: "",
      general: ""
    };
    return (
      <div className="LoginForm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(
            values: iFormValues,
            actions: FormikActions<iFormValues>
          ) => {
            onSubmit(
              {
                password: values.password,
                email: values.email
              },
              actions
            );
          }}
          render={(formikBag: FormikProps<iFormValues>) => (
            <Form>
              {formikBag.errors.general && <p>{formikBag.errors.general}</p>}

              <Input
                name="email"
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

              <Input
                name="password"
                className=""
                type="password"
                placeholder="Password"
                value={formikBag.values.password}
                onChange={formikBag.handleChange}
                onBlur={formikBag.handleBlur}
                error={
                  formikBag.touched.password
                    ? formikBag.errors.password || ""
                    : ""
                }
              />

              <div className="field">
                <p className="control">
                  <button
                    className="button"
                    type="submit"
                    disabled={!formikBag.isValid}
                  >
                    Log In
                  </button>
                </p>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default LoginForm;
