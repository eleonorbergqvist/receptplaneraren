<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PingTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testPingTest()
    {
        $response = $this->get('/api/ping');

        $response->assertJson(["status" => "pong"]);
    }
}
