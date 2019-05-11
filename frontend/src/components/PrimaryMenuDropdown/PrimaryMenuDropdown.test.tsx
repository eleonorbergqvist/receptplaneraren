import React from "react";
import ReactDOM from "react-dom";
import PrimaryMenuDropdown from "./PrimaryMenuDropdown";
import { MemoryRouter } from 'react-router'

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <MemoryRouter>
      <PrimaryMenuDropdown
        className="header__button--yellow"
        label="Create bobby"
        items={[
          {label: "Create manually", to: "/recipe/create"},
          {label: "Create with image", to: "/recipe/image/create"}
        ]}
      />
    </MemoryRouter>
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
