import React from "react";
import ReactDOM from "react-dom";
import Select from "./Select";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Select
      options={[]}
      name="select"
      value={1}
      onChange={() => {}}
      onBlur={() => {}}
    />
  , div);
  ReactDOM.unmountComponentAtNode(div);
});
