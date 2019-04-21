import React, { Component } from "react";
import { Redirect } from "react-router";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import Api from "../../services/Api";
import Header from "../../components/Header/Header";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";
import { Footer } from "../../components/Footer/Footer";
import "./RecipeDetail.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({

});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
// to include additional typings
// use `type Props = connectedProps & { ...additionalTypings }
type Props = connectedProps;

const BASE_URL: string = 'http://localhost:8000/storage/';

interface RecipeDetailState {
  recipe: iRecipe;
}

interface iRecipe {
  instructions: string,
  title: string,
  image: string,
  id: number,
  recipe_tags: iRecipeTag[],
  recipe_ingredients: iRecipeIngredient[],
} 

interface iRecipeTag {
  id: number,
  name: string,
} 

interface iRecipeIngredient {
  amount: number,
  measurement: string,
  ingredient: { name: string },
} 

class RecipeDetail extends Component<Props> {
  state: RecipeDetailState = {
    recipe: {
      instructions: '',
      title: '',
      image: '',
      id: 0,
      recipe_tags: [],
      recipe_ingredients: [],
     } 
  }

  public buttons = [
    <PrimaryMenuButton
      key={1}
      text="Create Recipe"
      link={"/recipe/create"}
      class="header__button--yellow"
    />,
    <PrimaryMenuButton
      key={2}
      text="Browse Recipes"
      link={"/recipe/browse"}
      class="header__button--yellow"
    />,
    <PrimaryMenuButton
      key={3}
      text="Settings"
      link={"#"}
      class="header__button--yellow"
    />,
    <PrimaryMenuButton
      key={4}
      text="Log Out"
      link={"/logout"}
      class="header__button--pink"
    />
  ];

  async componentDidMount () {
    // Get recipe with tags by slug/id
    const url = window.location.pathname;
    const slug = url.substr(url.lastIndexOf('/') + 1);
    console.log(slug);
    const api = Api.create();

    const response: ApiResponse<any> = await api.recipeBySlug(this.props.user.access_token, slug);
    console.log(response);
    this.setState({ recipe: response.data.recipe })

    if (!response.ok) {
      console.log("RECIPE ERRORRR")
    return;
    }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="RecipeDetail">
        <Header buttons={this.buttons} />
        <main className="container content">
          <div className="colums RecipeDetail__Container--Top">
            <button className="button">Delete</button>
            <button className="button">Edit</button>
          </div>
          <div className="columns">
            <div className="column is-one-third RecipeDetail__Container--Side">
              <h1>{this.state.recipe.title}</h1>

              {this.state.recipe.recipe_tags.map((recipeTag: iRecipeTag, index: any) => (
                  <button className="button" key={index}>
                    {recipeTag.name}
                  </button>
                ))}
            </div>
            <div className="column RecipeDetail__Container--Main">
              <div className="columns">
                <div className="column RecipeDetail__Container--Ingredients">
                  <h2>Ingredients</h2>
                  <ul>
                    {this.state.recipe.recipe_ingredients.map((recipeIngredient: iRecipeIngredient, index: any) => (
                      <li key={index}>
                        {recipeIngredient.amount} {recipeIngredient.measurement} {recipeIngredient.ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="column RecipeDetail__Container--Image">
                  <img className="image is-1by1 RecipeDetail__Image" src={BASE_URL+this.state.recipe.image || 'https://bulma.io/images/placeholders/256x256.png'} />
                </div>
              </div>
              <h2>Instructions</h2>
              <p>{this.state.recipe.instructions}</p>
            </div>
          </div>
          <div className="colums RecipeDetail__Container--Bottom">
            <button className="button">Add to week</button>
          </div>
        </main> 
        <Footer copyrightText="" />
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(RecipeDetail);