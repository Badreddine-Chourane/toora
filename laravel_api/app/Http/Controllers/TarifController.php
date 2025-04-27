<?php

namespace App\Http\Controllers;

use App\Models\Tarif;
use Illuminate\Http\Request;

class TarifController extends Controller
{
    public function index()
    {
        $tarifs = Tarif::all();
        return Tarif::with('ville')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'ville_id' => 'required|exists:villes,id',
            'prix_par_heure' => 'required|numeric',
            'prix_de_depart' => 'required|numeric',
        ]);

        $tarif = Tarif::create($request->all());
        return response()->json($tarif, 201);
    }

    public function show($id)
    {
        $tarif = Tarif::findOrFail($id);
        return response()->json($tarif);
    }

    public function update(Request $request, $id)
    {
        $tarif = Tarif::findOrFail($id);
        $tarif->update($request->all());
        return response()->json($tarif);
    }

    public function destroy($id)
    {
        Tarif::destroy($id);
        return response()->json(['message' => 'Tariff deleted successfully']);
    }
}
