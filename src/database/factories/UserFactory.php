<?php

use Faker\Generator as Faker;

$factory->define(App\User::class, function (Faker $faker) {
    return [
      'email'       => $faker->email(),
      'password' => $faker->password(),
      'user_name' => $faker->userName(),
    ];
});
