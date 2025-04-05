<?php

namespace App\Http\Controllers;

use App\Models\Scooter;
use Illuminate\Http\Request;

class ScooterController extends Controller
{
    public function index()
    {
        $scooters = Scooter::all();
        return response()->json($scooters);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:scooters',
            'modele' => 'required',
            'batterie' => 'required|integer',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'ville_id' => 'required|exists:villes,id',
        ]);

        $scooter = Scooter::create($request->all());
        return response()->json($scooter, 201);
    }

    public function show($id)
    {
        $scooter = Scooter::findOrFail($id);
        return response()->json($scooter);
    }

    public function update(Request $request, $id)
    {
        $scooter = Scooter::findOrFail($id);
        $scooter->update($request->all());
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

    public function uploadPhoto(Request $request, $id)
    {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $scooter = Scooter::findOrFail($id);
        $photoPath = $request->file('photo')->store('scooters', 'public');
        $scooter->photo = $photoPath;
        $scooter->save();

        return response()->json(['message' => 'Photo uploaded successfully', 'photo' => $photoPath]);
    }
}
