<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DayMeal extends Model
{
    public $table = 'day_meals';

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function recipe()
    {
        return $this->hasOne('App\Recipe');
    }
}
