<?php

namespace Tests\Feature;

use App\Ingredient;
use App\User;
use JWTAuth;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;


class IngredientTest extends TestCase
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
    public function it_will_show_all_ingredients()
    {
        $ingredients = factory(Ingredient::class, 10)->create();

        $response = $this->get(route('ingredients.index'), ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $response->assertJson($ingredients->toArray());
    }

    /** @test */
    public function it_will_create_ingredient()
    {
        $response = $this->post(route('ingredients.store'), [
            'name' => 'TestIngredient',
            'slug' => $this->faker->slug(),
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('ingredients', [
            'name' => 'TestIngredient'
        ]);

        $response->assertJsonStructure([
            'message',
            'ingredient' => [
                'id',
                'name',
                'slug',
            ]
        ]);
    }

    /** @test */
    public function it_will_show_an_ingredient()
    {
        $this->post(route('ingredients.store'), [
            'name' => 'TestIngredient',
            'slug' => $this->faker->slug(),
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $ingredient = Ingredient::all()->first();

        $response = $this->get(route('ingredients.show', $ingredient->id), ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'ingredient' => [
                'id',
                'name',
                'slug',
            ]
        ]);

        // $response->assertJson($ingredient->toArray());
    }

    /** @test */
    public function it_will_update_an_ingredient()
    {
        $this->post(route('ingredients.store'), [
            'name' => 'TestIngredient',
            'slug' => $this->faker->slug(),
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $ingredient = Ingredient::all()->first();

        $response = $this->put(route('ingredients.update', $ingredient->id), [
            'name' => 'This is the updated name',
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $ingredient = $ingredient->fresh();

        $this->assertEquals($ingredient->name, 'This is the updated name');

        $response->assertJsonStructure([
           'message',
           'ingredient' => [
                'id',
                'name',
                'slug',
        ]
       ]);
    }

    /** @test */
    public function it_will_delete_an_ingredient()
    {
        $this->post(route('ingredients.store'), [
            'name' => $this->faker->text(),
            'slug' => $this->faker->slug(),
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $ingredient = Ingredient::all()->first();

        $response = $this->delete(route('ingredients.destroy', $ingredient->id), [], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $this->assertNull(Ingredient::find($ingredient->id));

        $response->assertJsonStructure([
            'message'
        ]);
    }
}
