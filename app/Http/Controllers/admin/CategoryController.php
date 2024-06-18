<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;

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

        if ($request->hasFile('image')) {
            $category_image = $request->file('image');

            $filename = hexdec(uniqid()) . '.' . $category_image->getClientOriginalExtension();
            $image = Image::read($category_image);

            // Resize image
            $image->resize(300, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('uploads/category_images/' . $filename));
            
            $save_url = 'upload/category_images/' . $filename;
        }

        Category::insert([
            'category_name' => $request->category_name,
            'category_slug' => strtolower(str_replace(' ', '-', $request->category_name)),
            'image_category' => $save_url,
        ]);

        $notification = array(
            'message' => 'Category succesful inserted!!!',
            'alert-type' => 'success'
        );
        return redirect()->route('all.categories')->with($notification);
    }//end method
}