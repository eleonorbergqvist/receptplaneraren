import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { getEnv } from "../../config";
import Api from "../../services/Api";
import StartLoggedIn from "../StartLoggedIn/StartLoggedIn";
import StartLoggedOut from "../StartLoggedOut/StartLoggedOut";
import LogIn from "../LogIn/LogIn";
import LogOut from "../LogOut/LogOut";
import Register from "../Register/Register";
import ResetPassword from "../ResetPassword/ResetPassword";
import CreateResetPassword from "../CreateResetPassword/CreateResetPassword";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import BrowseRecipes from "../BrowseRecipes/BrowseRecipes";
import RecipeDetail from "../RecipeDetail/RecipeDetail";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import RecipeEdit from "../RecipeEdit/RecipeEdit";
import "./App.css";
import CreateRecipeByImage from "../CreateRecipeByImage/CreateRecipeByImage";

const withApi = (Component: any) => {
  const api = Api.create(getEnv("API_URL"), getEnv("OCR_SCANNER_URL"));
  return (props:any) => <Component api={api} {...props} />
}

class App extends Component {
  render() {
    return (
      <div className="App">
       <BrowserRouter>
          <Switch>
            <Route exact path="/" component={StartLoggedOut} />
            <Route path="/welcome" component={withApi(StartLoggedIn)} />
            <Route path="/register" component={withApi(Register)} />
            <Route path="/login" component={withApi(LogIn)} />
            <Route path="/logout" component={LogOut} />
            <Route path="/recipe/create" component={withApi(CreateRecipe)} />
            <Route path="/recipe/image/create" component={withApi(CreateRecipeByImage)} />
            <Route path="/recipe/browse" component={withApi(BrowseRecipes)} />
            <Route path="/recipe/detail/:slug" component={withApi(RecipeDetail)} />
            <Route path="/recipe/edit/:slug" component={withApi(RecipeEdit)} />
            <Route path="/password/create" component={withApi(CreateResetPassword)} />
            <Route path="/password/reset/:token" component={withApi(ResetPassword)} />
            <Route path="/terms-and-conditions" component={TermsAndConditions} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
