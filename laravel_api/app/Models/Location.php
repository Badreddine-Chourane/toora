<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    /** @use HasFactory<\Database\Factories\LocationFactory> */
    use HasFactory;
    protected $fillable = [
        'utilisateur_id',
        'scooter_id',
        'debut',
        'fin',
        'prix',
        'statut',
    ];
    public function utilisateur()
    {
        return $this->belongsTo(\App\Models\User::class, 'utilisateur_id');
    }

    public function scooter()
    {
        return $this->belongsTo(Scooter::class);
    }

    public function paiement()
    {
        return $this->hasOne(Paiement::class);
    }
}
