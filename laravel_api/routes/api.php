<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScooterController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\TarifController;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Test route
Route::get('/ping', function () {
    return response()->json(['message' => 'API is working']);
});

// RESTful API resources
// Admin-only routes
Route::middleware(['auth:sanctum'])->group(function () {
    // User management routes (admin only)
    Route::middleware(['auth.admin'])->group(function () {
        Route::get('/utilisateurs', [UtilisateurController::class, 'index']);
        Route::post('/utilisateurs', [UtilisateurController::class, 'store']);
        Route::put('/utilisateurs/{id}', [UtilisateurController::class, 'update']);
        Route::delete('/utilisateurs/{id}', [UtilisateurController::class, 'destroy']);
    });
    
    // User can get their own profile
    Route::get('/utilisateurs/{id}', [UtilisateurController::class, 'show'])->middleware('auth.self.or.admin');

    // Other protected resources
    Route::apiResource('scooters', ScooterController::class);
    Route::apiResource('locations', LocationController::class);
    Route::apiResource('paiements', PaiementController::class);
    Route::apiResource('villes', VilleController::class);
    Route::apiResource('tarifs', TarifController::class);
});

// Register
Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8|confirmed',
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // If you want to assign a default role, uncomment the next line (requires 'role' column)
    // $user->role = 'user'; $user->save();

    $token = method_exists($user, 'createToken') ? $user->createToken('authToken')->plainTextToken : null;

    return response()->json([
        'message' => 'User registered successfully',
        'user' => $user,
        'token' => $token,
        'role' => property_exists($user, 'role') ? $user->role : null,
    ]);
});

// Login
Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        // Always get a fresh Eloquent User instance
        $user = \App\Models\User::find(Auth::id());
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
            'role' => $user->role ?? null, // should be 'admin' for admin users
        ]);
    }

    return response()->json(['error' => 'Invalid credentials'], 401);
});


Route::get('/locations', [LocationController::class, 'index']); // admin
Route::get('/locations/{id}', [LocationController::class, 'show']); // admin/user
Route::post('/locations', [LocationController::class, 'store']); // reserve
Route::put('/locations/{id}', [LocationController::class, 'update']); // return


// Custom routes (optional examples)
Route::get('scooters/ville/{villeId}', [ScooterController::class, 'getByVille']);
Route::get('locations/utilisateur/{utilisateurId}', [LocationController::class, 'getByUtilisateur']);
Route::post('scooters/{id}/upload-photo', [ScooterController::class, 'uploadPhoto']);
Route::get('scooters', [ScooterController::class, 'index']);
Route::post('scooters', [ScooterController::class, 'store']);
Route::get('scooters/{id}', [ScooterController::class, 'show']);
Route::put('scooters/{id}', [ScooterController::class, 'update']);
Route::delete('scooters/{id}', [ScooterController::class, 'destroy']);
// User CRUD routes
Route::get('/utilisateurs', [UtilisateurController::class, 'index']);        // List all users
Route::get('/utilisateurs/{id}', [UtilisateurController::class, 'show']);    // Get single user
Route::post('/utilisateurs', [UtilisateurController::class, 'store']);       // Create user
Route::put('/utilisateurs/{id}', [UtilisateurController::class, 'update']);  // Update user
Route::delete('/utilisateurs/{id}', [UtilisateurController::class, 'destroy']); // Delete user