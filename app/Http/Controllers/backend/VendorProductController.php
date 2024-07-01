<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\Attribute;
use App\Models\Category;
use App\Models\Furniture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Intervention\Image\Laravel\Facades\Image;
use Inertia\Inertia;

class VendorProductController extends Controller
{
    //
    
    public function allProducts() //list all products
    {
        
        $vendor_id = Auth::user()->id;
        // dd($vendor_id);

        $furnitureItems = Furniture::with([
            'images' => function ($query) {
                $query->where('is_primary', 1);
            },
            'subcategory',
        ])->where('vendor_id',$vendor_id)->latest()->get();

        return Inertia::render('vendor/product/AllProducts', [
            'products' => $furnitureItems,
        ]);
    }


    public function getProduct($id) //list all products
    {
        $productDetails = Furniture::findOrFail($id);
        $product_images = $productDetails->images;

        return Inertia::render('vendor/product/AllProducts', [
            'product' => $productDetails,
            'product_images' => $product_images,
        ]);
    } //end method

    public function addProductsByVendor()
    {
        $categories = Category::with('subcategories')->get();

        $formattedData = [];

        foreach ($categories as $category) {
            $formattedData[] = [
                'category_name' => $category->category_name,
                'subcategories' => $category->subcategories->map(function ($subcategory) {
                    return [
                        'subcategory_name' => $subcategory->subcategory_name,
                        // Add any other desired subcategory information here
                    ];
                })->toArray(),
            ];
        }

        // Fetch attributes that have at least one associated value
        $attributes = Attribute::has('attributesValues')->with('attributesValues')->latest()->get();

        // $attributes = Attribute::with('attributesValues')->latest()->get();
        return Inertia::render('vendor/product/AddProduct', [
            'attributes' => $attributes,
            'allcategories' => $formattedData,
        ]);
    } //end method


    public function saveProducts(Request $request)
    {

        // $images = $request->file('images');

        // $validatedData = $request->validate([
        //     'name' => 'required|string|max:255',
        //     'price' => 'required|numeric',
        //     'material' => 'nullable|string|max:255',
        //     'stock' => 'required|integer',
        //     'brand' => 'nullable|string|max:255',
        //     'style' => 'nullable|string|max:255',
        //     'features' => 'nullable|string',
        //     'dimensions' => 'nullable|array',
        //     'dimensions.height' => 'nullable|numeric',
        //     'dimensions.width' => 'nullable|numeric',
        //     'dimensions.length' => 'nullable|numeric',
        //     'dimensions.depth' => 'nullable|numeric',
        //     'warranty' => 'nullable|string|max:255',
        //     'assembly_required' => 'required|boolean',
        // ]);

        // Extract subcategory_id using subcategory_name
        $subcategory = DB::table('subcategories')->where('subcategory_name', $request->subcategory,)->first();
        $subcategory_id = $subcategory->id;

        // Convert dimensions array to JSON
        $dimensions = json_encode($request->dimensions);

        // dd($request);
        //  Create the furniture item
        $furniture_id = Furniture::insertGetId([
            'name' => $request->name,
            'subcategory_id' => $subcategory_id,

            'price' => $request->price,
            'description' => $request->longDescription,
            'short_description' => $request->description,
            'dimensions' => $dimensions,
            'assembly_info' => $request->assemblyRequired,
            'stock' => $request->stock,
            'material' => $request->material,
            'furniture_type' => $request->type,
            'furniture_slug' => strtolower(str_replace(' ', '-', $request->name)),
            'furniture_code' => strtolower(str_replace(' ', '-', $request->name)),
            // 'brand' => $request->brand,
            'style' => $request->style,
            'vendor_id' => Auth::user()->id,
            'warranty' => $request->warranty,
        ]);

        // Handle attributes
        if (!empty($request["attributes"])) {
            $attributes = $request["attributes"];

            foreach ($attributes as $attributeName => $attributeValue) {

                $attribute = DB::table('attributes')->where('attribute_name', $attributeName,)->first();
                $attributesValue = DB::table('attributes_values')->where('attribute_value', $attributeValue,)->first();

                DB::table('furniture_attributes_value')->insert([
                    'attribute_id' => $attribute->id,
                    'furniture_id' => $furniture_id,
                    'value_id' => $attributesValue->id,
                ]);
            }
        }

        // store the images
        $images = $request->file('images');
        $primaryImageExists = DB::table('images')
            ->where('furniture_id', $furniture_id)
            ->where('is_primary', 1)
            ->exists();

        foreach ($images as $index => $image) {
            $filename = $image->hashName() . '.' . $image->extension();
            $interventionImage = Image::read($image);

            // Resize image to 1000x1000 pixels
            $interventionImage->resize(1000, 1000, function ($constraint) {
                $constraint->upsize();
            })->save(public_path('uploads/product_images/' . $filename));

            DB::table('images')->insert([
                'furniture_id' => $furniture_id,
                'url' => '/uploads/product_images/' . $filename,
                'is_primary' => !$primaryImageExists && $index == 0 ? 1 : 0, // Set the first image as primary if no primary image exists
            ]);
        }

        return to_route('all.products');
    } //end method


