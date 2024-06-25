<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    use HasFactory;

    protected $fillable = [
        'attribute_name'
    ];

    public function attributesValues()
    {
        return $this->hasMany(AttributesValues::class);
    }

    public function furnitureAttributesValue()
    {
        return $this->hasMany(FurnitureAttributesValue::class);
    }
}