<?php

namespace App\Http\Controllers;

use App\Recipe;
use Illuminate\Http\Request;
use Cocur\Slugify\Slugify;
use JWTAuth;
use Auth;
use App\RecipeTag;
use finfo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

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
     * Display a listing of the resource.
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
            'tags' => 'nullable',
        ]);

        $recipe = new Recipe;
        $slugify = new Slugify();

        $recipe->status = $request->status;
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
     * Remove the specified resource from storage.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function storeImage(Request $request)
    {
        $request->validate([
            'recipe_id' => 'required',
            // 'image' => 'required|image64:jpeg,jpg,png,gif',
        ]);

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
            // $path = Storage::disk('local')->getDriver()->getAdapter()->getPathPrefix();

            $recipe->image = $file_name;
            $recipe->save();

            return response()->json([
                'message' => 'Successfully stored recipe image!',
                // 'path' => $path.$file_name,
                'path' => $file_name,
            ]);
        }
        else {
            // echo 'Error : Only JPEG, PNG & GIF allowed';
            return response()->json([
                'message' => 'Error : Only JPEG, PNG & GIF allowed'
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    // public function show($id)
    // {
    //     $recipe = Recipe::findOrFail($id);

    //     return response()->json([
    //         'recipe' => $recipe
    //     ]);
    // }

    public function show($slug)
    {
        $recipe = Recipe::where('slug', $slug)->first()->load(["recipeTags", "recipeIngredients.ingredient"]);
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
    public function update(Request $request, $slug)
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

          $recipe = Recipe::where('slug', $slug)->firstOrFail();
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
