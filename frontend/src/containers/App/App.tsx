import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import StartLoggedIn from "../StartLoggedIn/StartLoggedIn";
import StartLoggedOut from "../StartLoggedOut/StartLoggedOut";
import LogIn from "../LogIn/LogIn";
import LogOut from "../LogOut/LogOut";
import Register from "../Register/Register";
import ResetPassword from "../ResetPassword/ResetPassword";
import CreateResetPassword from "../CreateResetPassword/CreateResetPassword";
import CreateRecipe from "../CreateRecipe/CreateRecipe";
import "./App.css";
import BrowseRecipes from "../BrowseRecipes/BrowseRecipes";

class App extends Component {
  render() {
    return (
      <div className="App">
       <BrowserRouter>
          <Switch>
            <Route exact path="/" component={StartLoggedOut} />
            <Route path="/welcome" component={StartLoggedIn} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={LogIn} />
            <Route path="/logout" component={LogOut} />
            <Route path="/recipe/create" component={CreateRecipe} />
            <Route path="/recipe/browse" component={BrowseRecipes} />
            <Route path="/password/create" component={CreateResetPassword} />
            <Route path="/password/reset/:token" component={ResetPassword} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
