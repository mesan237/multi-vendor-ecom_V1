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
        Schema::table('furniture', function (Blueprint $table) {
            // Drop the 'type'qnd in_stok columns
            $table->dropColumn('type');
            $table->dropColumn('in_stock');

            // Change 'sub_category_name' to 'subcategory_id' with foreign key constraint
            $table->unsignedBigInteger('subcategory_id')->nullable()->after('furniture_type');
            $table->foreign('subcategory_id')->references('id')->on('subcategories')->onDelete('cascade');
            $table->dropColumn('sub_category_name');

            // Change 'features' to 'feature_id' with foreign key constraint
            $table->unsignedBigInteger('feature_id')->nullable()->after('additional_features');
            $table->foreign('feature_id')->references('id')->on('product_features')->onDelete('cascade');
            $table->dropColumn('features');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::table('furniture', function (Blueprint $table) {
            // Add the 'type' and in_stok columns back
            $table->string('type')->nullable();
            $table->string('in_stock')->nullable();

            // Change 'subcategory_id' back to 'sub_category_name'
            $table->string('sub_category_name')->nullable();
            $table->dropForeign(['subcategory_id']);
            $table->dropColumn('subcategory_id');

            // Change 'feature_id' back to 'features'
            $table->text('features')->nullable();
            $table->dropForeign(['feature_id']);
            $table->dropColumn('feature_id');
        });
    }
};
