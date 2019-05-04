<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;


class UserTest extends TestCase
{
    use DatabaseMigrations;

    /** @test */
    public function it_will_show_all_userss()
    {
        $users = factory(User::class, 10)->create();

        $response = $this->get(route('users.index'));

        $response->assertStatus(200);

        $response->assertJson($users->toArray());
    }

    /** @test */
    public function it_will_create_a_user()
    {
        $response = $this->post(route('users.store'), [
            'email'       => 'test@test.test',
            'password' => '124hkjsL9)',
            'user_name' => 'Kalle Anka',
        ]);

        $response->assertStatus(200);

        $this->assertDatabaseHas('users', [
            'email' => 'test@test.test'
        ]);

        $response->assertJsonStructure([
            'message',
            'user' => [
                'email',
                'user_name',
                'updated_at',
                'created_at',
                'id'
            ]
        ]);
    }

    /** @test */
    public function it_will_show_one_user()
    {
        $this->post(route('users.store'), [
            'password' => '124hkjsL9)',
            'user_name' => 'Kalle Anka',
            'email' => 'test@test.com'
        ]);

        $user = User::all()->first();

        $response = $this->get(route('users.show', $user->id));

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'user' => [
                'email',
                'user_name',
                'updated_at',
                'created_at',
                'id'
            ]
        ]);
    }

    /** @test */
    public function it_will_update_a_user()
    {
        $this->post(route('users.store'), [
            'password' => '124hkjsL9)',
            'user_name' => 'Kalle Anka',
            'email' => 'test@test.com'
        ]);

        $user = User::all()->first();

        $response = $this->put(route('users.update', $user->id), [
            'user_name' => 'Updated name'
        ]);

        $response->assertStatus(200);

        $user = $user->fresh();

        $this->assertEquals($user->user_name, 'Updated name');

        $response->assertJsonStructure([
            'user' => [
                'email',
                'user_name',
                'updated_at',
                'created_at',
                'id'
            ]
       ]);
    }

    /** @test */
    public function it_will_delete_a_user()
    {
        $this->post(route('users.store'), [
            'password' => '124hkjsL9)',
            'user_name' => 'Kalle Anka',
            'email' => 'test@test.com'
        ]);

        $user = User::all()->first();

        $response = $this->delete(route('users.destroy', $user->id));

        $user = $user->fresh();

        $this->assertNull($user);

        $response->assertJsonStructure([
            'message'
        ]);
    }
}




