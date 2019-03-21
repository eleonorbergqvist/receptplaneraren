<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements JWTSubject
{
  public $table = "users";

  public function getJWTIdentifier()
  {
      return $this->getKey();
  }

  public function getJWTCustomClaims()
  {
      return [];
  }
  public function setPasswordAttribute($password)
  {
      if ( !empty($password) ) {
          $this->attributes['password'] = bcrypt($password);
      }
  }

  protected $fillable = [
    'email',
    'password',
    'user_name',
  ];
}
