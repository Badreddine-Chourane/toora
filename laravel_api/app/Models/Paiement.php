<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    /** @use HasFactory<\Database\Factories\PaiementFactory> */
    use HasFactory;
    protected $fillable = [
        'location_id',
        'montant',
        'methode',
        'statut',
        'transaction_id',
    ];
    public function location()
    {
        return $this->belongsTo(Location::class);
    }
}
