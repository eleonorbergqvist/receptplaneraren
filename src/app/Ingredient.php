<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    public $table = "ingredients";

    protected $fillable = [
        'name',
        'slug',
    ];

    public function recipeIngredient()
    {
        return $this->hasOne('App\RecipeIngredient');
    }
}
