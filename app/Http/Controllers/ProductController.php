<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Furniture;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    //
    public function allProducts() //list all products
    {
        $furnitureItems = Furniture::with('images')->latest()->get();
        // $products = Furniture::latest()->get();

        return Inertia::render('admin/Product/AllProducts', [
            'products' => $furnitureItems,

        ]);
    } //end method
    public function getProduct($id) //list all products
    {
        $productDetails = Furniture::findOrFail($id);
        $product_images = $productDetails->images;

        return Inertia::render('admin/Product/AllProducts', [
            'product' => $productDetails,
            'product_images' => $product_images,
        ]);
    } //end method

    public function addProducts()
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
        return Inertia::render('admin/Product/AddProduct', [
            'attributes' => $attributes,
            'allcategories' => $formattedData,
        ]);
    } //end method

    public function saveProducts(Request $request)
    {
        dd($request->images);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'material' => 'nullable|string|max:255',
            'stock' => 'required|integer',
            'brand' => 'nullable|string|max:255',
            'style' => 'nullable|string|max:255',
            'features' => 'nullable|string',
            'dimensions' => 'nullable|array',
            'dimensions.height' => 'nullable|numeric',
            'dimensions.width' => 'nullable|numeric',
            'dimensions.length' => 'nullable|numeric',
            'dimensions.depth' => 'nullable|numeric',
            'warranty' => 'nullable|string|max:255',
            'assembly_required' => 'required|boolean',
        ]);

        $product = new Furniture();
        $product->name = $validatedData['name'];
        $product->price = $validatedData['price'];
        $product->material = $validatedData['material'];
        $product->stock = $validatedData['stock'];
        $product->brand = $validatedData['brand'];
        $product->style = $validatedData['style'];
        $product->features = $validatedData['features'];
        $product->dimensions = json_encode($validatedData['dimensions']);
        $product->warranty = $validatedData['warranty'];
        $product->assembly_required = $validatedData['assembly_required'];
        $product->save();
    } //end method


}
