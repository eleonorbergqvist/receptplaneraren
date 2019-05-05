<?php

namespace Tests\Feature;

use App\User;
use App\Recipe;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use JWTAuth;


class RecipeImageTest extends TestCase
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
    public function it_will_save_image()
    {
        $recipe = new Recipe([
            'status' => $this->faker->text(),
            'instructions' => $this->faker->text(),
            'title' => 'TestRecept',
            'slug' => $this->faker->slug(),
            'user_id' => $this->user->id,
        ]);

        $recipe->save();
        $recipe->fresh();

        $image = $this->faker->imageUrl();
        $imageContents = file_get_contents($image);
        $base64Image = base64_encode($imageContents);
        $base64WithAdditionalData = 'data:image/jpeg;'.$base64Image.',SGVsbG8sIFdvcmxkIQ%3D%3D';

        $response = $this->post(route('recipes.storeImage'), [
            'recipe_id' => $recipe->id,
            'image' => $base64WithAdditionalData,
        ], ['Authorization' => 'Bearer ' . $this->token]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('recipes', [
            'image' => $response->getData()->path,
        ]);

        $response->assertJsonStructure([
            'message',
            'path',
        ]);
    }
}
