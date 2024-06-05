<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    //
    public function customerDashboard()
    {
        return Inertia::render('customer/Dashboard');
    }
}
