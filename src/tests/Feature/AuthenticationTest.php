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
             'email'    => 'test@email.com',
             'password' => '123456',
             'user_name' => 'Test Person',
         ]);

        $user->save();
    }

    /** @test */
    public function it_will_register_a_user()
    {
        $response = $this->post('api/register', [
            'email'    => 'test1@email.com',
            'password' => '123456',
            'user_name' => 'Test Person',
        ]);

        $response->assertJsonStructure([
            'access_token',
            'token_type',
            'expires_in'
        ]);
    }

    /** @test */
    public function it_wont_register_user_because_email_is_taken()
    {
        $response = $this->post('api/register', [
            'email' => 'test@email.com',
            'password' => '12546',
            'user_name' => 'Testy Test',
        ]);

        $response->assertStatus(400);
    }
}
