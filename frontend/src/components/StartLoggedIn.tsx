import React, { Component } from "react";
import { Link } from "react-router-dom";

class StartLoggedIn extends Component {

  async componentDidMount() {
    const response = await fetch('/api/ping');
    console.log(response);
  }

  render() {
    return (
      <div>
          <h1>StartLoggedIn</h1>
          <Link to={`/`}>Visit StartLoggedOut page.</Link>
      </div>
    );
  }
}

export default StartLoggedIn;