<?php

namespace Tests\Feature;

use App\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use DatabaseMigrations;

    public function setUp() : void
    {
        parent::setUp();

        $user = new User([
             'email'    => 'test1@email.com',
             'password' => '123456',
             'user_name' => 'Test Person',
         ]);

        $user->save();
    }

    /** @test */
    public function it_will_register_a_user()
    {
        $response = $this->post('api/register', [
            'email'    => 'test2@email.com',
            'password' => '123456',
            'user_name' => 'Test Person',
        ]);

        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in'
        ]);
    }
}
