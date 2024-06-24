<?php

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\FurnitureController;
use App\Models\Category;
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
    });

    // Routes for displaying users
    Route::controller(AdminController::class)->group(function () {
        Route::get('/all/customers',  'allCustomers')->name('all.customers');
        Route::get('/all/vendors', 'allVendors')->name('all.vendors');
        //fetching a vendor
        Route::get('/vendor/{id}/details', 'vendorDetails')->name('vendor.details');
    });

    // Routes for handling products
    Route::controller(AdminController::class)->group(function () {
        Route::get('/all/products',  'allProducts')->name('all.products');
        Route::get('/add/products', 'addProducts')->name('add.products');
        Route::post('/save/products', 'saveProducts')->name('save.product');
    });
});

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
