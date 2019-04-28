<?php

namespace App\Http\Controllers;

use App\DayMeal;
use Carbon\CarbonImmutable;
use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getCurrentWeek()
    {
        $now = CarbonImmutable::now();

        //fel vecka söndag ändra
        // $week = CarbonImmutable::now()->week();
        $week = 17;

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

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\DayMeal  $dayMeal
    //  * @return \Illuminate\Http\Response
    //  */
    // public function showWeek($week)
    // {
    //     // Get the daymeals with recipes, tags, recipeingredients, ingredients for the selected week.

    //     $dt = CarbonImmutable::now();
    //     $monday = $dt->startOfWeek(CarbonImmutable::MONDAY);
    //     $tuesday = $monday->addDay();
    //     $sunday = CarbonImmutable::now()->endOfWeek(CarbonImmutable::SUNDAY);
    //     $week = CarbonImmutable::now()->week();

    //     // echo "Monday? 22/4?: ", $monday;

    //     $days = [
    //         $monday,
    //         $monday->addDays(1)->format('Y-m-d'),
    //         $monday->addDays(2)->format('Y/m/d'),
    //         $monday->addDays(3)->format('Y/m/d'),
    //         $monday->addDays(4)->format('Y/m/d'),
    //         $monday->addDays(5)->format('Y/m/d'),
    //         $monday->addDays(6)->format('Y/m/d'),
    //     ];

    //     // echo "First day of this week: ", $monday;
    //     // echo "Last day of this week: ", $sunday;
    //     // echo "Weeknumber: ", $week;
    //     // echo "Tuesday: ", $tuesday;
    //     // print_r($days);
    //     // $recipes = Recipe::all()->load(["recipeTags", "recipeIngredients.ingredient"]);
    //     $daymealsOfWeek = [];
    //     //Hämta alla daymeals från db
    //     foreach ($days as $day) {
    //         $daymealsOfDay[] = DayMeal::whereDate('date', $day);
    //         // whereDate('date', '=', date('Y-m-d'))
    //         //inspektera sql anropen genom laravel?
    //     }

    //     $daymealsOfWeek[] = $daymealsOfDay;
    //     print_r($daymealsOfWeek);


    //     //returera vecka samt alla daymeals
    //     return response()->json([
    //         // 'firstday' => $monday,
    //         // 'lastday' => $sunday,
    //         'week' => $week,
    //         'daymeals' => $daymealsOfWeek,
    //     ]);

    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DayMeal  $dayMeal
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DayMeal  $dayMeal
     * @return \Illuminate\Http\Response
     */
    public function destroy(DayMeal $dayMeal)
    {
        //
    }
}
