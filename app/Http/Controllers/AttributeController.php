<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AttributeController extends Controller
{
    //
    public function allAttributes()
    {
        $attributes = Attribute::latest()->get();
        return Inertia::render('admin/Attributes/AllAttributes', [
            'attributes' => $attributes,
        ]);
    } // end method


    public function updateAttribute(Request $request)
    {
        $attribute_id = $request->id;
        $attribute = DB::table('attributes')
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

        Attribute::insert([
            'attribute_name' => $request->attribute_name,
        ]);

        return redirect()->route('all.attributes')->with('message', 'attribute updated successfully.');
    } //end method
}
