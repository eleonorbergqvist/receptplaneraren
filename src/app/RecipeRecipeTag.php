<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class RecipeRecipeTag extends Pivot
{
    public $table = 'recipe_recipe_tag';
    public $incrementing = true;
}
