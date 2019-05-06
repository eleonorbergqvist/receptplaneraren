<?php

namespace Tests\Feature;

use App\User;
use JWTAuth;
use App\RecipeTag;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;


class RecipeTagTest extends TestCase
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
    }

    /** @test */
    public function it_will_show_all_recipe_tags()
    {
        $tags = factory(RecipeTag::class, 10)->create();

        $response = $this->get(route('recipe-tags.index'), ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $response->assertJson($tags->toArray());
    }

    /** @test */
    public function it_will_create_recipe_tag()
    {
        $response = $this->post(route('recipe-tags.store'), [
            'name' => 'TestTag',
            'slug' => $this->faker->slug(),
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('recipe_tags', [
            'name' => 'TestTag'
        ]);

        $response->assertJsonStructure([
            'message',
            'recipe-tag' => [
                'id',
                'name',
                'slug',
            ]
        ]);
    }

    /** @test */
    public function it_will_update_a_recipe_tag()
    {
        $this->post(route('recipe-tags.store'), [
            'name' => 'TestTag',
            'slug' => $this->faker->slug(),
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $tag = RecipeTag::all()->first();

        $response = $this->put(route('recipe-tags.update', $tag->id), [
            'name' => 'This is the updated name',
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $tag = $tag->fresh();

        $this->assertEquals($tag->name, 'This is the updated name');

        $response->assertJsonStructure([
           'message',
           'recipe-tag' => [
                'id',
                'name',
                'slug',
        ]
       ]);
    }

    /** @test */
    public function it_will_delete_a_recipe_tag()
    {
        $this->post(route('recipe-tags.store'), [
            'name' => $this->faker->text(100),
            'slug' => $this->faker->slug(),
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $tag = RecipeTag::all()->first();

        $response = $this->delete(route('recipe-tags.destroy', $tag->id), [], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $this->assertNull(RecipeTag::find($tag->id));

        $response->assertJsonStructure([
            'message'
        ]);
    }
}
