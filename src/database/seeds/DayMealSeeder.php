<?php

use App\DayMeal;
use Illuminate\Database\Seeder;

class DayMealSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(DayMeal::class, 10)->create();
    }
}
