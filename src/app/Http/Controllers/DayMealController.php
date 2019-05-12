<?php

namespace App\Http\Controllers;

use App\DayMeal;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Auth;

class DayMealController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $daymeals = DayMeal::with(['recipe', 'user']);

        return response()->json($daymeals);

    }

    /**
     * Display all dayMeals for the current week.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCurrentWeek()
    {
        $now = CarbonImmutable::now();
        $week = CarbonImmutable::now()->isoWeek();

        $startDate = $now->startOfWeek(CarbonImmutable::MONDAY);
        $endDate = CarbonImmutable::now()->endOfWeek(CarbonImmutable::SUNDAY);

        $daymeals = DayMeal::with(
            'user',
            'recipe.recipeIngredients.ingredient',
            'recipe.recipeTags'
        )->orderBy(
            'date'
        )->whereBetween(
            'date',[$startDate, $endDate]
        )->get();
        $daymeals = $daymeals->toArray();

        $daymealsByDate = array_reduce($daymeals, function($acc, $daymeal) {
            $date = date("Y-m-d", strtotime($daymeal['date']));

            $meals = $acc[$date] ?? [];
            $meals[] = $daymeal;

            $acc[$date] = $meals;
            return $acc;
        }, []);

        $formattedDaymeals = [];
        foreach ($daymealsByDate as $key => $value) {
            $formattedDaymeals[] = [$key, $value];
        }

        $formattedDaymeals = array_map(function ($item) {
            $date = $item[0];
            $daymeals = $item[1];

            usort($daymeals, function($a, $b) {
                return $a['meal_type'] <=> $b['meal_type'];
            });

            return [$date, $daymeals];
        }, $formattedDaymeals);

        return response()->json([
            'week' => $week,
            'daymeals' => $formattedDaymeals,
        ]);
    }

    /**
     * Display all dayMeals and related info for the given week.
     *
     * @param  $monday ('YYYY-MM-DD')
     * @return \Illuminate\Http\Response
     */
    public function showWeek($monday)
    {
        $carbonMonday = CarbonImmutable::createFromFormat('Y-m-d', $monday);
        $week = $carbonMonday->isoWeek();
        $startDate = $carbonMonday->startOfWeek(CarbonImmutable::MONDAY)->format('Y-m-d');
        $endDate = $carbonMonday->endOfWeek(CarbonImmutable::SUNDAY)->format('Y-m-d');
        error_log($startDate);
        error_log($endDate);
        error_log($week);

        $daymeals = DayMeal::with(
            'user',
            'recipe.recipeIngredients.ingredient',
            'recipe.recipeTags'
        )->orderBy(
            'date'
        )->whereBetween(
            'date', [$startDate, $endDate]
        )->get();
        $daymeals = $daymeals->toArray();

        $daymealsByDate = array_reduce($daymeals, function($acc, $daymeal) {
            $date = date("Y-m-d", strtotime($daymeal['date']));

            $meals = $acc[$date] ?? [];
            $meals[] = $daymeal;

            $acc[$date] = $meals;
            return $acc;
        }, []);

        $formattedDaymeals = [];
        foreach ($daymealsByDate as $key => $value) {
            $formattedDaymeals[] = [$key, $value];
        }

        $formattedDaymeals = array_map(function ($item) {
            $date = $item[0];
            $daymeals = $item[1];

            usort($daymeals, function($a, $b) {
                return $a['meal_type'] <=> $b['meal_type'];
            });

            return [$date, $daymeals];
        }, $formattedDaymeals);

        return response()->json([
            'week' => $week,
            'daymeals' => $formattedDaymeals,
        ]);
    }

    /**
     * Update or create dayMeal in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'date' => 'required',
            'meal_type' => 'required',
            'recipe_id' => 'required',
        ]);

        $datestring = CarbonImmutable::createFromTimeString($request->date)->toDateString();

        $daymeal = DayMeal::updateOrCreate(
            [
                'date' => $datestring,
                'meal_type' => $request->meal_type,
                'user_id' => Auth::user()->id,
            ],
            [
                'recipe_id' => $request->recipe_id
            ]
        );

        return response()->json([
            'message' => 'Great success! Daymeal added',
            'daymeal' => $daymeal,
        ]);
    }
}
