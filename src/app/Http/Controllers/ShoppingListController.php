<?php

namespace App\Http\Controllers;

use App\RecipeIngredient;
use Carbon\CarbonImmutable;

class ShoppingListController extends Controller
{
    /**
     * Get shoppinglist for a given week.
     *
     * @param  [string]  $monday (YYYY-MM-DD)
     * @return \Illuminate\Http\Response
     */
    public function showWeek($monday)
    {
        $carbonMonday = CarbonImmutable::createFromFormat('Y-m-d', $monday);
        error_log($carbonMonday);
        $week = $carbonMonday->isoWeek();
        $this->startDate = $carbonMonday->startOfWeek(CarbonImmutable::MONDAY)->format('Y-m-d');
        $this->endDate = $carbonMonday->endOfWeek(CarbonImmutable::SUNDAY)->format('Y-m-d');

        $ingredients = RecipeIngredient::with('ingredient')->whereHas('recipe.daymeals', function($q) {
            $q->whereBetween('date',[$this->startDate, $this->endDate]);})->get();

        return response()->json([
            'week' => $week,
            'shoppinglist' => $ingredients,
        ]);
    }
}
