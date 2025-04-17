<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        $data = $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|email|unique:utilisateurs,email',
            'mot_de_passe' => 'required|string|min:6|confirmed',
            'ville_id' => 'nullable|exists:villes,id',
            'role' => 'in:utilisateur,admin'
        ]);

        $data['mot_de_passe'] = Hash::make($data['mot_de_passe']);

        $user = Utilisateur::create($data);

        Auth::login($user);

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user
        ]);
    }

    // LOGIN
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'mot_de_passe' => 'required'
        ]);

        $user = Utilisateur::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['mot_de_passe'], $user->mot_de_passe)) {
            return response()->json([
                'error' => 'Identifiants invalides'
            ], 401);
        }

        Auth::login($user);

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user
        ]);
    }

    // LOGOUT
    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    // USER INFO
    public function me()
    {
        return response()->json([
            'user' => Auth::user()
        ]);
    }
}
