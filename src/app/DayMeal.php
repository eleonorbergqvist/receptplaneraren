<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DayMeal extends Model
{
    public $table = 'day_meals';

    protected $fillable = [
        'date',
        'meal_type',
        'user_id',
        'recipe_id',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function recipe()
    {
        return $this->belongsTo('App\Recipe');
    }
}
