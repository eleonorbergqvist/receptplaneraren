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
        return $this->belongsTo('App\Ingredient');
    }

    public function recipe()
    {
        return $this->belongsTo('App\Recipe');
    }
}
