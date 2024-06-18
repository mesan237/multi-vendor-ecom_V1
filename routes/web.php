<?php

use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\FurnitureController;
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
    });
});

Route::middleware(['auth', 'role:user'])->group(function () {
    Route::get('/customer/dashboard', [CustomerController::class, 'CustomerDashboard'])->name('customer.dashboard');
});

Route::middleware(['auth', 'role:vendor'])->group(function () {
    Route::get('/vendor/dashboard', [VendorController::class, 'VendorDashboard'])->name('vendor.dashboard');
});
