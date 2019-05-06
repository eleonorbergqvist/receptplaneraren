import React from "react";
import ReactDOM from "react-dom";
import Header, { HeaderLoggedIn, HeaderLoggedOut } from "./Header";
import { MemoryRouter } from 'react-router'

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <Header
        buttons={[]}
      />
    </MemoryRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders logged in without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <HeaderLoggedIn />
    </MemoryRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders logged out in without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <HeaderLoggedOut />
    </MemoryRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
