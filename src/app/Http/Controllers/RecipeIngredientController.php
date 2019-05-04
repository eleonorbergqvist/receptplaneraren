<?php

namespace App\Http\Controllers;

use App\RecipeIngredient;
use App\Ingredient;
use Illuminate\Http\Request;
use Cocur\Slugify\Slugify;



class RecipeIngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recipeIngredient = RecipeIngredient::all();

        return response()->json($recipeIngredient);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'ingredients.*.amount' => 'required',
            'ingredients.*.measurement' => 'required',
            'ingredients.*.ingredient' => 'required',
            'recipe_id' => 'required',
        ]);

        $recipeIngredients = [];
        foreach ($request->ingredients as $ingredientData) {

            $ingredient = Ingredient::where('name', $ingredientData["ingredient"])->first();

            if (!$ingredient) {
                $ingredient = new Ingredient();
                $ingredient->name = $ingredientData["ingredient"];

                $slugify = new Slugify();
                $ingredient->slug = $slugify->slugify($ingredientData["ingredient"]);
                $ingredient->save();
                $this->ingredient = $ingredient;
            }

            $recipeIngredient = new RecipeIngredient();
            $recipeIngredient->amount = $ingredientData["amount"];
            $recipeIngredient->measurement = $ingredientData["measurement"];
            $recipeIngredient->recipe_id = $request->recipe_id;
            $recipeIngredient->ingredient_id = $ingredient->id;
            $recipeIngredient->save();

            $recipeIngredients[] = $recipeIngredient;
        }

        return response()->json([
            'message' => 'Great success! New recipe ingredients created',
            'recipeIngredients' => $recipeIngredients
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RecipeTag  $recipeTag
     * @return \Illuminate\Http\Response
     */
    public function updateAllForRecipe(Request $request)
    {
        $request->validate([
            'ingredients.*.amount' => 'required',
            'ingredients.*.measurement' => 'required',
            'ingredients.*.ingredient'    => 'required',
            'recipe_id' => 'required',
        ]);

        $recipeIngredients = RecipeIngredient::where('recipe_id', $request->recipe_id);

        $recipeIngredients->delete();

        $recipeIngredients = [];
        foreach ($request->ingredients as $ingredientData) {

            $ingredient = Ingredient::where('name', $ingredientData["ingredient"])->first();
            $this->ingredient = $ingredient;

            if (!$ingredient) {
                $ingredient = new Ingredient();
                $ingredient->name = $ingredientData["ingredient"];

                $slugify = new Slugify();
                $ingredient->slug = $slugify->slugify($ingredientData["ingredient"]);
                $ingredient->save();
                $this->ingredient = $ingredient;
            }

            $recipeIngredient = RecipeIngredient::updateOrCreate(
                [
                    'recipe_id' => $request->recipe_id,
                    'ingredient_id' => $this->ingredient->id,
                ],
                [
                    'amount' => $ingredientData["amount"],
                    'measurement' => $ingredientData["measurement"],
                ]
            );

            $recipeIngredient->fresh();
            $recipeIngredients[] = $recipeIngredient;
        }

        return response()->json([
            'message' => 'Great success! Recipe ingredient updated',
            'recipe-ingredients' => $recipeIngredients
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RecipeTag  $recipeTag
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $recipeIngredient = RecipeIngredient::findOrFail($id);
        $recipeIngredient->delete();

        return response()->json([
            'message' => 'Successfully deleted recipe ingredient!'
        ]);
    }
}
