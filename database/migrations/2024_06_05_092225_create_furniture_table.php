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
        Schema::create('furniture', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('furniture_type');
            $table->string('sub_category_name')->nullable();
            $table->json('dimensions')->nullable();  // Stores height, width, etc.
            $table->string('material')->nullable();
            $table->string('color')->nullable();
            $table->decimal('price', 8, 2);
            $table->decimal('discounted_price', 8, 2)->nullable();
            $table->boolean('in_stock')->default(false);  // Instead of stock_status
            $table->text('warranty')->nullable();
            $table->text('assembly_info')->nullable();
            $table->text('tags')->nullable();  // Consider separate table for tags
            $table->integer('stock')->default(0);
            $table->text('additional_features')->nullable();
            $table->string('video')->nullable();
            $table->string('type')->nullable();
            $table->text('features')->nullable();
            $table->string('style')->nullable();
            $table->string('design')->nullable();
            $table->timestamps();

        });
    }

   
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('furniture');
    }
};