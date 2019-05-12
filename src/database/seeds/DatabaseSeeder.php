<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        // $this->call(RecipeSeeder::class);
        // $this->call(RecipeIngredientSeeder::class);
        // $this->call(DayMealSeeder::class);
        // $this->call(RecipeRecipeTagSeeder::class);
        $this->call(RecipeTagSeeder::class);
    }
}
