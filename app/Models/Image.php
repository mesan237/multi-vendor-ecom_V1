<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'furniture_id', 'url', 'alt_text', 'is_primary'
    ];

    public function furniture()
    {
        return $this->belongsTo(Furniture::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($image) {
            if ($image->is_primary) {
                Image::where('furniture_id', $image->furniture_id)
                    ->where('is_primary', true)
                    ->update(['is_primary' => false]);
            }
        });
    }
}