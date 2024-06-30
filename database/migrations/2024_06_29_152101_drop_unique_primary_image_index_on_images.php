<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('images', function (Blueprint $table) {
            // Drop foreign key constraints that depend on the unique index
            $table->dropForeign(['furniture_id']);
        });

        // Drop the unique index
        DB::statement('ALTER TABLE images DROP INDEX unique_primary_image');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('images', function (Blueprint $table) {
            // Recreate the unique index
            $table->unique(['furniture_id', 'is_primary'], 'unique_primary_image');

            // Recreate foreign key constraints if needed
            $table->foreign('furniture_id')->references('id')->on('furniture')->onDelete('cascade');
        });
    }
};
