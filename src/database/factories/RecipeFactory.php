<?php

use Faker\Generator as Faker;

$factory->define(App\Recipe::class, function (Faker $faker) {
    return [
        'status' => $faker->text(),
        'instructions' => $faker->text(),
        'title' => $faker->word(),
        'slug' => $faker->slug(),
        'user_id' => factory(App\User::class),
    ];
});
