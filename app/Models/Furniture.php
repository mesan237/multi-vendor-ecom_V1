<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Furniture extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category',
        'subcategory',
        'dimensions',
        'material',
        'color',
        'price',
        'discounted_price',
        'stock_status',
        'brand',
        'warranty',
        'assembly_info',
        'tags',
        'stock',
        'additional_features',
        'video',
        'type',
        'features',
        'style',
        'design'
    ];
}