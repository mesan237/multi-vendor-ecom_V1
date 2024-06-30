<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        // Recreate the foreign key constraint
        Schema::table('images', function (Blueprint $table) {
            $table->foreign('furniture_id')->references('id')->on('furniture')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        // Recreate foreign key constraint
        Schema::table('images', function (Blueprint $table) {
            $table->foreign('furniture_id')->references('id')->on('furniture')->onDelete('cascade');
        });
    }
};
