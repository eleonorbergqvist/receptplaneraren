import React from "react";
import { getEnv } from "../../config";

export interface RecipeItemProps {
  data: {
    meal_type: number,
    id: number,
    recipe: {
      title: any,
      recipe_ingredients: any,
      recipe_tags: any,
      instructions: any,
      image: any
    },
  },
}

const dayMealToLabel = (mealType:number) => {
  switch (mealType) {
    case 0:
      return "Breakfast";
    case 1:
      return "Lunch";
    case 2:
      return "Dinner";
    default:
      return "Unspecified";
  }
}

const RecipeItem = (props: RecipeItemProps) => {
  const {
    recipe,
    meal_type: mealType,
    id,
  } = props.data;

  // FIXME: Remove check and make sure daymeal always contains recipe
  if (!recipe) {
    return <p>Daymeal id {id} is missing recipe</p>
  }

  const typeLabel = dayMealToLabel(mealType);
  console.log(recipe);

  return (
    <div className="recipeitem">
      <div className="content tabs__mealContainer columns">
          <div className="column">
            <h3>{typeLabel}</h3>
            <h5>{recipe.title || 'No title'}</h5>
            <h5>Ingredients</h5>
            <ul>
              {recipe.recipe_ingredients.map((recipeIngredient: any, index: number)  =>
              <li key={index} >
              {recipeIngredient.amount}
              {recipeIngredient.measurement}
              {recipeIngredient.ingredient.name}
              </li>)}
            </ul>
          </div>
          <div className="column">
            <h5>Instructions</h5>
            <p>
              {recipe.instructions}
            </p>
          </div>
          <div className="column">
            <div className="card">
              <div className="card-image">
                <img
                  src={getEnv('IMAGE_PREFIX')+recipe.image || getEnv('FALLBACK_IMAGE')}
                  alt=""
                />
              </div>
              <div className="card-content">
              {recipe.recipe_tags.map((recipeTag: any, index: number)  =>
                <li key={index}>
                  {recipeTag.name}
                </li>)}
              </div>
            </div>
            <br />
            <button disabled className="button">Browse new</button>
          </div>
        </div>
    </div>
  )
};

interface RecipeItemEmptyProps {
  mealType: number,
}
const RecipeItemEmpty = (props: RecipeItemEmptyProps) => {
  const { mealType } = props;
  const typeLabel = dayMealToLabel(mealType);

  return (
    <div className="recipeitem">
      <div className="content tabs__mealContainer columns">
          <div className="column">
            <h3>{typeLabel}</h3>
          </div>
          <div className="column">
          </div>
          <div className="column">
            <button disabled className="button">Browse new</button>
          </div>
        </div>
    </div>
  )
};

export default RecipeItem;
export {
  RecipeItemEmpty,
}