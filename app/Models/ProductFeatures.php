<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductFeatures extends Model
{
    use HasFactory;

    protected $fillable = [
        'furniture_id', 'name', 'description'
    ];

    public function furniture()
    {
        return $this->belongsTo(Furniture::class, 'furniture_id');
    }
}