<?php

namespace Tests\Feature;

use App\Ingredient;
use App\User;
use App\Recipe;
use App\RecipeIngredient;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Response;
use JWTAuth;


class RecipeIngredientTest extends TestCase
{
    use DatabaseMigrations;
    use WithFaker;

    public function setUp() : void
    {
        parent::setUp();

        $user = new User([
            'email' => 'test@test.test',
            'password' => '124hkjsL9)',
            'user_name' => 'Kalle Anka',
        ]);

        $user->save();
        $user->fresh();
        $token = JWTAuth::attempt(['email' => 'test@test.test',
        'password' => '124hkjsL9)']);
        $this->user = $user;
        $this->token = $token;

        $recipe = new Recipe([
            'status' => $this->faker->word(),
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
    public function it_will_show_all_recipe_ingredients()
    {
        $recipeIngredients = factory(RecipeIngredient::class, 10)->create();

        $response = $this->get(route('recipe-ingredients.index'), ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $response->assertJson($recipeIngredients->toArray());
    }

    /** @test */
    public function it_will_create_recipe_ingredient()
    {
        $recipe = Recipe::all()->first();

        $response = $this->post(route('recipe-ingredients.store'), [
            'ingredients' => [
                [
                    'amount' => '100',
                    'measurement' => 'dl',
                    'ingredient' => 'tomat'
                ],
                [
                    'amount' => '10',
                    'measurement' => 'kg',
                    'ingredient' => 'gurka'
                ],
            ],
            'recipe_id' => $recipe->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        echo $response->exception;
        $response->assertStatus(200);


        $this->assertDatabaseHas('recipe_ingredients', [
            'amount' => '100'
        ]);

        $response->assertJsonStructure([
            'message',
            'recipeIngredients' => [
                [
                    'id',
                    'amount',
                    'measurement',
                    'recipe_id',
                    'ingredient_id',
                ]
            ]
        ]);
    }

    /** @test */
    public function it_will_not_create_ingredient_if_it_already_exists_when_creating_recipe_ingredient()
    {
        $recipe = Recipe::all()->first();

        $ingredientsResponse = $this->post(route('ingredients.store'), [
            'name' => 'TestIngrediens',
            'slug' => 'test-ingrediens',
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response = $this->post(route('recipe-ingredients.store'), [
            'ingredients' => [
                [
                    'amount' => '100',
                    'measurement' => '1',
                    'ingredient' => 'TestIngrediens',
                ],
            ],
            'recipe_id' => $recipe->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $count = Ingredient::count();
        $this->assertEquals($count, 1);

    }

    /** @test */
    public function it_will_delete_all_and_add_new_recipe_ingredients()
    {
        $recipe = Recipe::all()->first();

        $response = $this->post(route('recipe-ingredients.store'), [
            'ingredients' => [
                [
                    'amount' => '100',
                    'measurement' => '1',
                    'ingredient' => 'TestIngrediens',
                ],
            ],
            'recipe_id' => $recipe->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $recipeIngredient = RecipeIngredient::all()->first();

        $response = $this->put(route('recipe-ingredients.updateAllForRecipe'), [
            'ingredients' => [
                [
                    'amount' => '200',
                    'measurement' => '1',
                    'ingredient' => [
                        'name' => 'TestIngrediens',
                    ],
                ],
            ],
            'recipe_id' => $this->recipe->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $recipeIngredient = RecipeIngredient::all()->first();

        $this->assertEquals($recipeIngredient->amount, '200.00');

        $response->assertJsonStructure([
           'message',
           'recipe-ingredients' => [
               [
                'id',
                'amount',
                'measurement',
                'recipe_id',
                'ingredient_id',
               ],
            ],
       ]);
    }

    // /** @test */
    // public function it_will_delete_a_recipe_ingredient()
    // {
    //     $recipe = Recipe::all()->first();



    //     $response = $this->post(route('recipe-ingredients.store'), [
    //         'ingredients' => [
    //             [
    //                 'amount' => '100',
    //                 'measurement' => 'dl',
    //                 'ingredient' => 'tomat'
    //             ]
    //         ],
    //         'recipe_id' => $recipe->id,
    //     ], ['Authorization' => 'Bearer ' . $this->token]);

    //     $recipeIngredient = RecipeIngredient::all()->first();

    //     $response = $this->delete(route('recipe-ingredients.destroy', $recipeIngredient->id));

    //     $response->assertStatus(200);

    //     $this->assertNull(RecipeIngredient::find($recipeIngredient->id));

    //     $response->assertJsonStructure([
    //         'message'
    //     ]);
    // }
}
