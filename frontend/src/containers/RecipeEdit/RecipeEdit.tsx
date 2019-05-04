import React, { Component } from "react";
import { Redirect } from "react-router";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";
import Api from "../../services/Api";
import Header from "../../components/Header/Header";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";
import { RecipeTags, iRecipeTag } from "../../components/RecipeTags/RecipeTags";
import { Footer } from "../../components/Footer/Footer";
import RecipeEditForm, { iIngredient } from "../../components/RecipeEditForm/RecipeEditForm";
import './RecipeEdit.css';

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({

});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type Props = connectedProps;

interface RecipeEditState {
  tags: any[],
  selectedTags: Number[],
  recipe: iRecipe,
  slug: string,
}

interface iRecipe {
  title: string;
  image: string;
  instructions: string;
  ingredients: iIngredient[];
}

class RecipeEdit extends Component<Props, RecipeEditState> {
  url = window.location.pathname;
  state: RecipeEditState = {
    slug: this.url.substr(this.url.lastIndexOf('/') + 1),
    tags: [],
    selectedTags: [],
    recipe: {
      title: '',
      image: '',
      instructions: '',
      ingredients: [],
    },
  }

  public buttons = [
    <PrimaryMenuButton
      key={1}
      text="Create Recipe"
      link={"/recipe/create"}
      class="header__button--yellow is-active"
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

  handleSubmit = async (values: any, actions: FormikActions<any>) => {

    console.log('RecipeEdit.handleSubmit');
    console.log(values);

    const api = Api.create();

    actions.setSubmitting(true);

    const response: ApiResponse<any> = await api.recipeUpdate({
      instructions: values.instructions,
      title: values.title,
      tags: this.state.selectedTags,
      slug: this.state.slug,
    }, this.props.user.access_token);

    actions.setSubmitting(false);

    if (!response.ok) {
      actions.setErrors({
        general: "Fel, kunde inte updatera recept"
      });
      return;
    }

    //

    actions.setSubmitting(true);

    const recipe_id = response.data.recipe.id;

    await api.recipeIngredientUpdate({
      ingredients: values.ingredients,
      recipe_id: recipe_id,
    }, this.props.user.access_token);

    const imageResponse: ApiResponse<any> = await api.recipeImage({

      image: values.image,
      recipe_id: recipe_id,
    }, this.props.user.access_token);

    actions.setSubmitting(false);

    if (!imageResponse.ok) {
      actions.setErrors({
        general: "Fel, kunde inte spara bild"
      });
      return;
    }
  };


  async componentDidMount () {
    console.log(isEmpty(this.state.recipe));
    console.log(this.state.recipe)
    const api = Api.create();

    const response: ApiResponse<any> = await api.recipeTags(this.props.user.access_token);
    this.setState({ tags: response.data })

    if (!response.ok) {
        console.log("TAG ERRORRR")
      return;
    }

    // Hämta receptdata
    const recipeResponse: ApiResponse<any> = await api.recipeBySlug(this.props.user.access_token, this.state.slug);
    if (!recipeResponse.ok) {
      console.log("RECIPE ERRORRR")
      return;
    }


    let ingredients: iIngredient[] = recipeResponse.data.recipe.recipe_ingredients.map((ingredients: any) => {
      return  {
        amount: ingredients.amount,
        measurement: ingredients.measurement,
        ingredient: ingredients.ingredient.name }
    });


    const formattedRecipe: iRecipe = {
      title: recipeResponse.data.recipe.title,
      image: recipeResponse.data.recipe.image,
      instructions: recipeResponse.data.recipe.instructions,
      ingredients: ingredients,
    };
    this.setState({ recipe: formattedRecipe }, () => {
      console.log(isEmpty(this.state.recipe));
    });
    console.log(this.state.recipe);

  }

  handleToggleTag = (tag: iRecipeTag) => {
    let { selectedTags } = this.state

    if (selectedTags.includes(tag.id)) {
      selectedTags = selectedTags.filter(x => x !== tag.id)
    } else {
      selectedTags = [tag.id, ...selectedTags]
    }

    this.setState({ selectedTags });
  }


  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="CreateRecipe">
        <Header buttons={this.buttons} />
        <main className="container">
          <div className="CreateRecipe__Container columns">
            <div className="CreateRecipe__Container--Left column is-two-fifths">
              Edit Recipe
              <RecipeTags
                tags={this.state.tags}
                selectedTags={this.state.selectedTags}
                onToggleTag={this.handleToggleTag}
              />
            </div>
            <div className="CreateRecipe__Container--Right column">
              {this.state.recipe && !isEmpty(this.state.recipe) &&
                <RecipeEditForm recipe={this.state.recipe} onSubmit={this.handleSubmit} />
              }
            </div>
          </div>
        </main>
        <Footer copyrightText="" />
      </div>
    );
  }
}

const isEmpty  = (obj:Object) => Object.values(obj).every(x => (x === null || x === '' || x.length === 0));

export default connect(
  mapState,
  mapDispatch
)(RecipeEdit);
