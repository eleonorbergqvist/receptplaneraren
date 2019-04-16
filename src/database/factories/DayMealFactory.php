<?php

use Faker\Generator as Faker;

$factory->define(App\DayMeal::class, function (Faker $faker) {
    return [
        'date' => $faker->dateTime(),
        'meal_type' => $faker->randomDigit(),
        'user_id' => factory(App\User::class),
        'recipe_id' => factory(App\Recipe::class),
    ];
});
