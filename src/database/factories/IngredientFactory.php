<?php

use Faker\Generator as Faker;

$factory->define(App\Ingredient::class, function (Faker $faker) {
    return [
        'name' => $faker->word(),
        'slug' => $faker->unique()->slug(),
    ];
});
