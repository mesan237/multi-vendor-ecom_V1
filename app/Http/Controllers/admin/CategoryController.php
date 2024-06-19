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
    public function AllCategories()
    {
        $categories = Category::latest()->get();
        return Inertia::render('admin/category/AllCategories', [
            'categories' => $categories,
        ]);
    } // end method

    public function Editcategory()
    {
        return redirect()->route('all.categories');
    } //end method

    public function StoreCategory(Request $request)
    {
        $image = $request->file('image');

        if ($request->hasFile('image')) {
            $category_image = $request->file('image');

            $filename = $image->hashName() . '.' . $category_image->extension();
            $image = Image::read($category_image);

            // Resize image
            $image->resize(300, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('uploads/category_images/' . $filename));

            $save_url = 'uploads/category_images/' . $filename;
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
    } //end method
}
