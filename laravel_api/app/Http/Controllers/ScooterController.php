<?php

namespace App\Http\Controllers;

use App\Models\Scooter;
use Illuminate\Http\Request;

class ScooterController extends Controller
{
    public function index()
    {
        $scooters = Scooter::with('ville.tarif')->get();
        return response()->json($scooters);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string',
            'modele' => 'required|string',
            'etat' => 'required|string',
            'batterie' => 'required|numeric',
            'latitude' => 'required',
            'longitude' => 'required',
            'ville_id' => 'required|exists:villes,id',
            'en_location' => 'boolean',
            'photo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('scooters', 'public');
            $validated['photo'] = $path;
        }

        Scooter::create($validated);

        return response()->json(['message' => 'Scooter créé avec succès.']);
    }



    public function show($id)
    {
        $scooter = Scooter::with('ville.tarif')->findOrFail($id);
        return response()->json($scooter);
    }


    public function update(Request $request, Scooter $scooter)
    {
        $validated = $request->validate([
            'code' => 'required',
            'modele' => 'required',
            'etat' => 'required',
            'batterie' => 'required|numeric',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'ville_id' => 'required|exists:villes,id',
            'en_location' => 'boolean',
            'photo' => 'nullable|image',
        ]);

        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('scooters', 'public');
            $validated['photo'] = $path;
        }

        $scooter->update($validated);

        return response()->json($scooter);
    }


    public function destroy($id)
    {
        Scooter::destroy($id);
        return response()->json(['message' => 'Scooter deleted successfully']);
    }

    public function getByVille($villeId)
    {
        $scooters = Scooter::where('ville_id', $villeId)->get();
        return response()->json($scooters);
    }


 }
