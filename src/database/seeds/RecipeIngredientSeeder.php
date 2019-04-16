<?php

use App\RecipeIngredient;
use Illuminate\Database\Seeder;

class RecipeIngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(RecipeIngredient::class, 10)->create();
    }
}
