import React from "react";
import ReactDOM from "react-dom";
import IngredientsInput from "./IngredientsInput";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <IngredientsInput
      index={1}
      amount={1}
      measurement={"ml"}
      ingredient={"Sugar"}
    />
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
