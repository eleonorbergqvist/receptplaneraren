<?php

use Faker\Generator as Faker;

$factory->define(App\RecipeTag::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'slug' => $faker->unique()->slug(),
    ];
});
