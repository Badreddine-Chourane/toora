<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::all();
        return response()->json($locations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'scooter_id' => 'required|exists:scooters,id',
            'debut' => 'required|date',
            'fin' => 'nullable|date',
            'prix' => 'nullable|numeric',
            'statut' => 'required|string',
        ]);

        $location = Location::create($request->all());
        return response()->json($location, 201);
    }

    public function show($id)
    {
        $location = Location::findOrFail($id);
        return response()->json($location);
    }

    public function update(Request $request, $id)
    {
        $location = Location::findOrFail($id);
        $location->update($request->all());
        return response()->json($location);
    }

    public function destroy($id)
    {
        Location::destroy($id);
        return response()->json(['message' => 'Location deleted successfully']);
    }

    public function getByUtilisateur($utilisateurId)
    {
        $locations = Location::where('utilisateur_id', $utilisateurId)->get();
        return response()->json($locations);
    }
}
