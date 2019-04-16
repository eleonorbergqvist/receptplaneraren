<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    public $table = "ingredients";

    public function recipeIngredient()
    {
        return $this->belongsTo('App\RecipeIngredient');
    }
}
