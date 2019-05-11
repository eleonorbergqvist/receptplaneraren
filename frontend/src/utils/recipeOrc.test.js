import { linesToIngredients } from "./recipeOcr"

it("returns empty lines when containing falsy values", () => {
  const ingredients = linesToIngredients([
    "",
    false,
    null,
    undefined
  ])

  expect(ingredients).toEqual([]);
});

it("properly handles ingredient starting with amount", () => {
  const ingredients = linesToIngredients([
    "50 g margarin",
  ])

  expect(ingredients).toEqual([
    {amount: 50, measurement: "g", ingredient: "margarin"}
  ]);
});

it("trimes values before formatting", () => {
  const ingredients = linesToIngredients([
    " 50 g margarin",
  ])

  expect(ingredients).toEqual([
    {amount: 50, measurement: "g", ingredient: "margarin"}
  ]);
});

it("handles optional measurements", () => {
  const ingredients = linesToIngredients([
    "3-4 dl oil",
  ])

  expect(ingredients).toEqual([
    {amount: 3, measurement: "dl", ingredient: "oil"}
  ]);
});

it("handles special measurement chars", () => {
  const ingredients = linesToIngredients([
    "½ dl oil",
    "⅓ dl oil",
    "⅔ dl oil",
    "1⅔ dl oil",
  ])

  expect(ingredients).toEqual([
    {amount: 0.5, measurement: "dl", ingredient: "oil"},
    {amount: 0.3, measurement: "dl", ingredient: "oil"},
    {amount: 0.6, measurement: "dl", ingredient: "oil"},
    {amount: 1.6, measurement: "dl", ingredient: "oil"},
  ]);
});

it("handles spaces within amount", () => {
  const ingredients = linesToIngredients([
    "1 ½ small onion",
  ])

  expect(ingredients).toEqual([
    {amount: 1.5, measurement: "small", ingredient: "onion"},
  ]);
});

it("handles ingredients with spaces", () => {
  const ingredients = linesToIngredients([
    "1 dl olive oil",
    "1 - 2 dl olive oil",
  ])

  expect(ingredients).toEqual([
    {amount: 1, measurement: "dl", ingredient: "olive oil"},
    {amount: 1, measurement: "dl", ingredient: "olive oil"},
  ]);
});

it("handles or separator within amount", () => {
  const ingredients = linesToIngredients([
    "1 or 2 dl olive oil",
  ])

  expect(ingredients).toEqual([
    {amount: 1, measurement: "dl", ingredient: "olive oil"},
  ]);
});

it("makes sure measurement are lowercased", () => {
  const ingredients = linesToIngredients([
    "1 or 2 DL olive oil",
  ])

  expect(ingredients).toEqual([
    {amount: 1, measurement: "dl", ingredient: "olive oil"},
  ]);
});
