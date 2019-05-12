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


it("makes sure measurements gets formatted", () => {
  const ingredients = linesToIngredients([
    "1 ounce can white beans",
    "3 tablespoons mellow white miso paste",
    "2 teaspoons granulated onion",
    "12 teaspoon cayenne pepper (optional)",
    "6 ounces soba noodles or spaghetti noodles of choice",
    "2 cups frozen organic edamame",
    "½ cup chopped fresh cilantro (about 2 handfuls)",
  ])

  expect(ingredients).toEqual([
    {amount: 1, measurement: "oz", ingredient: "can white beans"},
    {amount: 3, measurement: "tbs", ingredient: "mellow white miso paste"},
    {amount: 2, measurement: "tbsp", ingredient: "granulated onion"},
    {amount: 12, measurement: "tbsp", ingredient: "cayenne pepper (optional)"},
    {amount: 6, measurement: "oz", ingredient: "soba noodles or spaghetti noodles of choice"},
    {amount: 2, measurement: "cup", ingredient: "frozen organic edamame"},
    {amount: 0.5, measurement: "cup", ingredient: "chopped fresh cilantro (about 2 handfuls)"},
  ]);
});
