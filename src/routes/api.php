<?php

use Illuminate\Http\Request;

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
