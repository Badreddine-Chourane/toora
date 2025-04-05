<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScooterController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\TarifController;


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
