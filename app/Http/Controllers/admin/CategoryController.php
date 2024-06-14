<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Intervention\Image\ImageManager;
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
    
    public function StoreCategory(Request $request) {
        $image = $request->file('image');
        $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();

        $new_image = ImageManager::imagick()->read($image); 
        $new_image->resize(370.246)->save('upload/category/'.$name_gen);
        // Image::make($image)->resize(370.246)->save('upload/category/'.$name_gen);
        $save_url = 'upload/category/' . $name_gen;

        Category::insert([
            'category-name' => $request->category_name,
            'category-slug' => strtolower(str_replace(' ', '-', $request->category_name)),
            'image' => $save_url,
        ]);

        $notification = array(
            'message' => 'Category succesful inserted!!!',
            'alert-type' => 'success'
        );
        return redirect()->route('all.categories')->with($notification);
    }//end method
}