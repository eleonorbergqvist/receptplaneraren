import React from "react";
import ReactDOM from "react-dom";
import InputList from "./InputList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <InputList
      items={[
        { amount: 1, measurement: "ml", ingredient: "Sugar" }
      ]}
      onChange={() => {}}
    />
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
