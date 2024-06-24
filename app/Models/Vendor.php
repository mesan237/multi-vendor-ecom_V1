<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $primaryKey = 'vendor_id';

    protected $fillable = [
        'vendor_id', 'company_name', 'products_supplied', 'rating', 'contract_details', 'shop_name',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }
}
