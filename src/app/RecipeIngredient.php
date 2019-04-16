<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
    public $table = 'recipe_ingredients';

    protected $fillable = [
        'amount',
        'measurement',
        'ingredient_id',
        'recipe_id',
    ];

    public function ingredient()
    {
        return $this->hasOne('App\Ingredient');
    }

    public function recipes()
    {
        return $this->hasMany('App\Recipe');
    }
}
