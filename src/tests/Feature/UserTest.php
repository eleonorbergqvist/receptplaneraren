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
    public function it_will_create_users()
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
                'password',
                'user_name',
                // 'last_login',
                // 'reset_token',
                'updated_at',
                'created_at',
                'id'
            ]
        ]);
    }

    // /** @test XXX */
    // public function it_will_show_a_user()
    // {
    //     $this->post(route('users.store'), [
    //         'password' => '124hkjsL9)',
    //         'user_name'       => 'Kalle Anka',
    //         'email' => 'test@test.com'
    //     ]);

    //     $user = User::all()->first();

    //     $response = $this->get(route('users.show', $user->id));

    //     $response->assertStatus(200);

    //     $response->assertJson($user->toArray());
    // }

    /** @test */
    // public function it_will_update_a_task()
    // {
    //     $this->post(route('tasks.store'), [
    //         'title'       => 'This is a title',
    //         'description' => 'This is a description'
    //     ]);

    //     $task = Task::all()->first();

    //     $response = $this->put(route('tasks.update', $task->id), [
    //         'title' => 'This is the updated title'
    //     ]);

    //     $response->assertStatus(200);

    //     $task = $task->fresh();

    //     $this->assertEquals($task->title, 'This is the updated title');

    //     $response->assertJsonStructure([
    //        'message',
    //        'task' => [
    //            'title',
    //            'description',
    //            'updated_at',
    //            'created_at',
    //            'id'
    //        ]
    //    ]);
    // }

    /** @test */
    // public function it_will_delete_a_task()
    // {
    //     $this->post(route('tasks.store'), [
    //         'title'       => 'This is a title',
    //         'description' => 'This is a description'
    //     ]);

    //     $task = Task::all()->first();

    //     $response = $this->delete(route('tasks.destroy', $task->id));

    //     $task = $task->fresh();

    //     $this->assertNull($user);

    //     $response->assertJsonStructure([
    //         'message'
    //     ]);
    // }

    /** @test */
}




