<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecipeIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->decimal('amount'); //double? heltal?
            $table->string('measurement');
            $table->timestamps();
            $table->unsignedBigInteger('ingredient_id');
            $table->unsignedBigInteger('recipe_id');
        });

        Schema::table('recipe_ingredients', function($table) {
            $table
            ->foreign('ingredient_id')
            ->references('id')
            ->on('ingredients')
            // ->onUpdate('cascade')
            ->onDelete('cascade')
            ;
            $table
            ->foreign('recipe_id')
            ->references('id')
            ->on('recipes')
            // ->onUpdate('cascade')
            ->onDelete('cascade')
            ;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipe_ingredients');
    }
}
