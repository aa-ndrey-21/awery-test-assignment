<?php

declare(strict_types=1);

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function (): void {
    Route::get('/user', [AuthController::class, 'user'])->name('user');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::apiResource('news', NewsController::class)->only(['index', 'show']);

    Route::middleware('role:admin')->group(function (): void {
        Route::apiResource('news', NewsController::class)->only(['store', 'update', 'destroy']);
    });
});
