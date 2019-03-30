import apisauce from "apisauce";
import { StringSchema } from "yup";

const create = (baseURL = "http://localhost:8000/api/") => {
  const api = apisauce.create({
    baseURL,
    headers: {
      // 'Cache-Control': 'no-cache'
    },
    timeout: 10000
  });

  const register = (values: any) =>
    api.post("/register", {
      user_name: values.user_name,
      email: values.email,
      password: values.password
    });

  const logIn = (values: any) =>
    api.post("/login", {
      email: values.email,
      password: values.password
    });

  const passwordCreate = (values: any) =>
    api.post("/password/create", {
      email: values.email,
    });

  const passwordReset = (values: any) =>
    api.post("/password/reset", {
      reset_token: values.reset_token,
      password: values.password,
    });

  return {
    register,
    logIn,
    passwordCreate,
    passwordReset,
  };
};

export default {
  create
};
