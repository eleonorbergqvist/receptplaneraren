<?php

use Faker\Generator as Faker;

$factory->define(App\RecipeIngredient::class, function (Faker $faker) {
    return [
        'amount' => $faker->randomFloat(2,0,999999),
        'ingredient_id' => factory(App\Ingredient::class),
        'recipe_id' => factory(App\Recipe::class),
        'measurement' => $faker->randomDigit(),
    ];
});
