<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
  public function index()
  {
      $users = User::all();

      return response()->json($users);
  }

  public function store(Request $request)
  {
      $request->validate([
          'email' => 'required',
          'password' => 'required',
          'user_name' => 'required'
      ]);

      $user = User::create($request->all());

      return response()->json([
          'message' => 'Great success! New user created',
          'user' => $user
      ]);
  }

  public function show(User $user)
  {
    return response()->json([
      'user' => $user
    ]);
  }

  public function update(Request $request, User $user)
  {
      $request->validate([
        'email' => 'nullable',
        'password' => 'nullable',
        'user_name' => 'nullable'
      ]);

      $user->update($request->all());

      return response()->json([
          'message' => 'Great success! User updated',
          'user' => $user
      ]);
  }

  public function destroy(User $user)
  {
      $user->delete();

      return response()->json([
          'message' => 'Successfully deleted user!'
      ]);
  }
}
