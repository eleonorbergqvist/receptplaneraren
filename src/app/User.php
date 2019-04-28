<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    public $table = "users";

    public function recipes()
    {
        $this->hasMany('App\Recipe');
    }

    public function dayMeals()
    {
        $this->hasMany('App\DayMeal');
    }

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

    protected $hidden = ['password'];

    protected $fillable = [
        'email',
        'password',
        'user_name',
        'reset_token',
        'reset_token_last_updated',
    ];

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
