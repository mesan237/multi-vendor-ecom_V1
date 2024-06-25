<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FurnitureAttributesValue extends Model
{
    use HasFactory;
    protected $fillable = ['attribute_id', 'furniture_id', 'value_id'];

    public function attribute()
    {
        return $this->belongsTo(Attribute::class);
    }

    public function furniture()
    {
        return $this->belongsTo(Furniture::class);
    }

    public function attributeValue()
    {
        return $this->belongsTo(AttributesValues::class, 'value_id');
    }
}