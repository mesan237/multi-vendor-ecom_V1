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
        Schema::table('furniture', function (Blueprint $table) {
            //
            $table->string('furniture_slug');
            $table->string('furniture_code');
            $table->text('short_description')->nullable(); 
            $table->integer('vendor_id')->nullable();;
            $table->integer('hot_deals')->nullable();
            $table->integer('specials_offers')->nullable();
            $table->integer('specials_deals')->nullable();
            $table->integer('status')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('furniture', function (Blueprint $table) {
            //
        });
    }
};