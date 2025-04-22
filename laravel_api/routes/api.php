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


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Test route
Route::get('/ping', function () {
    return response()->json(['message' => 'API is working']);
});

// RESTful API resources
Route::apiResource('scooters', ScooterController::class);
Route::apiResource('locations', LocationController::class);
Route::apiResource('paiements', PaiementController::class);
Route::apiResource('utilisateurs', UtilisateurController::class);
Route::apiResource('villes', VilleController::class);
Route::apiResource('tarifs', TarifController::class);

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

    return response()->json([
        'message' => 'User registered successfully',
        'user' => $user,
    ]);
});

Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $user = Auth::user();

        return response()->json([
            'message' => 'Login successful',
            'user' => $user,
        ]);
    }

    return response()->json(['error' => 'Invalid credentials'], 401);
});
// Custom routes (optional examples)
Route::get('scooters/ville/{villeId}', [ScooterController::class, 'getByVille']);
Route::get('locations/utilisateur/{utilisateurId}', [LocationController::class, 'getByUtilisateur']);
Route::post('scooters/{id}/upload-photo', [ScooterController::class, 'uploadPhoto']);
Route::get('scooters', [ScooterController::class, 'index']);
Route::post('scooters', [ScooterController::class, 'store']);
Route::get('scooters/{id}', [ScooterController::class, 'show']);
Route::put('scooters/{id}', [ScooterController::class, 'update']);
Route::delete('scooters/{id}', [ScooterController::class, 'destroy']);

// Auth (if using Sanctum or Passport later)
// Route::post('register', [AuthController::class, 'register']);
// Route::post('login', [AuthController::class, 'login']);
