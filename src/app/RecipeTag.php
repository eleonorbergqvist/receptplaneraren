<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecipeTag extends Model
{
    public $table = 'recipe_tags';

    protected $fillable = [
        'name',
        'slug',
    ];

    public function recipes()
    {
        return $this->belongsToMany('App\Recipe')->using('App\RecipeRecipeTag');
    }
}
