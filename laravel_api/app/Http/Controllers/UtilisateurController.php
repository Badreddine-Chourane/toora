<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;

class UtilisateurController extends Controller
{
    public function index()
    {
        $utilisateurs = Utilisateur::all();
        return response()->json($utilisateurs);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string',
            'email' => 'required|email|unique:utilisateurs',
            'mot_de_passe' => 'required|string|min:6',
            'role' => 'required|string',
            'ville_id' => 'required|exists:villes,id',
        ]);

        $utilisateur = Utilisateur::create($request->all());
        return response()->json($utilisateur, 201);
    }

    public function show($id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        return response()->json($utilisateur);
    }

    public function update(Request $request, $id)
    {
        $utilisateur = Utilisateur::findOrFail($id);
        $utilisateur->update($request->all());
        return response()->json($utilisateur);
    }

    public function destroy($id)
    {
        Utilisateur::destroy($id);
        return response()->json(['message' => 'User deleted successfully']);
    }
}
