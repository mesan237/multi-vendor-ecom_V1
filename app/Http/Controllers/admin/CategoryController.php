<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    public function Addcategory()
    {
        return Inertia::render('admin/category/AddCategory');
    } //end method

    public function UpdateCategory(Request $request)
    {
        $category_id = $request->id;
        $old_image = $request->old_image;
        if ($request->hasFile('category_image')) {
            // dd($category_id, $old_image);
            $category_image = $request->file('category_image');

            $filename = $category_image->hashName() . '.' . $category_image->extension();
            $image = Image::read($category_image);

            // Resize image
            $image->resize(300, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('uploads/category_images/' . $filename));

            $save_url = '/uploads/category_images/' . $filename;
            if (file_exists($old_image)) {
                unlink($old_image);
            }

            DB::table('categories')->where('id', $category_id)->update([
                'category_name' => $request->category_name,
                'category_slug' => strtolower(str_replace(' ', '-', $request->category_name)),
                'image_category' => $save_url,
            ]);

            return redirect()->route('all.categories')->with('message', 'Category inserted successfully.');
        } else {

            $category = DB::table('categories')
                ->where('id', $category_id)
                ->update([
                    'category_name' => $request->category_name,
                    'category_slug' => strtolower(str_replace(' ', '-', $request->category_name)),
                ]);

            return redirect()->route('all.categories')->with('message', 'Category name updated successfully.');
        }
    } //end method

    public function Editcategory($id)
    {
        $category = Category::findOrFail($id);
        return to_route('all.categories', [
            'category' => $category,
        ]);
        // return Inertia::render('admin/category/EditCategory', [
        //     'category' => $category,
        // ]);
    } //end method

    public function deleteCategory($id)
    {
        try {
            // Find the category or fail
            $category = Category::findOrFail($id);

            // Get the category image path
            $category_image = $category->image_category;

            // Check if the image file exists and delete it
            if (file_exists($category_image)) {
                unlink($category_image);
            }

            // Delete the category
            DB::table('categories')->where('id', $id)->delete();

            // Redirect with success message
            return redirect()->route('all.categories')->with('message', 'Category deleted successfully.');
        } catch (\Exception $e) {
            // Redirect with error message in case of exception
            return redirect()->route('all.categories')->with('error', 'Error deleting category: ' . $e->getMessage());
        }
    }


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

            $save_url = '/uploads/category_images/' . $filename;
        }
        Category::insert([
            'category_name' => $request->category_name,
            'category_slug' => strtolower(str_replace(' ', '-', $request->category_name)),
            'image_category' => $save_url,
        ]);

        return redirect()->route('all.categories')->with('message', 'Category updated successfully.');
    } //end method
}
