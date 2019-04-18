<?php

namespace App\Http\Controllers;

use App\Recipe;
use Illuminate\Http\Request;
use Cocur\Slugify\Slugify;
use JWTAuth;
use Auth;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recipes = Recipe::all();
        return response()->json($recipes);
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
            'status' => 'required',
            'instructions' => 'required',
            'title' => 'required',
        ]);

        $recipe = new Recipe;
        $slugify = new Slugify();

        $recipe->status = $request->status;
        $recipe->instructions = $request->instructions;
        $recipe->title = $request->title;
        $recipe->slug = $slugify->slugify($request->title);
        $recipe->user_id = Auth::user()->id;
        $recipe->save();

        return response()->json([
            'message' => 'Great success! New recipe created',
            'recipe' => $recipe
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $recipe = Recipe::findOrFail($id);

        return response()->json([
            'recipe' => $recipe
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function edit(Recipe $recipe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([

            //Ta birt detta?
            'status' => 'required',
            'instructions' => 'required',
            'preparation_time' => 'nullable',
            'title' => 'required',
            'image' => 'nullable',
            'slug' => 'required',
            'portions' => 'nullable',
          ]);

          $recipe = Recipe::findOrFail($id);
          $recipe->update($request->all());

          return response()->json([
              'message' => 'Great success! Recipe updated',
              'recipe' => $recipe
          ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $recipe = Recipe::findOrFail($id);
        $recipe->delete();

        return response()->json([
            'message' => 'Successfully deleted recipe!'
        ]);
    }
}
