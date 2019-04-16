<?php

namespace Tests\Feature;

use App\User;
use App\RecipeTag;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;


class RecipeTagTest extends TestCase
{
    use DatabaseMigrations;
    use WithFaker;

    /** @test */
    public function it_will_show_all_recipe_tags()
    {
        $tags = factory(RecipeTag::class, 10)->create();

        $response = $this->get(route('recipe-tags.index'));

        $response->assertStatus(200);

        $response->assertJson($tags->toArray());
    }

    /** @test */
    public function it_will_create_recipe_tag()
    {
        $response = $this->post(route('recipe-tags.store'), [
            'name' => 'TestTag',
            'slug' => $this->faker->slug(),
        ]);

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
        ]);

        $tag = RecipeTag::all()->first();

        $response = $this->put(route('recipe-tags.update', $tag->id), [
            'name' => 'This is the updated name',
        ]);

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
            'name' => $this->faker->text(),
            'slug' => $this->faker->slug(),
        ]);

        $tag = RecipeTag::all()->first();

        $response = $this->delete(route('recipe-tags.destroy', $tag->id));

        $response->assertStatus(200);

        $this->assertNull(RecipeTag::find($tag->id));

        $response->assertJsonStructure([
            'message'
        ]);
    }
}
