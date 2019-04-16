<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    public $table = 'recipes';

    protected $fillable = [
        'status',
        'instructions',
        'title',
        'slug',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function recipeIngredients()
    {
        return $this->belongsToMany('App\RecipeIngredient');
    }

    public function recipeTags()
    {
        return $this->belongsToMany('App\RecipeTag')->using('App\RecipeRecipeTag');
    }
}
