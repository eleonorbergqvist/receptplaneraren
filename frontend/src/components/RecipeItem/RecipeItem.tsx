import React from "react";
import { getEnv } from "../../config";
import { RecipeTags } from "../../components/RecipeTags/RecipeTags";
import "./RecipeItem.css"

export interface RecipeItemProps {
  onClick: Function,
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

  const handleOnClick = () => {
    props.onClick(mealType);
  }

  const typeLabel = dayMealToLabel(mealType);
  console.log(recipe);

  return (
    <div className="RecipeItem">
      <h4 className="title is-4">{typeLabel}: <span className="RecipeItem__RecipeTitle">{recipe.title || 'No title'}</span></h4>
      <div className="content columns">
        <div className="column">
          <h5>Ingredients</h5>
          <ul>
            {recipe.recipe_ingredients.map((recipeIngredient: any, index: number)  =>
            <li key={index} >
              {recipeIngredient.amount} {recipeIngredient.measurement} {recipeIngredient.ingredient.name}
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
          <div className="RecipeItem__Card card">
            <div className="card-image">
              <img
                src={getEnv('IMAGE_PREFIX')+recipe.image || getEnv('FALLBACK_IMAGE')}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="RecipeItem__Footer is-clearfix">
        <ul className="is-pulled-left">
          <RecipeTags
            className="RecipeItem__FooterTags"
            tags={recipe.recipe_tags}
            selectedTags={[]}
            onToggleTag={() => {}}
          />
        </ul>
        <button
          className="button is-pulled-right"
          onClick={handleOnClick}
        >Add meal</button>
      </div>
      <hr className="RecipeItem__Separator"></hr>
    </div>
  )
};

interface RecipeItemEmptyProps {
  mealType: number,
  onClick: Function,
}
const RecipeItemEmpty = (props: RecipeItemEmptyProps) => {
  const { mealType } = props;
  const typeLabel = dayMealToLabel(mealType);

  const handleOnClick = (_e:any) => {
    props.onClick(mealType);
  }

  return (
    <div className="RecipeItem">
      <div className="columns">
          <div className="column">
            <h3 className="title is-4">{typeLabel}</h3>
          </div>
          <div className="RecipeItem__EmptyDescription column">
            Currently empty
          </div>
          <div className="column">
            <button
              onClick={handleOnClick}
              className="button is-pulled-right"
            >Add meal</button>
          </div>
        </div>
    </div>
  )
};

export default RecipeItem;
export {
  RecipeItemEmpty,
}
