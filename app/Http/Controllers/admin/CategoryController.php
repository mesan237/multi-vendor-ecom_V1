<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //
    public function AllCategories(){
        $categories = Category::latest()->get();
        return Inertia::render('admin/category/AllCategories', [
            'category' => $categories,
        ]);
    }// end method 

    public function Addcategory() {
        return Inertia::render('admin/category/AddCategory');
    }//end method
}