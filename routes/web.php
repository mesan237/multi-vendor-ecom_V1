<?php

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\FurnitureController;
use App\Models\Attribute;
use App\Models\Category;
use App\Models\Furniture;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('AdminDashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';



Route::middleware(['auth', 'role:admin,superadmin'])->group(function () {
    Route::post('/admin/logout', [AdminController::class, 'AdminLogout'])->name('admin.logout');
    Route::get('/admin/profile', [AdminController::class, 'AdminProfile'])->name('admin.profile');
    Route::post('/admin/profile/store', [AdminController::class, 'AdminProfileStore'])->name('admin.profile.store');
    // store the profile image
    Route::post('/admin/profile/storePofile', [AdminController::class, 'AdminProfileStorePhoto'])->name('admin.profile.storeProfile');

    Route::get('/admin/dashboard', [AdminController::class, 'AdminDashboard'])->name('admin.dashboard');
    Route::resource('furniture', FurnitureController::class);

    // Routes for categories
    Route::controller(CategoryController::class)->group(function () {
        Route::get('/all/categories', 'Allcategories')->name('all.categories');
        Route::get('/add/categories', 'Addcategory')->name('add.categories');
        Route::post('/store/category', 'StoreCategory')->name('store.category');
        Route::get('/edit/category/{id}', 'EditCategory')->name('edit.category');
        Route::post('/update/category/', 'UpdateCategory')->name('update.category');
        Route::delete('/delete/{category_id}/category/', 'deleteCategory')->name('delete.category');

        // routes/api.php
        Route::get('/api/categories/{id}/edit', function ($id) {
            $category = Category::findOrFail($id);
            return response()->json($category);
        });
        Route::get('/api/categories/fetch', function () {
            $categories = Category::latest()->get();
            return response()->json($categories);
        });

        // Routes for subcategories
        Route::get('/all/subcategories', 'allSubcategories')->name('all.subcategories');
        Route::get('/add/subcategories', 'addSubcategory')->name('add.subcategories');
        Route::post('/store/subcategory', 'storeSubcategory')->name('store.subcategory');
        Route::post('/update/subcategory/', 'updateSubcategory')->name('update.subcategory');
        Route::delete('/delete/{subcategory_id}/subcategory/', 'deleteSubcategory')->name('delete.subcategory');
    });

    // Routes for attributes
    Route::controller(AttributeController::class)->group(function () {
        Route::get('/all/attributes', 'allAttributes')->name('all.attributes');
        Route::post('/add/attribute/value', 'addAttributeValue')->name('add.attribute.value');
        Route::post('/store/attributes', 'storeAttributes')->name('store.attribute');
        Route::post('/update/attribute/', 'updateAttribute')->name('update.attribute');
        Route::delete('/delete/{attribute_id}/attribute/', 'deleteAttribute')->name('delete.attribute');

        // routes/api.php
        Route::get('/api/attributes/{id}/edit', function ($id) {
            $attribute = Attribute::findOrFail($id);
            return response()->json($attribute);
        });
    });

    // Routes for displaying users
    Route::controller(AdminController::class)->group(function () {
        Route::get('/all/customers',  'allCustomers')->name('all.customers');
        Route::get('/all/vendors', 'allVendors')->name('all.vendors');
        //fetching a vendor
        Route::get('/vendor/{id}/details', 'vendorDetails')->name('vendor.details');
        Route::post('/active/vendor', 'activeVendor')->name('active.vendor');
        Route::post('/deactive/vendor', 'deactiveVendor')->name('deactive.vendor');
    });

    // Routes for handling products
    Route::controller(ProductController::class)->group(function () {
        Route::get('/all/products',  'allProducts')->name('all.products');
        Route::get('/add/products', 'addProducts')->name('add.products');
        Route::post('/save/products', 'saveProducts')->name('save.product');
        Route::delete('/delete/{id}/product', 'deleteProduct')->name('delete.product');

        // routes/api.php
        Route::get('/api/product/{id}/edit', 'getProductById')->name('fetch.edit.product');
        Route::put('/update/product/details', 'updateProductDetails')->name('update.product.details');
        Route::put('/update/product/select', 'updateProductSelect')->name('update.product.select');
        Route::post('/update/product/thumbnail', 'updateProductThumbnail')->name('update.product.thumbnail');
        Route::post('/edit/product/image', 'editProductImage')->name('edit.product.image');
        Route::post('/add/product/images', 'addProductImages')->name('add.product.images');
        Route::delete('/delete/product/image', 'deleteProductImage')->name('delete.product.image');

        Route::delete('/delete/product', 'deleteProduct')->name('delete.product');
    });
});

Route::get('/become/vendor', [VendorController::class, 'VendorLogin'])->name('become.vendor');
Route::get('/vendor/register', [VendorController::class, 'VendorRegister'])->name('vendor.register');

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/customer/dashboard', [CustomerController::class, 'CustomerDashboard'])->name('customer.dashboard');
});

Route::middleware(['auth', 'role:vendor'])->group(function () {
    Route::get('/vendor/dashboard', [VendorController::class, 'VendorDashboard'])->name('vendor.dashboard');

    Route::post('/vendor/logout', [VendorController::class, 'logoutVendor'])->name('vendor.logout');
    Route::get('/vendor/profile', [VendorController::class, 'vendorProfile'])->name('vendor.profile');
    Route::post('/vendor/profile/store', [VendorController::class, 'storeVendorProfile'])->name('vendor.profile.store');
    // store the profile image
    Route::post('/vendor/profile/storePofile', [VendorController::class, 'storeVendorProfileAvatar'])->name('vendor.profile.storeProfile');

    Route::get('/vendor/dashboard', [VendorController::class, 'vendorDashboard'])->name('vendor.dashboard');
});
// Become vendor
Route::get('/become/vendor', [VendorController::class, 'becomeVendor'])->name('become.vendor');
Route::post('/vendor/register', [VendorController::class, 'registerVendor'])->name('vendor.register');
