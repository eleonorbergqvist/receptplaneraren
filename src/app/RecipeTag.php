<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecipeTag extends Model
{
    public $table = 'recipe_tags';

    public function recipes()
    {
        return $this->belongsToMany('App\Recipe');
    }
}
