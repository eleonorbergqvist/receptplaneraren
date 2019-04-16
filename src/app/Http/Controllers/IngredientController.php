<?php

namespace App\Http\Controllers;

use App\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ingredients = Ingredient::all();

        return response()->json($ingredients);
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
     * Display the specified resource.
     *
     * @param  \App\RecipeIngredient  $recipeIngredient
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RecipeIngredient  $recipeIngredient
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
     * Remove the specified resource from storage.
     *
     * @param  \App\RecipeIngredient  $recipeIngredient
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
