<?php

namespace App\Http\Controllers;

use App\RecipeTag;
use Illuminate\Http\Request;

class RecipeTagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tags = RecipeTag::all();

        return response()->json($tags);
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
            'slug' => 'required|unique:recipe_tags',
        ]);

        $tag = RecipeTag::create($request->all());

        return response()->json([
            'message' => 'Great success! New tag created',
            'recipe-tag' => $tag
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\RecipeTag  $recipeTag
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
          $tag = RecipeTag::findOrFail($id);
          $tag->update($request->all());

          return response()->json([
              'message' => 'Great success! Recipe tag updated',
              'recipe-tag' => $tag
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
        $tag = RecipeTag::findOrFail($id);
        $tag->delete();

        return response()->json([
            'message' => 'Successfully deleted recipe tag!'
        ]);
    }
}
