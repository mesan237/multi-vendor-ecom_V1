<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        DB::table('users')->insert([
            // super admin
            [
                'name' => 'SAdmin',
                'username' => 'superAdmin',
                'email' => 'superadmin@gmail.com',
                'password' => Hash::make('237'),
                'role' => 'superadmin',
                'status' => '1',
            ],
            // admin
            [
                'name' => 'Admin',
                'username' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('237'),
                'role' => 'admin',
                'status' => '1',
            ],
            // vendor
            [
                'name' => 'vendor',
                'username' => 'vendor',
                'email' => 'vendor@gmail.com',
                'password' => Hash::make('237'),
                'role' => 'vendor',
                'status' => '1',
            ],
            // customer
            [
                'name' => 'customer',
                'username' => 'customer',
                'email' => 'customer@gmail.com',
                'password' => Hash::make('237'),
                'role' => 'user',
                'status' => '1',
            ],
        ]);
    }
}