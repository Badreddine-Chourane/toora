<?php

namespace App\Http\Controllers;
use App\Models\Location;
use App\Models\Scooter;
use Illuminate\Http\Request;
use Carbon\Carbon;

class LocationController extends Controller
{
    // List all locations (reservations)
    public function index()
    {
        // You can filter by user if you want: Location::where('utilisateur_id', auth()->id())->get();
        return Location::with(['scooter', 'utilisateur', 'paiement'])->get();
    }

    // Show one location
    public function show($id)
    {
        return Location::with(['scooter', 'utilisateur', 'paiement'])->findOrFail($id);
    }

    // Reserve a scooter (start reservation)
    public function store(Request $request)
    {
        $request->validate([
            'scooter_id' => 'required|exists:scooters,id',
            'utilisateur_id' => 'required|exists:users,id', // <-- FIXED HERE
        ]);

        $scooter = Scooter::findOrFail($request->scooter_id);

        if ($scooter->en_location) {
            return response()->json(['error' => 'Scooter déjà loué'], 400);
        }

        $location = Location::create([
            'utilisateur_id' => $request->utilisateur_id,
            'scooter_id' => $request->scooter_id,
            'debut' => Carbon::now(),
            'statut' => 'en_cours',
        ]);

        $scooter->en_location = true;
        $scooter->save();

        return response()->json($location, 201);
    }

    // End reservation (user returns scooter)
    public function update(Request $request, $id)
    {
        $location = Location::with('scooter.ville.tarif')->findOrFail($id);

        if ($location->statut !== 'en_cours') {
            return response()->json(['error' => 'Location déjà terminée'], 400);
        }

        $location->fin = Carbon::now();
        $location->statut = 'terminee';

        // Calculate price
        $duration = Carbon::parse($location->debut)->diffInMinutes($location->fin);
        $tarif_heure = $location->scooter->ville->tarif->prix_par_heure ?? 1;
        $prix_depart = $location->scooter->ville->tarif->prix_de_depart ?? 0;
        $heures = ceil($duration / 60); // always round up to next hour
        $location->prix = $prix_depart + ($heures * $tarif_heure);

        $location->save();

        // Free the scooter
        $location->scooter->en_location = false;
        $location->scooter->save();

        return response()->json($location);
    }
}