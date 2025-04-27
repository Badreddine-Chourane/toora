<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarif extends Model
{
    /** @use HasFactory<\Database\Factories\TarifFactory> */
    use HasFactory;
    protected $fillable = [
        'ville_id',
        'prix_par_heure',
        'prix_de_depart',
    ];
    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }
}
