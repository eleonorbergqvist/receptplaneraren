<?php

use Carbon\Carbon;
use App\User;
use App\Helpers\SPAConfig;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/password/reset/{token}', function ($token) {
    $user = User::where('reset_token', $token)->first();

    if (!$user) {
        return response('Invalid link', 404);
    }

    if (Carbon::parse($user->reset_token_last_updated)->addMinutes(720)->isPast()) {
        return response()->json([
            'message' => 'This link has expired'
        ], 404);
    }

    return file_get_contents(public_path("index.html"));
})->name("password.change");

Route::get('{view}', function () {
    $html = file_get_contents(public_path("index.html"));
    return SPAConfig::insertSPAConfig($html);
})->where('view', '.*');

/*
function insertSPAConfig(string $html): string {
    $spaConfig = getSPAConfig();
    return preg_replace(
        '/<script\ id=\\"config\\"><\/script>/', $spaConfig, $html
    );
}

function getSPAConfig(): string {
    $config = [
        'API_URL' => "/api/",
    ];
    return '<script id="config">window.config = '.json_encode($config).'</script>';
}
*/
