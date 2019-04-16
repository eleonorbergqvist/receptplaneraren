<?php

use Faker\Generator as Faker;

$factory->define(App\RecipeRecipeTag::class, function (Faker $faker) {
    return [
        'recipe_id' => factory(App\Recipe::class),
        'recipe_tag_id' => factory(App\RecipeTag::class),
    ];
});
