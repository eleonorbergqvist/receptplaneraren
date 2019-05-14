import React, { Component } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";
import { iApi } from "../../services/Api";
import { HeaderLoggedIn } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { RecipeTags, iRecipeTag } from "../../components/RecipeTags/RecipeTags";
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
type Props = connectedProps & { api: iApi } & RouteComponentProps

interface RecipeEditState {
  tags: any[],
  selectedTags: Number[],
  recipe: iRecipe,
  slug: string,
  isLoading: boolean,
  isLoaded: boolean,
  error: string,
}

interface SelectedTag {
  id: number,
}
interface iRecipe {
  slug: string;
  id: number;
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
      slug: '',
      id: 0,
      title: '',
      image: '',
      instructions: '',
      ingredients: [],
    },
    isLoading: false,
    isLoaded: false,
    error: '',
  }

  async componentDidMount () {
    const { api } = this.props

    this.setState({ isLoading: true });

    const promises = [
      api.recipeTags(this.props.user.access_token),
			api.recipeBySlug(this.props.user.access_token, this.state.slug),
    ];

    const results = await Promise.all(promises);
    const tagsResponse: ApiResponse<any> = results[0];
    const recipeResponse: ApiResponse<any> = results[1];

    if (!tagsResponse.ok || !recipeResponse.ok) {
      this.setState({ isLoading: false, error: "Error loading recipe"});
      return;
    }

    const selectedTagsObjects = recipeResponse.data.recipe.recipe_tags;
    const selectedTags = selectedTagsObjects.map((obj: SelectedTag) => obj.id)
    const ingredients = recipeResponse.data.recipe.recipe_ingredients

    const formattedIngredients: iIngredient[] = ingredients.map((ingredient: any) => ({
      amount: ingredient.amount,
      measurement: ingredient.measurement,
      ingredient: ingredient.ingredient.name,
    }));

    const formattedRecipe: iRecipe = {
      id: recipeResponse.data.recipe.id,
      slug: recipeResponse.data.recipe.slug,
      title: recipeResponse.data.recipe.title,
      image: recipeResponse.data.recipe.image,
      instructions: recipeResponse.data.recipe.instructions,
      ingredients: formattedIngredients,
    };

    console.log("WOOO");
    console.log(formattedRecipe);

    this.setState({
      tags: tagsResponse.data,
      selectedTags: selectedTags,
      recipe: formattedRecipe,
      isLoading: false,
      isLoaded: true,
    })
  }

  handleSubmit = async (values: any, actions: FormikActions<any>) => {
    const { api } = this.props

    actions.setSubmitting(true);

    const recipeId = this.state.recipe.id;
    const promises = [
      api.recipeUpdate(
        {
          instructions: values.instructions,
          title: values.title,
          tags: this.state.selectedTags,
          slug: this.state.slug,
        }, this.props.user.access_token
      ),
      api.recipeIngredientUpdate(
        {
          ingredients: values.ingredients,
          recipe_id: recipeId,
        }, this.props.user.access_token
      ),
      api.recipeImage(
        {
          image: values.image,
          recipe_id: recipeId,
        },
        this.props.user.access_token
      )
    ]

    const results = await Promise.all(promises);
    const response: ApiResponse<any> = results[0]
    const imageResponse: ApiResponse<any> = results[2];

    if (!response.ok || !imageResponse.ok) {
      actions.setSubmitting(false);
      actions.setErrors({
        general: "Error, cannot update recipe"
      });
      return;
    }

    this.props.history.push(`/recipe/detail/${this.state.recipe.slug}`)
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
      <div className="RecipeEdit">
        <HeaderLoggedIn  />
        <main className="container">
          <div className="RecipeEdit__Container columns">
            <div className="RecipeEdit__Container--Left column is-two-fifths">
              <h5 className="title is-5">Edit Recipe</h5>
              {this.state.isLoading && <div className="loader"></div>}
              {this.state.error && <p>{this.state.error}</p>}

              {!this.state.isLoading &&
                <RecipeTags
                  className=""
                  tags={this.state.tags}
                  selectedTags={this.state.selectedTags}
                  onToggleTag={this.handleToggleTag}
                />
              }
            </div>
            <div className="RecipeEdit__Container--Right column">
              {this.state.recipe && this.state.isLoaded &&
                <RecipeEditForm
                  recipe={this.state.recipe}
                  onSubmit={this.handleSubmit}
                />
              }
            </div>
          </div>
        </main>
        <Footer copyrightText="Copyright 2019. Receptplaneraren" />
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(RecipeEdit);
