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
        Schema::create('vendors', function (Blueprint $table) {
            $table->id(); // ceci serait pareil que user_id
            $table->foreignId('vendor_id')->constrained('users')->onDelete('cascade');
            $table->string('company_name');
            $table->string('shop_name');
            $table->json('products_supplied');
            $table->decimal('rating', 2, 1)->nullable();
            $table->text('contract_details')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
