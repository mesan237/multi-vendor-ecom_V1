<?php

namespace App\Http\Controllers;

use App\Models\Furniture;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class VendorController extends Controller
{
    //
    public function vendorDashboard()
    {
        return Inertia::render('vendor/Dashboard');
    } 
    public function VendorLogin()
    {
        return Inertia::render('Auth/BecomeVendor'); 
    }
    public function logoutVendor(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function vendorProfile()
    {
        $vendor_id = Auth::User()->id;
        $vendorData = User::find($vendor_id);
        return Inertia::render('admin/profile/AdminProfile', [
            "vendorUser" => $vendorData
        ]);
    }



    public function storeVendorProfile(Request $request)
    {
        $vendor_id = Auth::User()->id;
        $vendorData = User::find($vendor_id);

        $vendorData->name = $request->name;
        $vendorData->email = $request->email;
        $vendorData->username = $request->name;
        $vendorData->phone = $request->phone;
        $vendorData->address = $request->address;
        // dd($request);
        $vendorData->save();

        return redirect()->back()->with('message', 'general information saved succesfully.');
    }

    public function storeVendorProfileAvatar(Request $request)
    {
        $vendor_id = Auth::User()->id;
        $vendorData = User::find($vendor_id);

        if ($request->hasFile('photo')) {
            $profile_image = $request->file('photo');
            // dd($profile_image);
            $filename = date('YmdHi') . '.' . $profile_image->getClientOriginalExtension();
            $image = Image::read($profile_image);

            // Resize image
            $image->resize(300, 300, function ($constraint) {
                $constraint->aspectRatio();
            })->save(public_path('uploads/admin_images/' . $filename));
            $vendorData->photo = $filename;
        }
        $vendorData->save();
        return redirect()->back()->with('message', 'Profile photo updated successfully.');
    }

    public function becomeVendor()
    {
        return Inertia::render('Auth/becomeVendor');
    }

    public function registerVendor(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed'],
                'shopName' => 'required|string|max:255',
                'password_confirmation' => 'required',
            ]);

            $user = User::create([
                'name' => $request->username,
                'username' => $request->username,
                'phone' => $request->phone,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'vendor',
                'status' => '0'
            ]);
            $vendor = Vendor::create([
                'vendor_id' => $user->id,
                'shop_name' => $request->shopName,
                'company_name' => $request->shopName,
                'products_supplied' => json_encode([
                    'Bedroom furniture' => 'John Doe'
                ])
            ]);

            return redirect()->route('login')->with("message", "Vendor account successfully created");
        } catch (\Exception $e) {
            // Log the error for debugging purposes
            Log::error("Error during vendor registration: " . $e->getMessage());

            // Flash a generic error message to the user
            return back()->withInput()->withErrors(['error' => $e->getMessage()]);
        }
    }

    
}