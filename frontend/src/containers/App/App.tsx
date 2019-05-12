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
import CreateRecipeByImage from "../CreateRecipeByImage/CreateRecipeByImage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import "./App.css";

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
            <Route path="/register" component={withApi(Register)} />
            <Route path="/login" component={withApi(LogIn)} />
            <Route path="/logout" component={LogOut} />
            <Route path="/password/create" component={withApi(CreateResetPassword)} />
            <Route path="/password/reset/:token" component={withApi(ResetPassword)} />
            <Route path="/terms-and-conditions" component={TermsAndConditions} />

            <PrivateRoute path="/welcome" component={withApi(StartLoggedIn)} />
            <PrivateRoute path="/recipe/create" component={withApi(CreateRecipe)} />
            <PrivateRoute path="/recipe/image/create" component={withApi(CreateRecipeByImage)} />
            <PrivateRoute path="/recipe/browse" component={withApi(BrowseRecipes)} />
            <PrivateRoute path="/recipe/detail/:slug" component={withApi(RecipeDetail)} />
            <PrivateRoute path="/recipe/edit/:slug" component={withApi(RecipeEdit)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
