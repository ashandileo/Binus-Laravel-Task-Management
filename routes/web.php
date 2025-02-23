<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController; // Import TaskController
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [TaskController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Authenticated routes
Route::middleware('auth')->group(function () {
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

                                                                                                    // Task routes
    Route::post('/tasks/store', [TaskController::class, 'store'])->name('tasks.store');             // Store Task
    Route::put('/tasks/update/{id}', [TaskController::class, 'update'])->name('tasks.update');      // Update task
    Route::delete('/tasks/delete/{id}', [TaskController::class, 'destroy'])->name('tasks.destroy'); // Delete task
});

require __DIR__ . '/auth.php';