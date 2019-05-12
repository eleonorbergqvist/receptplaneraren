<?php

use App\RecipeTag;
use Illuminate\Database\Seeder;

class RecipeTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RecipeTag::create(['name' => 'Breakfast', 'slug' => 'breakfast']);
        RecipeTag::create(['name' => 'Lunch', 'slug' => 'lunch']);
        RecipeTag::create(['name' => 'Dinner', 'slug' => 'dinner']);
        RecipeTag::create(['name' => 'Healthy', 'slug' => 'healthy']);
        RecipeTag::create(['name' => 'Fast', 'slug' => 'fast']);
        RecipeTag::create(['name' => 'Festive', 'slug' => 'festive']);
    }
}

