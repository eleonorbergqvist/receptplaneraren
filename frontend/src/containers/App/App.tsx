import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import StartLoggedIn from "../StartLoggedIn/StartLoggedIn";
import StartLoggedOut from "../StartLoggedOut/StartLoggedOut";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={StartLoggedOut}/>
          <Route path='/welcome' component={StartLoggedIn}/>
        </Switch>
      </div>
    );
  }
}

export default App;
