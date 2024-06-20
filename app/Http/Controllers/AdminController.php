<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        // return view('admin/content/layouts/stacked');
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


}