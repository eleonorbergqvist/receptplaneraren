<?php

namespace Tests\Feature;

use App\User;
use App\Recipe;
use Tests\TestCase;
use App\DayMeal;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use JWTAuth;
use App\RecipeIngredient;

class ShoppingListTest extends TestCase
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
    }

    /** @test */
    public function it_will_show_a_shopping_list()
    {
        $monday = '2019-05-13';

        $recipe = new Recipe([
            'instructions' => 'text',
            'title' => 'title',
            'slug' => 'slug',
            'user_id' => $this->user,
        ]);

        $recipe->fresh();

        $recipeIngredient = new RecipeIngredient([
            'amount' => 1,
            'ingredient_id' => factory(App\Ingredient::class),
            'recipe_id' => $recipe->id,
            'measurement' => 'dl',
        ]);

        $dayMeal = new DayMeal([
            'date' => $monday,
            'meal_type' => 0,
            'user_id' => $this->user->id,
            'recipe_id' => $recipe->id,
        ]);

        $response = $this->get(route('shoppingList.showWeek', $monday), ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'week',
            'shoppinglist',
        ]);
    }
}
