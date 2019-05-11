<?php

namespace Tests\Feature;

use App\User;
use App\Recipe;
use App\DayMeal;
use App\RecipeTag;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use JWTAuth;

class DayMealTest extends TestCase
{
    use DatabaseMigrations;
    use WithFaker;

    public function setUp() : void
    {
        parent::setUp();

        $user = new User([
             'email'    => 'test@test.test',
             'password' => '124hkjsL9)',
             'user_name' => 'Test Person',
         ]);

        $user->save();
        $user->fresh();
        $this->user = $user;

        $token = JWTAuth::attempt(['email' => 'test@test.test',
        'password' => '124hkjsL9)']);
        $this->token = $token;

        $recipe = new Recipe([
            // 'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
         ]);

        $recipe->save();
        $recipe->fresh();
        $this->recipe = $recipe;
    }

    /** @test */
    public function it_will_show_all_day_meals_only_this()
    {
        $daymeals = factory(DayMeal::class, 10)->create();

        $response = $this->get(route('daymeals.index'),
            ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        // $response->assertJson($daymeals->toArray());
        //save as datestring ?
    }

    /** @test */
    public function it_will_show_all_day_meals_for_the_current_week()
    {
        $daymeals = factory(DayMeal::class, 10)->create();

        $response = $this->get(route('daymeals.getCurrentWeek'),
            ['Authorization' => 'Bearer ' . $this->token]);


        $response->assertStatus(200);


        $response->assertJsonStructure([
            'week',
            'daymeals' => [
            ],
        ]);
        // dd($response->exception);
    }

    /** @test */
    public function it_will_show_all_day_meals_for_the_week_given_a_date()
    {
        $monday = '2019-04-29';

        $daymeal = new DayMeal([
            'date' => $monday,
            'meal_type' => 1,
            'user_id' => $this->user->id,
            'recipe_id' => $this->recipe->id,
        ]);
        $daymeal->save();

        $response = $this->get(route('daymeals.showWeek', $monday),
            ['Authorization' => 'Bearer ' . $this->token]);


        // dd($response->exception);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'week',
            'daymeals' => [
            ],
        ]);
    }

    /** @test */
    public function it_will_create_or_update_a_daymeal()
    {
        $date = '2019-04-23 14:26:05';
        $meals = factory(DayMeal::class, 10)->create();

        $response = $this->put(route('daymeals.update'), [
            'date' => $date,
            'meal_type' => 1,
            'recipe_id' => $this->recipe->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);


        // dd($response->exception);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'message',
            'daymeal' => [
            ],
        ]);
    }

    /** @test */
    public function it_will_update_a_daymeal_entry_that_already_exists()
    {
        $newRecipe = new Recipe([
            // 'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'title' => 'New Recipe',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
         ]);

        $newRecipe->save();
        $newRecipe->fresh();

        $date = '2019-04-23 14:26:05';

        $daymeal = new DayMeal();
        $daymeal->date = $date;
        $daymeal->meal_type = 0;
        $daymeal->recipe_id = $this->recipe->id;
        $daymeal->user_id = $this->user->id;
        $daymeal->save();

        $response = $this->put(route('daymeals.update'), [
            'date' => $date,
            'meal_type' => 0,
            'recipe_id' => $newRecipe->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);


        // dd($response->exception);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'message',
            'daymeal' => [
            ],
        ]);

        $response->assertJson([
            'daymeal' => [
                'recipe_id' => $newRecipe->id,
            ],
        ]);
    }
}
