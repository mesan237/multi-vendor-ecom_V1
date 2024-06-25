<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttributesValues extends Model
{
    use HasFactory;

    protected $fillable = [
        'attribute_id', 'attribute_value', 'attribute_image'
    ];

    public function attribute()
    {
        return $this->belongsTo(Attribute::class, 'attribute_id');
    }

    public function furnitureAttributesValue()
    {
        return $this->hasMany(FurnitureAttributesValue::class);
    }
}