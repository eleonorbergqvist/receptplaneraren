<?php

use Illuminate\Http\Request;
use App\Http\Controllers\RecipeTagController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/ping', function() {
    return ["status" => "pong"];
});

Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
Route::post('/logout', 'AuthController@logout');

Route::get('/users', 'UserController@index')->name('users.index');
Route::post('/users', 'UserController@store')->name('users.store');
Route::get('/users/{user}', 'UserController@show')->name('users.show');
Route::put('/users/{user}', 'UserController@update')->name('users.update');
Route::delete('/users/{user}', 'UserController@destory')->name('users.destroy');

Route::middleware(['jwt.auth'])->group(function () {
    Route::get('/recipes', 'RecipeController@index')->name('recipes.index');
    Route::get('/recipesAll', 'RecipeController@indexAndTagsAndIngredients')->name('recipes.indexAndTagsAndIngredients');


    Route::post('/recipes', 'RecipeController@store')->name('recipes.store');
    Route::post('/recipes/image/store', 'RecipeController@storeImage')->name('recipes.storeImage');
    Route::get('/recipes/{slug}', 'RecipeController@show')->name('recipes.show');
    // Route::get('/recipes/{id}', 'RecipeController@show')->name('recipes.show');
    Route::put('/recipes/{id}', 'RecipeController@update')->name('recipes.update');
    Route::delete('/recipes/{id}', 'RecipeController@destroy')->name('recipes.destroy');

    Route::get('/recipe-tags', 'RecipeTagController@index')->name('recipe-tags.index');
    Route::post('/recipe-tags', 'RecipeTagController@store')->name('recipe-tags.store');
    Route::put('/recipe-tags/{id}', 'RecipeTagController@update')->name('recipe-tags.update');
    Route::delete('/recipe-tags/{id}', 'RecipeTagController@destroy')->name('recipe-tags.destroy');

    Route::get('/ingredients', 'IngredientController@index')->name('ingredients.index');
    Route::post('/ingredients', 'IngredientController@store')->name('ingredients.store');
    Route::get('/ingredients/{id}', 'IngredientController@show')->name('ingredients.show');
    Route::put('/ingredients/{id}', 'IngredientController@update')->name('ingredients.update');
    Route::delete('/ingredients/{id}', 'IngredientController@destroy')->name('ingredients.destroy');

    Route::get('/recipe-ingredients', 'RecipeIngredientController@index')->name('recipe-ingredients.index');
    Route::post('/recipe-ingredients', 'RecipeIngredientController@store')->name('recipe-ingredients.store');
    // Route::put('/recipe-ingredients/{id}', 'RecipeIngredientController@update')->name('recipe-ingredients.update');
    Route::delete('/recipe-ingredients/{id}', 'RecipeIngredientController@destroy')->name('recipe-ingredients.destroy');
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'password'
], function () {
    Route::post('create', 'PasswordResetController@create')->name('password.create');
    Route::post('reset', 'PasswordResetController@reset')->name('password.reset');
});
