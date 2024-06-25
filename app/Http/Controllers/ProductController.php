<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
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
        $attributes = Attribute::with('attributesValues')->latest()->get();
        return Inertia::render('admin/Product/AddProduct', [
            'attributes' => $attributes,
        ]);
    } //end method

    public function saveProducts(Request $request)
    {
        dd($request);
    } //end method


}