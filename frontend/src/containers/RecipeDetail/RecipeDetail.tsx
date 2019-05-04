import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { iRootState, Dispatch } from "../../store";
import { iApi } from "../../services/Api";
import { HeaderLoggedIn } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getEnv } from "../../config";
import "./RecipeDetail.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({

});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type Props = connectedProps & { api: iApi }

interface RecipeDetailState {
  recipe: iRecipe,
  slug: string,
}

export interface iRecipe {
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
     },
     slug: '',
  }

  async componentDidMount () {
    const url = window.location.pathname;
    const slug = url.substr(url.lastIndexOf('/') + 1);
    this.setState({ slug: slug });
    console.log(slug);

    const { api } = this.props
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
        <HeaderLoggedIn />
        <main className="container content">
          <div className="colums RecipeDetail__Container--Top">
          <button className="button">Delete</button>
          <Link to={`/recipe/edit/${this.state.slug}`} >
            <button className="button">Edit</button>
          </Link>
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
                  <img
                    className="image is-1by1 RecipeDetail__Image"
                    src={getEnv('IMAGE_PREFIX')+this.state.recipe.image || getEnv('FALLBACK_IMAGE')}
                    alt=""
                  />
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
