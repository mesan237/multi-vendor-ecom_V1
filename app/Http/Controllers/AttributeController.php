<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\AttributesValues;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AttributeController extends Controller
{
    //
    public function allAttributes()
    {
        // $attributes = Attribute::latest()->get();
        $attributes = Attribute::with('attributesValues')->latest()->get();
        return Inertia::render('admin/Attributes/AllAttributes', [
            'attributes' => $attributes,
        ]);
    } // end method


    public function updateAttribute(Request $request)
    {
        $attribute_id = $request->id;
        DB::table('attributes')
            ->where('id', $attribute_id)
            ->update([
                'attribute_name' => $request->attribute_name,
            ]);

        return redirect()->route('all.attributes')->with('message', 'attribute updated successfully.');
    } //end method

    public function deleteAttribute($id)
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
            AttributesValues::create([
                'attribute_value' => $value,
                'attribute_id' => $attributeId,
            ]);
        }

        return redirect()->route('all.attributes')->with('message', 'attribute updated successfully.');
    } //end method
}