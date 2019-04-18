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

  const recipeCreate = (values: any, jwtToken: string | null) =>
    api.post("/recipes", {
      status: "test", //add buttons in form
      instructions: values.instructions,
      title: values.title,
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}` 
      }
    }
  );

  const recipeIngredientCreate = (values: any, jwtToken: string | null) =>
    api.post("/recipe-ingredients", {
      ingredients: values.ingredients,
      recipe_id: values.recipe_id,
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );

  return {
    register,
    logIn,
    passwordCreate,
    passwordReset,
    recipeCreate,
    recipeIngredientCreate,
  };
};

export default {
  create
};
