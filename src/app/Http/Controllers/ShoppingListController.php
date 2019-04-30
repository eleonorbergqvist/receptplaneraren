<?php

namespace App\Http\Controllers;

use App\DayMeal;
use App\RecipeIngredient;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
use Auth;

class ShoppingListController extends Controller
{
    /**
     * Get shoppinglist for a given week.
     *
     * @return \Illuminate\Http\Response
     */
    public function showWeek($monday)
    {
        $carbonMonday = CarbonImmutable::createFromFormat('Y-m-d', $monday);
        $week = $carbonMonday->isoWeek();
        $this->startDate = $carbonMonday->startOfWeek(CarbonImmutable::MONDAY)->format('Y-m-d');
        $this->endDate = $carbonMonday->endOfWeek(CarbonImmutable::SUNDAY)->format('Y-m-d');

        // get recipeingredients and ingredients for daymeals recipes between 2 dates
        $ingredients = RecipeIngredient::with('ingredient')->whereHas('recipe.daymeals', function($q) {
            $q->whereBetween('date',[$this->startDate, $this->endDate]);})->get();

            // $ingredients = $ingredients->toArray();

        return response()->json([
            'week' => $week,
            'shoppinglist' => $ingredients,
        ]);
    }
}
