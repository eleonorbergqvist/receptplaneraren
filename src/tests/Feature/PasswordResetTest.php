<?php

namespace Tests\Feature;

use App\User;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use DatabaseMigrations;

    protected $user;

    public function setUp() : void
    {
        parent::setUp();

        $user = new User([
            'email'    => 'test@test.com',
            'password' => '123456',
            'user_name' => 'Test Person',
         ]);

        $user->save();

        $this->user = $user;
    }

    /** @test */
    public function it_will_create_a_reset_token_and_return_ok()
    {
        $response = $this->post('api/password/create', [
            'email' => 'test@test.com',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'message',
        ]);
    }

    /** @test */
    public function it_will_make_sure_create_token_is_set()
    {
        $response = $this->post('api/password/create', [
            'email' => 'test@test.com',
        ]);

        $response->assertStatus(200);
        $user = User::where('email', "test@test.com")->first();

        $this->assertNotNull($user->reset_token);
        $this->assertNotNull($user->reset_token_last_updated);
    }

    /** @test */
    public function it_will_make_sure_a_email_is_sent_on_create_reset_token()
    {
        Notification::fake();

        $response = $this->post('api/password/create', [
            'email' => 'test@test.com',
        ]);

        $response->assertStatus(200);

        $user = User::where('email', "test@test.com")->first();

        Notification::assertSentTo(
            [$user],
            PasswordResetRequest::class,
            function ($notification) use ($user) {
                $mailData = $notification->toMail($user)->toArray();

                $this->assertEquals('Reset Password', $mailData['actionText']);
                $this->assertEquals(
                    route("password.change", ["token" => $user->reset_token]),
                    $mailData['actionUrl']
                );

                return true;
            }
        );
    }

    /** @test */
    public function it_will_change_user_password_if_token_is_correct()
    {
        Notification::fake();

        $userWithToken = new User([
            'email'    => 'john.doe@example.com',
            'password' => '123456',
            'user_name' => 'Test Person',
            'reset_token' => 'ajsdjsndaldnndaienacs',
            'reset_token_last_updated' => Carbon::now(),
        ]);
        $userWithToken->save();

        $response = $this->post(route('password.reset'), [
            'password' => 'new-password',
            'reset_token' => 'ajsdjsndaldnndaienacs',
        ]);
        $response->assertStatus(200);

        // Verify that email have changed
        $userWithToken = User::where('email', "john.doe@example.com")->first();
        $hasher = app('hash');
        $this->assertTrue($hasher->check('new-password', $userWithToken->password));

        // Verify notification mail
        Notification::assertSentTo(
            $userWithToken,
            PasswordResetSuccess::class,
            function ($notification) use ($userWithToken) {
                $mailData = $notification->toMail($userWithToken->toArray());

                return true;
            }
        );
    }

    /** @test */
    public function it_will_not_change_password_with_invalid_token()
    {
        $userWithToken = new User([
            'email'    => 'john.doe@example.com',
            'password' => '123456',
            'user_name' => 'Test Person',
            'reset_token' => 'ajsdjsndaldnndaienacs',
            'reset_token_last_updated' => Carbon::now(),
        ]);
        $userWithToken->save();

        $response = $this->post(route('password.reset'), [
            'password' => 'new-password',
            'reset_token' => 'invalid_token',
        ]);
        $response->assertStatus(404);
    }

    /** @test */
    public function it_will_not_change_password_if_token_has_expired()
    {
        $userWithToken = new User([
            'email'    => 'john.doe@example.com',
            'password' => '123456',
            'user_name' => 'Test Person',
            'reset_token' => 'ajsdjsndaldnndaienacs',
            'reset_token_last_updated' => Carbon::parse('2000-01-01 00:00:00'),
        ]);
        $userWithToken->save();

        $response = $this->post(route('password.reset'), [
            'password' => 'new-password',
            'reset_token' => 'ajsdjsndaldnndaienacs',
        ]);
        $response->assertStatus(404);
    }

    /** @test */
    public function it_will_return_404_on_change_password_route_if_invalid_token()
    {
        $userWithToken = new User([
            'email'    => 'john.doe@example.com',
            'password' => '123456',
            'user_name' => 'Test Person',
            'reset_token' => 'ajsdjsndaldnndaienacs',
            'reset_token_last_updated' => Carbon::now(),
        ]);
        $userWithToken->save();

        $url = route('password.change', ['reset_token' => 'invalid token']);

        $response = $this->get($url);
        $response->assertStatus(404);
    }

    /** @test */
    public function it_will_return_404_on_change_password_route_if_token_has_expired()
    {
        $userWithToken = new User([
            'email'    => 'john.doe@example.com',
            'password' => '123456',
            'user_name' => 'Test Person',
            'reset_token' => 'ajsdjsndaldnndaienacs',
            'reset_token_last_updated' => Carbon::parse('2000-01-01 00:00:00'),
        ]);
        $userWithToken->save();

        $url = route('password.change', ['reset_token' => 'ajsdjsndaldnndaienacs']);

        $response = $this->get($url);
        $response->assertStatus(404);
    }
}
