import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Tabs.css";



interface TabProps {
  daymealsForWeek: any,
}

interface TabState {
  activeTab: number,
}

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


export const dayMealToLabel = (mealType:number) => {
  switch (mealType) {
    case 0:
      return "BREAKFAST";
    case 1:
      return "LUNCH";
    case 2:
      return "DINNER";
  }
}

export const RecipeItem = (props: RecipeItemProps) => {
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
  const BASE_URL: string = 'http://localhost:8000/storage/';

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
                  src={BASE_URL+recipe.image || "https://bulma.io/images/placeholders/1280x960.png"}
                  alt="Placeholder image"
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

interface EmptyRecipeItemProps {
  mealType: number,
}
export const EmptyRecipeItem = (props: EmptyRecipeItemProps) => {
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

interface TabNavProps {
  items: any,
  onChange: any,
  selected: any,
}

interface TabNavState {
  activeTab: number,
}

export class TabNav extends Component<TabNavProps, TabNavState> {
  render() {
    const { items, onChange, selected } = this.props;
    
    return (
      <div className="tabs">
        {items.map((item:any) => {
          let className = `tabs__tabNav--${item.value}`;

          if (item.value === selected) {
            className = `${className} tabs__tabNav--selected`;
          }

          return (
            <a 
              className={className}
              key={item.value}
              onClick={e => onChange(item)}
            >{item.label}</a>
          )
        })}
      </div>
    )
  }
}

class Tabs extends Component<TabProps, TabState> {
  state = {
    activeTab: 0,
  }

  render() {
    return (
      <div className="tabs__dayContainer"> */}
        <RecipeItem
          data={this.props.daymealsForWeek}/>
      </div> 
    )
  }
}

export default Tabs;
