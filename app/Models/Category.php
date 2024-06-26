<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'image_category'
    ];
    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, 'attribute_category');
    }

    public function subcategories()
    {
        return $this->hasMany(Subcategory::class);
    }

    public function blogPosts()
    {
        return $this->hasMany(BlogPost::class);
    }
}
