<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
  protected $fillable = [
    'email',
    'password',
    'user_name',
  ];
}
