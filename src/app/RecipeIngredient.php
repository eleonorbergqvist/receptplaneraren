<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
    public $table = 'recipe_ingredients';

    public function ingredient()
    {
        return $this->hasOne('App\Ingredient');
    }

    public function recipes()
    {
        return $this->hasMany('App\Recipe');
    }
}
