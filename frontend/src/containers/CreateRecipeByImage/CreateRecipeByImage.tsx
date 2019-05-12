import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { iRootState, Dispatch } from "../../store";
import { linesToIngredients } from "../../utils/recipeOcr"
import { iApi } from "../../services/Api";
import { HeaderLoggedIn } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import RecipeByImageForm from "../../components/RecipeByImageForm/RecipeByImageForm";
import 'react-image-crop/dist/ReactCrop.css';
import "./CreateRecipeByImage.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({

});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type Props = connectedProps & { api: iApi }

interface CreateRecipeByImageState {
  originalImageData: string,

  dataToBePassedToRecipe: any,
  redirectToEditRecipe: boolean,
}

class CreateRecipeByImage extends Component<Props, CreateRecipeByImageState> {
  state: CreateRecipeByImageState = {
    originalImageData: '',

    dataToBePassedToRecipe: {},
    redirectToEditRecipe: false,
  }

  handleFormSubmit = async (values: any) => {
    console.log('CreateRecipeByImage.handleSubmit');
    console.log(values);

    const promises = [
      this.props.api.scanRecipe(values.titleImageData),
      this.props.api.scanRecipe(values.instructionsImageData),
      this.props.api.scanRecipe(values.ingredientsImageData),
    ]

    const results = await Promise.all(promises);

    console.log(results);
    let formattedResults = results.map((x: any) => x.data || {})
    formattedResults = formattedResults.map((x: any) => x.data || [])
    console.log(formattedResults);

    let ingredients = linesToIngredients(formattedResults[2])
    const recipeData = {
      title: formattedResults[0].join(" "),
      instructions: formattedResults[1].join(" "),
      ingredients: ingredients,
      image: values.imageData,
    }

    this.setState({
      dataToBePassedToRecipe: recipeData,
      redirectToEditRecipe: true,
    });
  };

  // export interface iIngredient {
  //   amount: number;
  //   measurement: string;
  //   ingredient: string;
  // }


  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={"/"} />;
    }

    if (this.state.redirectToEditRecipe) {
      return (
        <Redirect
          to={{
            pathname: '/recipe/create',
            state: this.state.dataToBePassedToRecipe,
          }}
        />
      )
    }

    return (
      <div className="CreateRecipe">
        <HeaderLoggedIn />
        <main className="container is-fluid">
          <div className="CreateRecipe__Container--Right">
            <RecipeByImageForm
              onSubmit={this.handleFormSubmit}
            />
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
)(CreateRecipeByImage);
