<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    //

    public function getWishlist()
    {
        return Inertia::render("frontend/Wishlist");
    } //end method getWishlist

    public function getCart()
    {
        return Inertia::render("frontend/ShoppingCart");
    } //end method getCart
    public function getProductDetails()
    {
        return Inertia::render("frontend/ProductDetails");
    } //end method getCart
}