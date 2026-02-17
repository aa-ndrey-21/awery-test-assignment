<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class TestAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@test.com',
            'password' => 'password',
        ]);

        $user->assignRole('admin');
    }
}
