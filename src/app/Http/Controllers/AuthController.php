<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api', ['except' => ['login', 'register']]);
    // }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        try {
            $user = User::create([
                'email' => $request->email,
                'password' => $request->password,
                'user_name' => $request->user_name,
            ]);
        } catch (QueryException $exception) {
            $errorInfo = $exception->errorInfo;
            return response()->json($errorInfo, 500);
        }

        $token = auth('api')->login($user);

        return $this->respondWithToken($token);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);
        if (!$token) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60
        ]);
    }

    // // somewhere in your controller
    // public function getAuthenticatedUser()
    // {
	// try {

	// 	if (! $user = JWTAuth::parseToken()->authenticate()) {
	// 		return response()->json(['user_not_found'], 404);
	// 	}

	// } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

	// 	return response()->json(['token_expired'], $e->getStatusCode());

	// } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

	// 	return response()->json(['token_invalid'], $e->getStatusCode());

	// } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

	// 	return response()->json(['token_absent'], $e->getStatusCode());

	// }

	// // the token is valid and we have found the user via the sub claim
	// return response()->json(compact('user'));
    // }
}
