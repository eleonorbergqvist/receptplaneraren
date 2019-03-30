<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Notifications\PasswordResetRequest;
use App\Notifications\PasswordResetSuccess;
use App\User;

class PasswordResetController extends Controller
{
    /**
     * Create token password reset
     *
     * @param  [string] email
     * @return [string] message
     */
    public function create(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'We cant find a user with that e-mail address.'
            ], 404);
        }

        $user->reset_token = str_random(60);
        $user->reset_token_last_updated = Carbon::now();
        $user->save();
        $user->notify(
            new PasswordResetRequest($user->reset_token)
        );

        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ]);
    }

     /**
     * Reset password
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @param  [string] token
     * @return [string] message
     * @return [json] user object
     */
    public function reset(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
            'reset_token' => 'required|string'
        ]);

        $user = User::where('reset_token', $request->reset_token)->first();
        if (!$user)
            return response()->json([
                'message' => 'This password reset token is invalid.'
            ], 404);

        if (Carbon::parse($user->reset_token_last_updated)->addMinutes(720)->isPast()) {
            return response()->json([
                'message' => 'This link has expired'
            ], 404);
        }

        $user->password = $request->password;
        $user->reset_token = null;
        $user->reset_token_last_updated = null;
        $user->save();
        $user->notify(new PasswordResetSuccess($user));

        return response()->json([
            'message' => 'Successfully changed password.'
        ], 200);
    }
}