    public function updateProductDetailsByVendor(Request $request)
    {
        // dd($request);
        $product_id = $request->id;
        DB::table('furniture')
            ->where('id', $product_id)
            ->update([
                'name' => $request->name,
                'short_description' => $request->shortDescription,
                'warranty' => $request->warranty,
                'stock' => $request->stock,
                'price' => $request->price,
                'description' => $request->longDescription,
                'design' => $request->design,
                'material' => $request->material,
                'furniture_type' => $request->type,
                'assembly_info' => $request->assemblyRequired,
            ]);

        return redirect()->back()->with('message', 'product details updated successfully.');
    }


    public function getProductById($id)
    {
        // Fetch the furniture item by ID
        $furniture = Furniture::find($id);
        if (!$furniture) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Fetch the category name
        $subcategory = DB::table('subcategories')->find($furniture->subcategory_id);
        $category_name = $subcategory ? $subcategory->subcategory_name : null;

        // Fetch the attributes and their values
        $attributes = DB::table('furniture_attributes_value')
            ->join('attributes', 'furniture_attributes_value.attribute_id', '=', 'attributes.id')
            ->join('attributes_values', 'furniture_attributes_value.value_id', '=', 'attributes_values.id')
            ->where('furniture_attributes_value.furniture_id', $id)
            ->select('attributes.attribute_name', 'attributes_values.attribute_value')
            ->get();

        $allAttributes = [];
        foreach ($attributes as $attributeName => $values) {
            $attribute = Attribute::where('attribute_name', $values->attribute_name)->with('attributesValues')->first();

            foreach ($attribute->attributesValues as $value) {
                $allAttributes[$values->attribute_name][] = $value->attribute_value;
            }
        }
        // dd($allAttributes);

        // Fetch the images
        $images = DB::table('images')
            ->where('furniture_id', $id)
            ->select('id', 'url', 'is_primary')
            ->get();
        // Prepare the response data
        $responseData = [
            'id' => $id,
            'name' => $furniture->name,
            'subcategory' => $category_name,
            'price' => $furniture->price,
            'description' => $furniture->description,
            'short_description' => $furniture->short_description,
            'dimensions' => json_decode($furniture->dimensions),
            'assembly_info' => $furniture->assembly_info,
            'stock' => $furniture->stock,
            'material' => $furniture->material,
            'furniture_type' => $furniture->furniture_type,
            'furniture_slug' => $furniture->furniture_slug,
            'furniture_code' => $furniture->furniture_code,
            'style' => $furniture->style,
            'warranty' => $furniture->warranty,
            'attributes' => $attributes,
            'allAttributes' => $allAttributes,
            'images' => $images,
        ];

        return Inertia::render('admin/Product/EditProduct', [
            'productData' => $responseData,
        ]);
    }

    public function updateProductSelect(Request $request)
    {
        // dd($request);
        $product_id = $request->id;

        if (!empty($request["attributes"])) {
            $attributes = $request["attributes"];

            foreach ($attributes as $attributeName => $attributeValue) {

                $attribute = DB::table('attributes')->where('attribute_name', $attributeName,)->first();
                $attributesValue = DB::table('attributes_values')->where('attribute_value', $attributeValue,)->first();

                DB::table('furniture_attributes_value')->where('furniture_id', $product_id)->update([
                    'attribute_id' => $attribute->id,
                    'value_id' => $attributesValue->id,
                ]);
            }
        }

        // update the dimensions
        $dimensions = json_encode($request->dimensions);
        DB::table('furniture')->where('id', $product_id)->update([
            'dimensions' => $dimensions,
        ]);

        return redirect()->back()->with('message', 'attributes and dimensions updated successfully.');
    }

