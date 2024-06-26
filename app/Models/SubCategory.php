<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'subcategory_name', 'parent_category_id', 'image_category'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'parent_category_id');
    }
}