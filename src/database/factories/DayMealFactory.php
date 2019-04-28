<?php

use Faker\Generator as Faker;

$factory->define(App\DayMeal::class, function (Faker $faker) {
    return [
        'date' => $faker->date(),
        'meal_type' => $faker->numberBetween(0, 2),
        'user_id' => factory(App\User::class),
        'recipe_id' => factory(App\Recipe::class),
    ];
});
