<?php

use App\RecipeRecipeTag;
use Illuminate\Database\Seeder;

class RecipeRecipeTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(RecipeRecipeTag::class, 10)->create();
    }
}
