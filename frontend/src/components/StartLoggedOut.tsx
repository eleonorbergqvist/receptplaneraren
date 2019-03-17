import React, { Component } from "react";
import { Link } from "react-router-dom";

class StartLoggedOut extends Component {

  async componentDidMount() {
    const response = await fetch('/api/ping');
    console.log(response);
  }

  render() {
    return (
      <div>
          <h1>StartLoggedOut</h1>
          <Link to={`/welcome`}>Visit StartLoggedIn page.</Link>
      </div>
    );
  }
}

export default StartLoggedOut;