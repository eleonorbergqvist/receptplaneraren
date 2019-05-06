import React from "react";
import ReactDOM from "react-dom";
import PrimaryMenuButton from "./PrimaryMenuButton";
import { MemoryRouter } from 'react-router'

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <PrimaryMenuButton
        text="Hello"
        link="/"
        className="MyLink"
      />
    </MemoryRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
