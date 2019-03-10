<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CatchAllRoutesTest extends TestCase
{
    public function testCaptureAllRoutes()
    {
        $response = $this->get("/ahjrölka");
        $response->assertStatus(200);
    }

    public function testThatRouteContainsReactDivId()
    {
        $response = $this->get("/randomroute");
        $response->assertSee("app");
    }
}
