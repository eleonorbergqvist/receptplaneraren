import React, { Component } from "react";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
} from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";
import "./RegisterForm.css";

export interface RegisterFormProps {
  onSubmit: any;
}
export interface RegisterFormState {
  user_name: string;
  email: string;
  password: string;
}

interface iFormValues {
  user_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  consent: boolean;
}

const validationSchema = Yup.object().shape({
  user_name: Yup.string().required("User name is required!"),
  email: Yup.string()
    .email("E-mail is not valid!")
    .required("E-mail is required!"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirm is required"),
  consent: Yup.bool()
    .test(
      "consent",
      "You have to agree with our Terms and Conditions!",
      (value: boolean) => value === true
    )
    .required("You have to agree with our Terms and Conditions!")
});

class RegisterForm extends Component<RegisterFormProps, RegisterFormState> {
  render() {
    const onSubmit = this.props.onSubmit;
    let initialValues = {
      email: "",
      user_name: "",
      password: "",
      password_confirmation: "",
      consent: false,
    };
    return (
      <div className="RegisterForm">
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
                email: values.email,
                user_name: values.user_name
              },
              actions
            );
          }}
          render={(formikBag: FormikProps<iFormValues>) => (
            <Form>
              <Input
                name="user_name"
                className=""
                type="text"
                placeholder="User name"
                value={formikBag.values.user_name}
                onChange={formikBag.handleChange}
                onBlur={formikBag.handleBlur}
                error={
                  formikBag.touched.user_name
                    ? formikBag.errors.user_name || ""
                    : ""
                }
              />

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

              <Input
                name="password_confirmation"
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
                <div className="control">
                  <label className="register__text--small  checkbox">
                    <Field
                      className="register__checkbox"
                      name="consent"
                      type="checkbox"
                    />
                    I agree to the <a href="/terms-and-conditions">terms and conditions</a>
                  </label>
                </div>
                <p className="help is-success">
                  {formikBag.touched.consent && formikBag.errors.consent}
                </p>
              </div>

              <div className="field">
                <p className="control">
                  <button
                    className="button"
                    type="submit"
                    disabled={!formikBag.isValid}
                  >
                    Sign up
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

export default RegisterForm;
