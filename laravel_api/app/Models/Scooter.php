<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scooter extends Model
{
    /** @use HasFactory<\Database\Factories\ScooterFactory> */
    use HasFactory;
    protected $fillable = [
        'code',
        'modele',
        'etat',
        'batterie',
        'latitude',
        'longitude',
        'ville_id',
        'en_location',
        'photo',
    ];
    public function ville()
    {
        return $this->belongsTo(Ville::class);
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    
}
