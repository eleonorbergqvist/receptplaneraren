import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { FormikActions } from "formik";
import Api from "../../services/Api";

import "./CreateRecipe.css";
import Header from "../../components/Header/Header";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";
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

class CreateRecipe extends Component<Props> {
  handleSubmit = async (values: any, actions: FormikActions<any>) => {

    console.log('CreateRecipe.handleSubmit');
    console.log(values);

    const api = Api.create();

    actions.setSubmitting(true);

    const response: ApiResponse<any> = await api.recipeCreate({
      instructions: values.description,
      title: values.title,
    }, this.props.user.access_token);
    
    actions.setSubmitting(false);

    if (!response.ok) {
      actions.setErrors({
        general: "Fel, kunde inte spara recept"
      });
      return;
    }

    actions.setSubmitting(true);

    const recipe_id = response.data.recipe.id;

    const response2: ApiResponse<any> = await api.recipeIngredientCreate({

      ingredients: values.ingredients,
      recipe_id: recipe_id,
    }, this.props.user.access_token);

    actions.setSubmitting(false);

    if (!response2.ok) {
      actions.setErrors({
        general: "Fel, kunde inte spara ingredienser"
      });
      return;
    }

  };

  public buttons = [
    <PrimaryMenuButton
      key={1}
      text="Create Recipe"
      link={"#"}
      class="header__button--yellow is-active"
    />,
    <PrimaryMenuButton
      key={2}
      text="Browse Recipes"
      link={"#"}
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

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="CreateRecipe">
        <Header buttons={this.buttons} />
        <div className="CreateRecipe__Container columns">
          <div className="CreateRecipe__Container--Left column">
            Create Recipe and tabs
          </div>
          <div className="CreateRecipe__Container--Right column">
            <RecipeForm onSubmit={this.handleSubmit} />
          </div>
        </div>
        <Footer copyrightText="" />
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(CreateRecipe);