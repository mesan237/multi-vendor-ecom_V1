<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SliderController extends Controller
{
    //
    public function allSliders(){

        $sliders = Slider::latest()->get();
        return Inertia::render('admin/slider/AllSliders', [
            'sliders' => $sliders,
        ]);
    }

}