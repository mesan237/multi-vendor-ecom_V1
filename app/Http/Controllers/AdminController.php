<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
    } //end method

    public function AdminProfileStore(Request $request)
    {
        $admin_id = Auth::User()->id;
        $adminData = User::find($admin_id);

        $adminData->name = $request->name;
        $adminData->email = $request->email;
        $adminData->username = $request->name;
        $adminData->phone = $request->phoneNumber;
        $adminData->address = $request->address;
        return Inertia::render('admin/profile/AdminProfile', [
            "adminUser" => ""
        ]);
    } //end method


}
