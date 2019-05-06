<?php

namespace Tests\Feature;

use App\User;
use App\Recipe;
use Tests\TestCase;
use App\RecipeTag;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use JWTAuth;


class RecipeTest extends TestCase
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
    public function it_will_show_all_recipes()
    {
        $recipes = factory(Recipe::class, 10)->create();

        $response = $this->get(route('recipes.index'), ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $response->assertJson($recipes->toArray());
    }

    /** @test */
    public function it_will_create_recipes()
    {
        $response = $this->post(route('recipes.store'), [
            'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('recipes', [
            'title' => 'TestRecept'
        ]);

        $response->assertJsonStructure([
            'message',
            'recipe' => [
                'status',
                'instructions',
                'title',
                'slug',
                'user_id',
                'updated_at',
                'created_at',
                'id'
            ]
        ]);
    }

    /** @test */
    public function it_will_show_a_recipe()
    {
        $this->post(route('recipes.store'), [
            'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $recipe = Recipe::all()->first();

        $response = $this->get(route('recipes.show', $recipe->slug), ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'recipe' => [
                'id',
                'status',
                'instructions',
                'title',
                'slug',
                'user_id',
            ]
        ]);
    }

    /** @test */
    public function it_will_update_a_recipe()
    {
        $this->post(route('recipes.store'), [
            'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $recipe = Recipe::all()->first();

        $response = $this->put(route('recipes.update', $recipe->slug), [
            'title' => 'This is the updated title',
            'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'slug' => $this->faker->slug(),
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $recipe = $recipe->fresh();

        $this->assertEquals($recipe->title, 'This is the updated title');

        $response->assertJsonStructure([
           'message',
           'recipe' => [
                'id',
                'status',
                'instructions',
                'title',
                'slug',
                'user_id',
        ]
       ]);
    }

    /** @test */
    public function it_will_delete_a_recipe()
    {
        $this->post(route('recipes.store'), [
            'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $recipe = Recipe::all()->first();

        $response = $this->delete(route('recipes.destroy', $recipe->id), [], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $this->assertNull(Recipe::find($recipe->id));

        $response->assertJsonStructure([
            'message'
        ]);
    }

    /** @test */
    public function it_will_save_recipe_and_its_tags()
    {
        $tags = factory(RecipeTag::class, 2)->create();

        $response = $this->post(route('recipes.store'), [
            'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
            'tags' => $tags,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('recipes', [
            'title' => 'TestRecept'
        ]);

        $response->assertJsonStructure([
            'message',
            'recipe' => [
                'status',
                'instructions',
                'title',
                'slug',
                'user_id',
                'updated_at',
                'created_at',
                'id'
            ],
            'recipeTags',
        ]);
    }

    /** @test */
    public function it_will_show_all_recipes_with_tags_and_ingredients()
    {
        $tags = factory(RecipeTag::class, 2)->create();

        $response = $this->post(route('recipes.store'), [
            'status' => $this->faker->word(),
            'instructions' => $this->faker->text(200),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
            'tags' => $tags,
        ], ['Authorization' => 'Bearer ' . $this->token]);

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

        $response = $this->get(route('recipes.indexAndTagsAndIngredients'),
            ['Authorization' => 'Bearer ' . $this->token]);

        echo $response->exception;
        $response->assertStatus(200);

        var_dump($response->getContent());

        $response->assertJsonStructure([
            'message',
            'recipes' => [
                '*' => [
                    'status',
                    'instructions',
                    'title',
                    'slug',
                    'user_id',
                    'updated_at',
                    'created_at',
                    'id',
                    'recipe_tags' => [
                        '*' => [
                            'id',
                        ]
                    ],
                    'recipe_ingredients' => [
                        '*' => [
                            'amount',
                            'measurement',
                            'ingredient',
                        ]
                    ],
                ],
            ],
        ]);
    }

}




