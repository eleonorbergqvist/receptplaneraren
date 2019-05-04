import React, { Component } from "react";
import { Redirect } from "react-router";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";
import Api from "../../services/Api";

import "./CreateRecipe.css";
import Header from "../../components/Header/Header";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";
import { RecipeTags, iRecipeTag } from "../../components/RecipeTags/RecipeTags";
import { Footer } from "../../components/Footer/Footer";
import RecipeForm from "../../components/RecipeForm/RecipeForm";

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

interface CreateRecipeState {
  tags: any[];
  selectedTags: Number[];
}

class CreateRecipe extends Component<Props, CreateRecipeState> {
  state: CreateRecipeState = {
    tags: [],
    selectedTags: [],
  }

  handleSubmit = async (values: any, actions: FormikActions<any>) => {

    console.log('CreateRecipe.handleSubmit');
    console.log(values);

    const api = Api.create();

    actions.setSubmitting(true);

    const response: ApiResponse<any> = await api.recipeCreate({
      instructions: values.description,
      title: values.title,
      tags: this.state.selectedTags,
    }, this.props.user.access_token);

    actions.setSubmitting(false);

    if (!response.ok) {
      actions.setErrors({
        general: "Fel, kunde inte spara recept"
      });
      return;
    }

    //

    actions.setSubmitting(true);

    const recipe_id = response.data.recipe.id;

    const ingredientResponse: ApiResponse<any> = await api.recipeIngredientCreate({

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

  async componentDidMount () {
    const api = Api.create();

    const response: ApiResponse<any> = await api.recipeTags(this.props.user.access_token);
    this.setState({ tags: response.data })

    if (!response.ok) {
        console.log("TAG ERRORRR")
      return;
    }
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
              Create Recipe and tabs
              <RecipeTags
                tags={this.state.tags}
                selectedTags={this.state.selectedTags}
                onToggleTag={this.handleToggleTag}
              />
            </div>
            <div className="CreateRecipe__Container--Right column">
              <RecipeForm onSubmit={this.handleSubmit} />
            </div>
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
)(CreateRecipe);
