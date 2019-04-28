<?php

use Faker\Generator as Faker;

$factory->define(App\DayMeal::class, function (Faker $faker) {
    return [
        'date' => $faker->dateTimeBetween('22 April 2019', '28 April 2019', null),
        'meal_type' => $faker->numberBetween(0, 3),
        'user_id' => factory(App\User::class),
        'recipe_id' => factory(App\Recipe::class),
    ];
});
