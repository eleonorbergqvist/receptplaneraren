<?php

namespace App\Http\Controllers;

use App\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    /**
     * Display a listing of RecipeIngredients.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ingredients = Ingredient::all();

        return response()->json($ingredients);
    }

    /**
     * Store a newly created RecipeIngredient in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:ingredients',
        ]);

        $ingredient = Ingredient::create($request->all());

        return response()->json([
            'message' => 'Great success! New ingredient created',
            'ingredient' => $ingredient
        ]);
    }

    /**
     * Display a RecipeIngredient resource.
     *
     * @param  \App\RecipeIngredient  $recipeIngredient->id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ingredient = Ingredient::findOrFail($id);
        return response()->json([
            'ingredient' => $ingredient
        ]);
    }

    /**
     * Update RecipeIngredient resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RecipeIngredient  $recipeIngredient->id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->update($request->all());

        return response()->json([
            'message' => 'Great success! Ingredient updated',
            'ingredient' => $ingredient
        ]);
    }

    /**
     * Remove RecipeIngredient resource from storage.
     *
     * @param  \App\RecipeIngredient  $recipeIngredient->id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ingredient = Ingredient::findOrFail($id);
        $ingredient->delete();

        return response()->json([
            'message' => 'Successfully deleted ingredient!'
        ]);
    }
}
