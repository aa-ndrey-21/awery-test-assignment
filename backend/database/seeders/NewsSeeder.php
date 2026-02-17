<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::whereHas('roles', fn ($q) => $q->where('name', 'admin'))->first();

        if (! $admin) {
            return;
        }

        News::factory()->count(20)->create(['user_id' => $admin->id]);
    }
}
