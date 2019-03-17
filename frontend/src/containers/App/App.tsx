import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import StartLoggedIn from "../../components/StartLoggedIn";
import StartLoggedOut from "../../components/StartLoggedOut";
import "./App.css";

class App extends Component {

  async componentDidMount() {
    const response = await fetch('/api/ping');
    console.log(response);
  }

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
