import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";
import { iRootState, Dispatch } from "../../store";
import { iApi } from "../../services/Api";
import { HeaderLoggedIn } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { RecipeTags, iRecipeTag } from "../../components/RecipeTags/RecipeTags";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import "./CreateRecipe.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({

});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type Props = connectedProps & { api: iApi }

interface CreateRecipeState {
  tags: any[];
  selectedTags: Number[];
}

class CreateRecipe extends Component<Props, CreateRecipeState> {
  state: CreateRecipeState = {
    tags: [],
    selectedTags: [],
  }

  async componentDidMount () {
    const { api } = this.props
    const response: ApiResponse<any> = await api.recipeTags(this.props.user.access_token);
    this.setState({ tags: response.data })

    if (!response.ok) {
        console.log("TAG ERRORRR")
      return;
    }
  }

  handleSubmit = async (values: any, actions: FormikActions<any>) => {

    console.log('CreateRecipe.handleSubmit');
    console.log(values);

    const { api } = this.props

    actions.setSubmitting(true);

    const response: ApiResponse<any> = await api.recipeCreate({
      instructions: values.instructions,
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

    await api.recipeIngredientCreate({
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
        <HeaderLoggedIn />
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
