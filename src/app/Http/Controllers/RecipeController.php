<?php

namespace App\Http\Controllers;

use App\Recipe;
use Illuminate\Http\Request;
use Cocur\Slugify\Slugify;
use Auth;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    /**
     * Display a listing of the Recipes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $recipes = Recipe::all();
        return response()->json($recipes);
    }

    /**
     * Display a listing of the Recipes with related info.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexAndTagsAndIngredients()
    {
        $recipes = Recipe::all()->load(["recipeTags", "recipeIngredients.ingredient"]);

        return response()->json([
            'message' => 'Great success!',
            'recipes' => $recipes,
        ]);
    }

    /**
     * Store a newly created Recipe with tags in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'instructions' => 'required',
            'title' => 'required',
            'tags' => 'nullable',
        ]);

        $recipe = new Recipe;
        $slugify = new Slugify();

        $recipe->instructions = $request->instructions;
        $recipe->title = $request->title;
        $recipe->slug = $slugify->slugify($request->title);
        $recipe->user_id = Auth::user()->id;

        $recipe->save();
        $recipe->recipeTags()->sync($request->tags);
        $recipeTags = $recipe->recipeTags()->allRelatedIds()->toArray();;

        return response()->json([
            'message' => 'Great success! New recipe with tags created',
            'recipe' => $recipe,
            'recipeTags' => $recipeTags,
        ]);
    }


    /**
     * Remove the specified Recipe from storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeImage(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required',
            'image' => 'nullable',
        ]);

        if (!$request->image) {
            return response()->json([
                'message' => 'No new image provided'
            ]);
        }

        $recipe = Recipe::findOrFail($request->recipe_id);

        list($type, $imageData) = explode(';', $request->image);
        list(, $imageData) = explode(',', $imageData);


        $imageData = base64_decode($imageData);
        // Get file mime type
        preg_match(
            '/data:[a-z]*\/([a-z]*)/',
            substr($type, 0, 50),
            $imageMimeMatches
        );

        $mimeType = $imageMimeMatches[1];
        $fileType = $mimeType;

        // Validate type of file
        if(in_array($fileType, [ 'jpeg', 'png', 'gif' ])) {
            // Set a unique name to the file and save
            $file_name = 'images/' . uniqid() . '.' . $fileType;
            Storage::disk('local')->put('public/'.$file_name, $imageData);
            $recipe->image = $file_name;
            $recipe->save();

            return response()->json([
                'message' => 'Successfully stored recipe image!',
                'path' => $file_name,
            ]);
        }
        else {
            return response()->json([
                'message' => 'Error : Only JPEG, PNG & GIF allowed'
            ]);
        }
    }

    /**
     * Display the specified Recipe.
     *
     * @param  \App\Recipe  $recipe->slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $recipe = Recipe::where('slug', $slug)->first()->load(["recipeTags", "recipeIngredients.ingredient"]);
        return response()->json([
            'recipe' => $recipe
        ]);
    }

    /**
     * Update the specified Recipe in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Recipe  $recipe->slug
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $slug)
    {
        $request->validate([
            'instructions' => 'required',
            'title' => 'required',
            'image' => 'nullable',
            'tags' => 'nullable',
            'slug' => 'required',
          ]);

        $recipe = Recipe::where('slug', $slug)->firstOrFail();
        $recipe->update($request->all());
        $recipe->recipeTags()->sync($request->tags);
        $recipeTags = $recipe->recipeTags()->allRelatedIds()->toArray();;

          return response()->json([
              'message' => 'Great success! Recipe updated',
              'recipe' => $recipe,
              'recipeTags' => $recipeTags,
          ]);
    }

    /**
     * Remove the specified Recipe from storage.
     *
     * @param  \App\Recipe  $recipe->id
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
