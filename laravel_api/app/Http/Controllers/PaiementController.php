<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use Illuminate\Http\Request;

class PaiementController extends Controller
{
    public function index()
    {
        $paiements = Paiement::all();
        return response()->json($paiements);
    }

    public function store(Request $request)
    {
        $request->validate([
            'location_id' => 'required|exists:locations,id',
            'montant' => 'required|numeric',
            'methode' => 'required|string',
            'statut' => 'required|string',
            'transaction_id' => 'nullable|string',
        ]);

        $paiement = Paiement::create($request->all());
        return response()->json($paiement, 201);
    }

    public function show($id)
    {
        $paiement = Paiement::findOrFail($id);
        return response()->json($paiement);
    }

    public function update(Request $request, $id)
    {
        $paiement = Paiement::findOrFail($id);
        $paiement->update($request->all());
        return response()->json($paiement);
    }

    public function destroy($id)
    {
        Paiement::destroy($id);
        return response()->json(['message' => 'Payment deleted successfully']);
    }
}
