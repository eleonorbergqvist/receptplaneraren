import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import StartLoggedIn from "../StartLoggedIn/StartLoggedIn";
import StartLoggedOut from "../StartLoggedOut/StartLoggedOut";
import LogIn from "../LogIn/LogIn";
import LogOut from "../LogOut/LogOut";
import Register from "../Register/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={StartLoggedOut} />
          <Route path="/welcome" component={StartLoggedIn} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={LogIn} />
          <Route path="/logout" component={LogOut} />
        </Switch>
      </div>
    );
  }
}

export default App;
