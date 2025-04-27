<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ville extends Model
{
    /** @use HasFactory<\Database\Factories\VilleFactory> */
    use HasFactory;
    protected $fillable = [
        'nom',
    ];
    public function utilisateurs()
    {
        return $this->hasMany(Utilisateur::class);
    }

    public function scooters()
    {
        return $this->hasMany(Scooter::class);
    }

    public function tarif()
{
    return $this->hasOne(Tarif::class);
}
}
