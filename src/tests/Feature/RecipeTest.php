<?php

namespace Tests\Feature;

use App\User;
use App\Recipe;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;


class RecipeTest extends TestCase
{
    use DatabaseMigrations;
    use WithFaker;

    public function setUp() : void
    {
        parent::setUp();

        $user = new User([
             'email'    => 'test@email.com',
             'password' => '123456',
             'user_name' => 'Test Person',
         ]);

        $user->save();

        $this->user = $user;
    }

    /** @test */
    public function it_will_show_all_recipes()
    {
        $recipes = factory(Recipe::class, 10)->create();

        $response = $this->get(route('recipes.index'));

        $response->assertStatus(200);

        $response->assertJson($recipes->toArray());
    }

    /** @test */
    public function it_will_create_recipes()
    {
        $response = $this->post(route('recipes.store'), [
            'status' => $this->faker->text(),
            'instructions' => $this->faker->text(),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ]);

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
            'status' => $this->faker->text(),
            'instructions' => $this->faker->text(),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ]);

        $recipe = Recipe::all()->first();

        $response = $this->get(route('recipes.show', $recipe->id));

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
            'status' => $this->faker->text(),
            'instructions' => $this->faker->text(),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ]);

        $recipe = Recipe::all()->first();

        $response = $this->put(route('recipes.update', $recipe->id), [
            'title' => 'This is the updated title',
            'status' => $this->faker->text(),
            'instructions' => $this->faker->text(),
            'slug' => $this->faker->slug(),
        ]);

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
            'status' => $this->faker->text(),
            'instructions' => $this->faker->text(),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ]);

        $recipe = Recipe::all()->first();

        $response = $this->delete(route('recipes.destroy', $recipe->id));

        $response->assertStatus(200);

        $this->assertNull(Recipe::find($recipe->id));

        $response->assertJsonStructure([
            'message'
        ]);
    }

}