    public function updateProductThumbnail(Request $request)
    {
        $product_id = $request->id;
        $old_image = $request->old_image['url'];

        // dd($request->thumbnail);

        if ($request->hasFile('thumbnail')) {

            $image = $request->file('thumbnail');

            $filename = $image->hashName() . '.' . $image->extension();
            $interventionImage = Image::read($image);

            // Resize image to 1000x1000 pixels
            $interventionImage->resize(1000, 1000, function ($constraint) {
                $constraint->upsize();
            })->save(public_path('uploads/product_images/' . $filename));

            // Check if the image file exists and delete it
            $file  = $_SERVER['DOCUMENT_ROOT'] . $old_image;
            if (file_exists($file)) {
                unlink($file);
            }

            DB::table('images')->where('furniture_id', $product_id)->where('is_primary', 1)->update([
                'url' => '/uploads/product_images/' . $filename,
            ]);

            return redirect()->back()->with('message', 'images updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Failed to update images.');
        }
    } //end method

    public function editProductImage(Request $request)
    {
        $product_id = $request->id;
        // dd($request->image, $request->old_image, $product_id, $request);
        $old_image = $request->old_image;
        // dd(file_exists($old_image));
        if ($request->hasFile('image')) {

            $image = $request->file('image');

            $filename = $image->hashName() . '.' . $image->extension();
            $interventionImage = Image::read($image);

            // Resize image to 1000x1000 pixels
            $interventionImage->resize(1000, 1000, function ($constraint) {
                $constraint->upsize();
            })->save(public_path('uploads/product_images/' . $filename));

            // Check if the image file exists and delete it
            $file = $_SERVER['DOCUMENT_ROOT'] . $old_image;
            if (file_exists($file)) {
                unlink($file);
            }

            DB::table('images')->where('furniture_id', $product_id)->where('url', $old_image)->update([
                'url' => '/uploads/product_images/' . $filename,
            ]);

            return redirect()->back()->with('message', 'images updated successfully.');
        } else {
            return redirect()->back()->with('error', 'Failed to update images.');
        }
    }

    public function addProductImages(Request $request)
    {
        $product_id = $request->id;
        $images = $request->file('images');

        foreach ($images as $index => $image) {

            $filename = $image->hashName() . '.' . $image->extension();
            $interventionImage = Image::read($image);

            // Resize image to 1000x1000 pixels
            $interventionImage->resize(1000, 1000, function ($constraint) {
                $constraint->upsize();
            })->save(public_path('uploads/product_images/' . $filename));

            DB::table('images')->insert([
                'furniture_id' => $product_id,
                'url' => '/uploads/product_images/' . $filename,
            ]);
        }

        return redirect()->back()->with('message', 'images added successfully.');
    }

    public function deleteProductImage(Request $request)
    {
        $image_id = $request->id;
        $product_image = DB::table('images')->where('id', $image_id)->get();

        $image = $product_image[0]->url;
        $file = $_SERVER['DOCUMENT_ROOT'] . $image;
        if (file_exists($file)) {
            // dd($file);
            unlink($file);
        }
        DB::table('images')->where('id', $image_id)->where('url', $image)->delete();


        return redirect()->back()->with('message', 'Product deleted successfully.');
    }

    public function deleteProduct(Request $request)
    {
        $product_id = $request->id;
        // Delete all related records

        $images = DB::table('images')->where('furniture_id', $product_id)->get();
        Furniture::findOrFail($product_id)->delete();

        // dd($product_id);
        foreach ($images as $image) {
            // dd(file_exists($image->url));
            $file = $_SERVER['DOCUMENT_ROOT'] . $image->url;
            unlink($file);
            DB::table('images')->where('furniture_id', $product_id)->delete();
        }

        return redirect()->back()->with('message', 'Product deleted successfully.');
    }

}