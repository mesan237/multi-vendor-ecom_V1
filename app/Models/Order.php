<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'customer_id', 'order_date', 'total_amount', 'shipping_address', 'billing_address', 'order_status'
    ];

    public function customer()
    {
        return $this->belongsTo(User::class, 'customer_id');
    }
}