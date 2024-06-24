<?php

namespace App\Http\Controllers;

use App\Models\Furniture;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Intervention\Image\Laravel\Facades\Image;

class AdminController extends Controller
{
    public function adminDashboard()
    {
        return Inertia::render('admin/AdminDashboard');
    }

    /**
     * Destroy an authenticated session.
     */
    public function AdminLogout(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    } //end method

    public function AdminProfile(Request $request)
    {
        $admin_id = Auth::User()->id;
        $adminData = User::find($admin_id);
        return Inertia::render('admin/profile/AdminProfile', [
            "adminUser" => $adminData
        ]);
    } //end method

    public function AdminProfileStorePhoto(Request $request)
    {
        $admin_id = Auth::User()->id;
        $adminData = User::find($admin_id);

        if ($request->hasFile('photo')) {
            $profile_image = $request->file('photo');
            // dd($profile_image);
            $filename = date('YmdHi') . '.' . $profile_image->getClientOriginalExtension();
            $image = Image::read($profile_image);

            // Resize image
            $image->resize(300, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('uploads/admin_images/' . $filename));
            $adminData->photo = $filename;
        }
        $adminData->save();
        return redirect()->back()->with('message', 'Profile photo updated successfully.');
    } //end method

    public function AdminProfileStore(Request $request)
    {
        $admin_id = Auth::User()->id;
        $adminData = User::find($admin_id);

        $adminData->name = $request->name;
        $adminData->email = $request->email;
        $adminData->username = $request->name;
        $adminData->phone = $request->phone;
        $adminData->address = $request->address;
        // dd($request);
        $adminData->save();

        return redirect()->back()->with('message', 'general information saved succesfully.');
    } //end method

    //=============  CRUD on users
    //=============  CRUD on users
    //=============  CRUD on users
    public function allVendors()
    {
        $vendors = User::where('role', 'vendor')->latest()->get();
        return Inertia::render('admin/users/VendorsList', [
            'vendors' => $vendors,
        ]);
    } //end method

    public function vendorDetails($id)
    {
        $vendorDetails = User::findOrFail($id);

        return response()->json($vendorDetails);
    }
    public function activeVendor(Request $request)
    {
        $vendor_id = $request->id;
        $vendor = User::findOrFail($vendor_id)->update([
            'status' => '1'
        ]);

        return redirect()->back()->with('message', 'Vendor activated succesfully.');
    }//end method

    public function deactiveVendor(Request $request)
    {
        $vendor_id = $request->id;
        $vendor = User::findOrFail($vendor_id)->update([
            'status' => '0'
        ]);

        return redirect()->back()->with('message', 'Vendor deactivated succesfully.');
    }

    public function allCustomers(Request $request)
    {
        return redirect()->back()->with('message', 'general information saved succesfully.');
    } //end method

    //=============  CRUD on products  ============
    //=============  CRUD on products  ============
    //=============  CRUD on products  ============
    public function allProducts() //list all products
    {
        $products = Furniture::latest()->get();
        return Inertia::render('admin/Product/AllProducts', [
            'products' => $products,
        ]);
    } //end method

    public function addProducts()
    {
        return Inertia::render('admin/Product/AddProduct');
    } //end method


}