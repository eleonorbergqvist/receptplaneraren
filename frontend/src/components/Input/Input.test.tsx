import React from "react";
import ReactDOM from "react-dom";
import Input from "./Input";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Input
      type="email"
      className="Input"
      placeholder="Your email"
      value="hello@bobby.se"
      onChange={() => {}}
      onBlur={() => {}}
    />
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
