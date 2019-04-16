<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecipeRecipeTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipe_recipe_tag', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();
            $table->unsignedBigInteger('recipe_id');
            $table->unsignedBigInteger('recipe_tag_id');
            $table
            ->foreign('recipe_id')
            ->references('id')
            ->on('recipes')
            // ->onUpdate('cascade')
            ->onDelete('cascade');
            $table
            ->foreign('recipe_tag_id')
            ->references('id')
            ->on('recipe_tags')
            // ->onUpdate('cascade')
            ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipe_recipe_tag');
    }
}
