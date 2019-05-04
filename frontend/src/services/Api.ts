import apisauce from "apisauce";

const create = (baseURL = "http://localhost:8000/api/") => {
  const api = apisauce.create({
    baseURL,
    timeout: 10000,
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
      tags: values.tags,
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

  const recipeIngredientUpdate = (values: any, jwtToken: string | null) =>
    api.put("/recipe-ingredients", {
      ingredients: values.ingredients,
      recipe_id: values.recipe_id,
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );
  

  const recipeTags = (jwtToken: string | null) =>
    // api.setHeader('Authorization', `Bearer ${jwtToken}`);
    api.get('/recipe-tags', {}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );

  const recipeImage = (values: any, jwtToken: string | null) =>
    api.post('/recipes/image/store', {
      recipe_id: values.recipe_id,
      image: values.image,
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );

  const recipesAllInfo = (jwtToken: string | null) =>
    api.get('/recipesAll', {}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );

  const recipeBySlug = (jwtToken: string | null, slug: string) =>
    api.get(`/recipes/${slug}`, {}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );

  const recipeUpdate = (values: any, jwtToken: string | null) =>
    api.put(`/recipes/${values.slug}`, {
      status: 'test',
      instructions: values.instructions,
      title: values.title,
      tags: values.tags,
      slug: values.slug
    }, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );

  const daymealsByDate = (jwtToken: string | null, monday: string) =>
    api.get(`/daymeals/${monday}`, {}, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  );

  const daymealUpdate = (values: any, jwtToken: string | null) =>
  api.put("/daymeals-update", {
    date: values.date,
    meal_type: values.meal_type,
    recipe_id: values.recipe_id,
  }, {
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  }
);

  const shoppingList = (jwtToken: string | null, monday: string) =>
    api.get(`/shopping-list/${monday}`, {}, {
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
    recipeIngredientUpdate,
    recipeTags,
    recipeImage,
    recipesAllInfo,
    recipeBySlug,
    recipeUpdate,
    daymealsByDate,
    daymealUpdate,
    shoppingList,
  };
};

export default {
  create
};
