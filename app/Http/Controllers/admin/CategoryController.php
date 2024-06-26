<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use Exception;
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

    // ============ CRUD on subcategories ====== ============
    // ============ CRUD on subcategories ====== ============
    public function AllSubcategories()
    {
        $subcategories = Subcategory::latest()->get();;
        dd($subcategories);
        return Inertia::render('admin/subcategory/AllSubcategories', [
            'subcategories' => $subcategories,
        ]);
    } // end method

    public function updateSubcategories(Request $request)
    {
        $attribute_id = $request->id;
        DB::table('attributes')
            ->where('id', $attribute_id)
            ->update([
                'attribute_name' => $request->attribute_name,
            ]);

        return redirect()->route('all.attributes')->with('message', 'attribute updated successfully.');
    } //end method

    public function deleteSubcategories($id)
    {
        try {

            // Delete the attribute
            DB::table('attributes')->where('id', $id)->delete();

            // Redirect with success message
            return redirect()->route('all.attributes')->with('message', 'attribute deleted successfully.');
        } catch (\Exception $e) {
            // Redirect with error message in case of exception
            return redirect()->route('all.attributes')->with('error', 'Error deleting attribute: ' . $e->getMessage());
        }
    }


    public function storeAttributes(Request $request)
    {
        // dd($request->attribute_name, $request->category_name, $request);

        
        // Step 1: Insert the attribute
        $attribute = DB::table('attributes')->insertGetId([
            'attribute_name' => $request->attribute_name,
            'created_at' => now(),
            'updated_at' => now()
        ]);

        // Step 2: Retrieve the category ID
        $category = DB::table('categories')->where('category_name', $request->category_name,)->first();

        if ($category) {
            $category_id = $category->id;

            // Step 3: Insert into attribute_category table
            DB::table('attribute_category')->insert([
                'attribute_id' => $attribute,
                'category_id' => $category_id,
                'created_at' => now(),
                'updated_at' => now()
            ]);
            return redirect()->route('all.attributes')->with('message', 'attribute updated successfully.');
        } else {
            // Handle the case where the category does not exist
            // For example, you can throw an exception or log an error
            throw new Exception('Category not found');
        }


    } //end method
    public function addAttributeValue(Request $request)
    {
        // dd($request);
        $attributeId = $request->id;

        foreach ($request->attribute_value as $value) {
            // AttributesValues::create([
            //     'attribute_value' => $value,
            //     'attribute_id' => $attributeId,
            // ]);
        }

        return redirect()->route('all.attributes')->with('message', 'attribute updated successfully.');
    } //end method
}